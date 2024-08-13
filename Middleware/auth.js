const jwt = require('jsonwebtoken')

const auth = async (req, res, next) =>
{
    const token = req.header('Authorization').split(" ")[1];
    if(!token)
        return res.status(404).json({error : "Authorization denied, token missing"});
    try {
        
        const verify = jwt.verify(token,'0');
        req.user = verify;
        next();

    } catch (error) {
        throw error
    }
}

module.exports = auth;