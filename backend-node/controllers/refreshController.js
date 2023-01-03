const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleRefresh = async (req,res) => {
    console.log("hit");
    console.log(req.cookies);
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err,decoded) => {
            const roles = Object.values(foundUser.roles);
            if(err || decoded.username !== foundUser.username) return res.sendStatus(403);
            
            const accessToken = jwt.sign({
                "userInfo":{
                    "username": decoded.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN,
            {expiresIn: "300s"});

            return res.json({"accessToken":accessToken});
        }
    );
}

module.exports = {handleRefresh};