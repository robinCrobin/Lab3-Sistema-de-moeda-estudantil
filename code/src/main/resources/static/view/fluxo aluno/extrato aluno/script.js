window.addEventListener('DOMContentLoaded', async () => {
    const idAluno = localStorage.getItem('idAluno');
    if (!idAluno) {
        alert('Você precisa estar logado como aluno para acessar este extrato.');
        window.location.href = '../../login/login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/transacoes/aluno/${idAluno}`);
        if (!response.ok) throw new Error('Erro ao carregar transações');

        const minhas = await response.json();
        renderCards(minhas);
    } catch (error) {
        console.error('Falha ao carregar transações:', error);
        alert('Falha ao carregar histórico de transações');
    }

    try {
        const response = await fetch(`http://localhost:8080/extratos/aluno/${idAluno}`);
        if (!response.ok) {
            alert('Erro ao carregar suas transações. Recarregue a página e tente novamente.😉');
            return;
        }

        const transacoes = await response.json();
        console.log('Dados do extrato:', transacoes);

        let totalRecebido = 0;
        let totalGasto = 0;

        transacoes.forEach(tx => {
            const tipo = tx.tipoTransacao?.toUpperCase() || 
                         (tx.professorNome ? 'ENVIO' : 
                         (tx.empresaNome ? 'RESGATE' : ''));
            
            if (tipo === 'ENVIO') {
                totalRecebido += tx.quantidade;
            } else if (tipo === 'RESGATE') {
                totalGasto += tx.quantidade;
            }
        });

        try {
            const respAluno = await fetch(`http://localhost:8080/alunos/${idAluno}`);
            const aluno = await respAluno.json();
            const saldoAtual = aluno.saldoMoedas;

            document.getElementById('valor-recebido').innerText = `${totalRecebido} moedas`;
            document.getElementById('valor-gasto').innerText = `${totalGasto} moedas`;
            document.getElementById('valor-saldo').innerText = `${saldoAtual} moedas`;
        } catch (error) {
            alert('Houve um erro ao carregar o saldo atual. Tente recarregar, por favor.😉')
        }
    } catch (error) {
        alert('Não foi possível conectar-se ao servidor. Tente novamente mais tarde.');
    }
});

function renderCards(transacoes) {
    const container = document.querySelector('.card-container');
    container.innerHTML = '';

    if (transacoes.length === 0) {
        container.innerHTML = `
      <p style="text-align: center; padding: 1rem;">
        Você ainda não possui transações. <br>Realize alguma.
      </p>
      <img src="../../../imgs/joinha.png" id="joinha">
    `;
        return;
    }

    transacoes.forEach(t => {
        const card = document.createElement('div');
        card.classList.add('card');

        const isResgate = t.tipoTransacao.toUpperCase() === 'RESGATE';
        const classeTipo = isResgate ? 'gasto' : 'recebimento';
        const labelTipo = isResgate ? 'Gasto' : 'Recebimento';

        card.innerHTML = `
      <div>
        <p class="${classeTipo}"><strong>${labelTipo}:</strong></p>
        <p><strong>Data: </strong> ${formatDate(t.data)}</p>
        ${!isResgate
                ? `<p><strong>Professor: </strong> ${t.professorNome}</p>
                 <p><strong>Motivo:</strong> ${t.motivo}</p>`
                : `<p><strong>Código: </strong> ${t.codigo}</p>
             <p><strong>Empresa:</strong> ${t.empresaNome}</p>
             <p><strong>Vantagem:</strong> ${t.vantagemNome}</p>`
            }
        <p><strong>Aluno:</strong> ${t.alunoNome}</p>
        <p><strong>Quantidade:</strong> ${Math.abs(t.quantidade)} moedas</p>
      </div>
    `;

        container.appendChild(card);
    });
}

function formatDate(isoString) {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}