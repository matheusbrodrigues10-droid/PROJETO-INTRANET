const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Para parsear JSON

// Conexão com o banco (ajuste credenciais se necessário)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Seu usuário do HeidiSQL
    password: '', // Sua senha (vazia se padrão)
    database: 'cs_faleconosco'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        return;
    }
    console.log('Conectado ao banco cs_faleconosco');
});

// Rota POST para receber dados do formulário
app.post('/contato', (req, res) => {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    if (!nome || !email || !telefone || !assunto || !mensagem) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO contatos (nome, email, telefone, assunto, mensagem) VALUES (?, ?, ?, ?, ?)';
    db.execute(query, [nome, email, telefone, assunto, mensagem], (err, results) => {
        if (err) {
            console.error('Erro ao inserir:', err);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
        }
        res.json({ success: true, message: 'Contato salvo com sucesso!' });
    });
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
