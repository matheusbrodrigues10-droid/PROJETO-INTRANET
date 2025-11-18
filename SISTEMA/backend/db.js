const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cs_faleconosco'
});
module.exports = pool;
