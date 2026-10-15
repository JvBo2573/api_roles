const { Pool } = require('pg');

// Carrega as variáveis de ambiente do .env para a memória
require('dotenv').config();

// Configura a conexão com o banco de dados
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;