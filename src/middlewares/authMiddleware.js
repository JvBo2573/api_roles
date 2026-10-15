const jwt = require('jsonwebtoken');

const autenticarToken = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({mensagem: 'Acesso negado. Cadê o seu crachá (Token)?'});
    }
    const token = authHeader.split(' ') [1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario_id = payload.id;
        req.usuario_cargo = payload.cargo;

        next(); 
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }
}

module.exports = { autenticarToken, }