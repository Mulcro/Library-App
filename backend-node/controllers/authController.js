const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleLogin = async (req,res) => {
    console.log(req.body);
    const user = req.body.user.toLowerCase();
    const pwd = req.body.pwd;

    if(!user || !pwd) return res.sendStatus(400).json({"message":"Enter a valid username and password"});

    const foundUser = await User.findOne({username: user}).exec();
    console.log(foundUser);
    if(!foundUser) return res.sendStatus(401);

    const match = bcrypt.compare(pwd, foundUser.password);

    if(match){
        const roles = Object.values(foundUser.roles).filter(Boolean);
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
        
        res.cookie("jwt",refreshToken,{httpOnly: true, sameSite: "None", maxAge: 24*60*60*1000});  
        res.json({user, roles, accessToken});
    }
    else{
        res.sendStatus(401);
    }

    //Remember to send the access token to be stored on the front end
}

module.exports = {handleLogin};