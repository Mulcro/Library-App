const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleLogin = async (req,res) => {
    const user = req.body.user.toLowerCase();
    const pwd = req.body.pwd;
    if(!user || !pwd) return res.sendStatus(400);
    const foundUser = await User.findOne({username: user}).exec();
    
    if(!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {"userInfo": {
                "username": foundUser.username,
                "roles": roles
            }},
            process.env.ACCESS_TOKEN,
            {expiresIn: "300s"}
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN,
            {expiresIn: "1d"}
        );
        
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        if(!result) return res.status(500);
        
        res.status(200);

        res.cookie("jwt",refreshToken,{ sameSite: "None", secure:true, maxAge: 24*60*60*1000});  
            //Note that chrome requires sameSite: "None" and secure:true in order for the cookie to be sent through
        res.json({user, roles, accessToken});
    }
    else{
        res.sendStatus(500);
    }

    //Remember to send the access token to be stored on the front end
}

module.exports = {handleLogin};