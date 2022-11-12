const User = require('../model/User');

const handleLogout = async (req,res) => {
    // Remember to delete the access token from the frontend
    console.log("working");
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();

    if(!foundUser) {
        res.clearCookie('jwt',{httpOnly: true, sameSite: "None"});
        res.sendStatus(204);
    }

    //delete the refresh token from db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    if (!result) {
        return res.sendStatus(500);
    }
    else{
        res.clearCookie('jwt',{httpOnly: true, sameSite: "None"});
        res.sendStatus(204);
    }
};

module.exports = {handleLogout};