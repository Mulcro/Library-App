const jwt = require('jsonwebtoken');

const verifyJwt = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if(!authHeader) return res.sendStatus(401)

    const token = authHeader.split(' ');
    if(token.length !== 2) return res.sendStatus(401);
    if(token[0] !== 'Bearer') return res.sendStatus(401);

    const authToken = token[1];
    jwt.verify(
        authToken,
        process.env.ACCESS_TOKEN,
        (err,decoded) => {
            // console.log(authToken);
            if(err) return res.sendStatus(403);
            
            req.user = decoded.userInfo.username;
            req.roles = decoded.userInfo.roles;
            next();
        }
    )
    return true;

}

module.exports = verifyJwt;