const autorizarCargos = (...cargosPermitidos) =>{
    return (req, res, next) => {
        const cargoUsuario = req.usuario_cargo;

        if (!cargosPermitidos.includes(cargoUsuario)) {
            return res.status(403).json({ mensagem: 'Acesso negado (403 Forbidden). Apenas usuários com o perfil [' + cargosPermitidos.join(', ') + '] têm acesso a este recurso.' })
        }

        next();
    };
};  

module.exports = autorizarCargos