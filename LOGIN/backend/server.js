const express = require("express");
const path = require("path");
const db = require("./db");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos HTML da pasta FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));

// Rota GET: tela de cadastro
app.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/cadastro.html"));
});

// Rota POST: cadastrar usuário
app.post("/cadastro", (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Nome, email e senha são obrigatórios." });
    }

    const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(query, [nome, email, senha], (err, resultado) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao cadastrar usuário." });
        }
        res.send(`
            <script>
                alert("Cadastro realizado com sucesso!");
                window.location.href = "/index.html";
            </script>
        `);
    });
});

// Rota POST: login
// Rota POST: login
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    db.query(query, [email, senha], (err, resultado) => {
        if (err) return res.status(500).send("Erro no servidor.");
        
        if (resultado.length === 0)
            return res.send(`
                <script>
                    alert("Email ou senha incorretos!");
                    window.location.href = "/index.html";
                </script>
            `);

        // SUCESSO NO LOGIN
        res.send(`
            <script>
                alert("Login feito com sucesso!");
                window.location.href = "/index.html";
            </script>
        `);
    });
});


app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
