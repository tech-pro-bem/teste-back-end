const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({auth: false, message: "Token não informado"});

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded){
        if(err) return res.status(500).json({auth: false, message: "Falha ao atenticar o Token", messageError: err.message});
        req.email = decoded.email;
        next();
    })
}