document.addEventListener("DOMContentLoaded", async () => {
  const cardContainer = document.querySelector(".card-container");
  const empresasUrl = "http://localhost:8080/empresas";
  const vantagensUrl = "http://localhost:8080/vantagens";
  const idAluno = localStorage.getItem("idAluno");

  try {
    const respAluno = await fetch(`http://localhost:8080/alunos/${idAluno}`);
    if (!respAluno.ok) {
      alert("Erro ao carregar dados do aluno. Faça login novamente.");
      window.location.href = "../../login/login.html";
      return;
    }
    const aluno = await respAluno.json();

    const saldo = document.getElementById("saldo-moedas");
    if (saldo) {
      saldo.textContent = `Saldo: ${aluno.saldoMoedas} moedas`;
    }
  } catch (err) {
    alert(
      "Ocorreu um erro ao inicializar a página. Recarregue e tente novamente."
    );
  }

  const fetchEmpresas = fetch(empresasUrl)
    .then((res) => {
      if (!res.ok) throw new Error("Falha ao carregar empresas");
      return res.json();
    })
    .then((empresas) => {
      const map = new Map();
      empresas.forEach((e) => map.set(e.id, e.nome));
      return map;
    });

  const fetchVantagens = fetch(vantagensUrl).then((res) => {
    if (!res.ok) throw new Error("Falha ao carregar vantagens");
    return res.json();
  });

  Promise.all([fetchEmpresas, fetchVantagens])
    .then(([empresaMap, vantagens]) => {
      cardContainer.innerHTML = "";

      vantagens.forEach((v) => {
        const empresaIdNum =
          v.empresaId != null ? Number(v.empresaId) : v.empresa?.id;
        const empresaNome =
          v.empresa?.nome || empresaMap.get(empresaIdNum) || "–";

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <div class="img-card">
          <img src="${v.fotoUrl}" alt="Imagem de ${v.nome}" onerror="this.onerror=null; this.src='../../../../img/vantagemPadrao.png'"/>
        </div>
        <div class="info">
          <p><strong>Nome: </strong>${v.nome}</p>
          <p><strong>Empresa: </strong>${empresaNome}</p>
          <p><strong>Descrição: </strong>${v.descricao}</p>
          <p><strong>Custo: </strong>${v.custoMoedas} moedas</p>
        </div>
        <div class="acoes">
        <button 
            class="btn-resgatar" 
            data-vantagem-id="${v.id}" 
            data-custo="${v.custoMoedas}"
        >
            Resgatar
        </button>
      `;
        const btn = card.querySelector(".btn-resgatar");
        btn.addEventListener("click", async () => {
          const vantagemId = btn.dataset.vantagemId;
          const custo = Number(btn.dataset.custo);

          const saldoEl = document.getElementById("saldo-moedas");
          let saldo = Number(saldoEl.textContent.replace(/\D/g, ""));

          if (saldo < custo) {
            alert("Saldo insuficiente para resgatar essa vantagem.");
            return;
          }

          try {
            const response = await fetch(
              `http://localhost:8080/alunos/${idAluno}/trocar-vantagem/${vantagemId}`,
              {
                method: "POST",
              }
            );

            if (!response.ok) {
              const msg = await response.text();
              throw new Error(msg);
            }

            saldo -= custo;
            saldoEl.textContent = `Saldo: ${saldo} moedas`;
            alert("Vantagem resgatada com sucesso!🎉");
          } catch (err) {
            console.error(err);
            alert("Erro ao resgatar: " + err.message);
          }
        });

        cardContainer.appendChild(card);
      });
    })
    .catch((err) => {
      console.error(err);
      cardContainer.innerHTML = `<p class="erro">Não foi possível carregar as vantagens.</p>`;
    });
});
