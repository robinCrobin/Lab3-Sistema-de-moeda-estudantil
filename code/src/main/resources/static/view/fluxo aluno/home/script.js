window.addEventListener('DOMContentLoaded', async () => {
    const idAluno = localStorage.getItem('idAluno');
    if (!idAluno) {
        alert('Você precisa estar logado como aluno para acessar esta página.');
        window.location.href = '../../login/login.html';
        return;
    }

    try {
        const [alunoResp, txResp] = await Promise.all([
            fetch(`http://localhost:8080/alunos/${idAluno}`),
            fetch(`http://localhost:8080/transacoes/aluno/${idAluno}`)
        ]);
        if (!alunoResp.ok || !txResp.ok) throw new Error('Erro ao carregar dados iniciais');

        const aluno = await alunoResp.json();
        const transacoes = await txResp.json();
        const resgates = transacoes.filter(t => t.tipoTransacao === 'RESGATE');

        document.getElementById('saldo-moedas').innerText =
            `Saldo: ${aluno.saldoMoedas} moedas`;

        const container = document.querySelector('.card-container');
        container.innerHTML = '';

        if (resgates.length === 0) {
            container.innerHTML = `
        <p style="text-align:center; padding:1rem;">
          Você ainda não resgatou nenhuma vantagem.
        </p>
      `;
            return;
        }
        resgates.forEach(resgate => {
            const card = document.createElement('div');
            card.classList.add('card');
            const srcFoto = resgate.vantagemFotoUrl
                ? resgate.vantagemFotoUrl
                : '../../../imgs/vantagemPadrao.png';

            card.innerHTML = `
             <div class="img-card">
                <img src="${srcFoto}" alt="Imagem de ${resgate.vantagemNome}" onerror="this.onerror=null; this.src='../../../imgs/vantagemPadrao.png'"/>
            </div>
    <div class="info">
      <p><strong>Nome:</strong> ${resgate.vantagemNome}</p>
      <p><strong>Empresa:</strong> ${resgate.empresaNome}</p>
      <p><strong>Custo:</strong> ${resgate.quantidade} moedas</p>
      <p><strong>Resgatado em:</strong> ${formatDate(resgate.data)}</p>
    </div>
  `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        alert('Erro ao carregar vantagens resgatadas: ' + error.message);
    }
});

function formatDate(isoString) {
    const d = new Date(isoString);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}