window.addEventListener('DOMContentLoaded', async () => {
    const INITIAL_COINS = 1000;
    const idProfessor = localStorage.getItem('idProfessor');
    if (!idProfessor) {
        alert('Você precisa estar logado como professor para ver este extrato.');
        return window.location.href = '../../login/login.html';
    }

    try {
        const respTx = await fetch(`http://localhost:8080/extratos/professor/${idProfessor}`);
        if (!respTx.ok) throw new Error('Falha ao carregar transações');
        const transacoes = await respTx.json();
        const envios = transacoes.filter(tx => tx.tipoTransacao === 'ENVIO');

        const container = document.querySelector('.card-container');
        container.innerHTML = '';
        envios.forEach(tx => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
        <div>
          <p class="envio"><strong>Envio:</strong></p>
          <p><strong>Data:</strong> ${new Date(tx.data).toLocaleDateString('pt-BR')}</p>
          <p><strong>Código:</strong> ${tx.codigo ?? ''}</p>
          <p><strong>Aluno:</strong> ${tx.alunoNome}</p>
          <p><strong>Motivo:</strong> ${tx.motivo ?? ''}</p>
          <p><strong>Quantidade enviada:</strong> ${tx.quantidade} moedas</p>
        </div>
      `;
            container.appendChild(card);
        });

        const totalEnviado = envios.reduce((sum, tx) => sum + tx.quantidade, 0);

        document.getElementById('valor-recebido').innerText = `${INITIAL_COINS} moedas`;
        document.getElementById('valor-enviado').innerText = `${totalEnviado} moedas`;

        const respProf = await fetch(`http://localhost:8080/professores/${idProfessor}`);
        if (!respProf.ok) throw new Error('Falha ao carregar saldo');
        const professor = await respProf.json();
        document.getElementById('valor-saldo').innerText = `${professor.saldoMoedas} moedas`;

    } catch (err) {
        console.error(err);
        alert('Erro ao carregar o extrato. Veja o console para mais detalhes.');
    }
});
