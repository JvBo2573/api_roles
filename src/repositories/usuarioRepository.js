const pool = require('../config/db');

const criarUsuario = async (nome, email, senha_hash, cargo)=>{
    const sql = `INSERT INTO usuarios (nome, email, senha_hash, cargo) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, cargo, criado_em`;
    const resultado = await pool.query(sql, [nome, email, senha_hash, cargo]);
    return resultado.rows[0];
}

const buscarPorEmail = async (email)=>{
    const sql = 'SELECT * FROM usuarios WHERE email = $1';
    const resultado =  await pool.query(sql, [email]);
    return resultado.rows[0];
}

const buscaPorId = async () => {
    const sql = 'SELECT * FROM usuarios WHERE id = $1'; 
    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0];
}

module.exports = { criarUsuario, buscarPorEmail, buscaPorId }