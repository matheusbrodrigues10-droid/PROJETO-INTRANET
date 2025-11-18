const form = document.getElementById('formContato');
const resposta = document.getElementById('resposta');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value
    };

    try {
        const res = await fetch('http://localhost:3000/contato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const data = await res.json();
        resposta.textContent = data.message;
        resposta.style.color = res.ok ? "green" : "red";
        if (res.ok) form.reset();

    } catch (erro) {
        resposta.textContent = "Erro ao conectar com o servidor.";
        resposta.style.color = "red";
        console.error(erro);
    }
});

