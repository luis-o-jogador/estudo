const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

function authenticateToken(req, res, next) {
    console.log("middleware");

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Token não fornecido"
        });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Token inválido/expirado"
            });
        }

        req.userLogged = decoded;
        console.log(decoded);

        return next();
    });

    console.log(token);
};

module.exports =authenticateToken;