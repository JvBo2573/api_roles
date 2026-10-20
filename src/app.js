const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Permite ler JSON nas requisições
app.use(express.json());

// Cadastra a rota principal
app.use('/usuarios', usuarioRoutes);

module.exports = app;