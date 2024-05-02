const { Pool } = require('pg');
//Pool de conexão ao banco
const pool = new Pool({
    user: "admin",
    host: "db",
    database: "filmes",
    password: "admin",
    port: 5432,
});

module.exports = pool;