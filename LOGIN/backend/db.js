const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "area_login"
});

db.connect((err) => {
    if (err) {
        console.log("Erro ao conectar no banco:", err);
        return;
    }
    console.log("Conectado ao MySQL");
});

module.exports = db;
