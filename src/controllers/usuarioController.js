const UsuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, cargo } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios.'});
        }

        const usuarioExistente = await UsuarioRepository.buscarPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ mensagem: 'Este email já está cadastrado.' });
        }

        const senha_hash = await bcrypt.hash(senha, 10);
        const cargoDefinido = cargo || 'funcionario';
        const novoUsuario = await UsuarioRepository.criarUsuario(nome, email, senha_hash, cargoDefinido)

        res.status(201).json(novoUsuario);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro interno ao criar usuário.' });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await UsuarioRepository.buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'credenciais inválidas' });
        }
        
        const token = jwt.sign(
            {id: usuario.id, cargo: usuario.cargo},
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({
            mensagem: 'login realizado com sucesso',
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno ao realizar login.' });
    }
};

const verPerfil = async (req, res) => {
    try {
        const id = req.usuario_id;
        const usuario = await UsuarioRepository.buscarPorId(id);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar perfil' });
    }
}

module.exports = { criarUsuario, login, verPerfil };