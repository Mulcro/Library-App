const verifyRoles = (...allowedRoles) => {
    return (req,res,next) => {
        console.log(req.body.roles);
        if(!req?.body.roles) return res.sendStatus(401);

        const authorizedRoles = [...allowedRoles];
        const result = req.body.roles.map(role => authorizedRoles.includes(role)).find(val => val === true);
        if(!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;