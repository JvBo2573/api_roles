const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Importa os nossos dois seguranças
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// =====================================
// Rota Pública (Livre para todos)
// =====================================
router.post('/login', usuarioController.login);

// =====================================
// Rota Protegida 1: Perfil
// (Requer Apenas Autenticação)
// =====================================
router.get('/me', authMiddleware, usuarioController.verPerfil);

// =====================================
// Rota Protegida 2: Cadastro
// (Requer Autenticação + Cargo Gerente)
// =====================================
// 1º: authMiddleware checa se o token existe e é válido
// 2º: roleMiddleware checa se o cargo dentro do token é 'gerente'
router.post('/', authMiddleware, roleMiddleware('gerente'), usuarioController.criarUsuario);

module.exports = router;