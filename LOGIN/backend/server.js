const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const app = express();

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir o HTML de login
app.use(express.static("public"));

// ROTA DE CADASTRO (Usada apenas no Thunder Client)
app.post("/register", (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, senha], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ mensagem: "Erro ao cadastrar." });
        }

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    });
});

// ROTA DE LOGIN (Recebe dados do login.html)
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    db.query(sql, [email, senha], (err, results) => {
        if (err) return res.send("Erro no servidor.");

        if (results.length > 0) {
            return res.send("Login autorizado!");
        } else {
            return res.send("Email ou senha incorretos.");
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando: http://localhost:3000");
});
