window.addEventListener('DOMContentLoaded', async () => {
    const idAluno = localStorage.getItem('idAluno');

    try {
        const respAluno = await fetch(`http://localhost:8080/alunos/${idAluno}`);
        if (!respAluno.ok) {
            alert('Erro ao carregar dados do aluno. Faça login novamente.');
            window.location.href = '../../login/login.html';
            return;
        }
        const aluno = await respAluno.json();

        const saldo = document.getElementById('saldo-moedas');
        if (saldo) {
            saldo.textContent = `Saldo: ${aluno.saldoMoedas} moedas`;
        }
    } catch (err) {
        alert('Ocorreu um erro ao inicializar a página. Recarregue e tente novamente.');
    }
});