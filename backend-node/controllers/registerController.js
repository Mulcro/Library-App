const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleUser = async (req,res) => {
    if(!req.body.fname || !req.body.lname || !req.body.email || !req.body.user || !req.body.pwd) return res.sendStatus(400);
    const user = req.body.user.toLowerCase();
    const pwd = req.body.pwd;

    //check for duplicate
    const duplicate = await User.findOne({username: user}).exec();
    // console.log(duplicate);
    if(duplicate) {
        return res.sendStatus(409)
    }

    //create new user
    try{
        const hashedPwd = await bcrypt.hash(pwd,10);

        const result = await User.create({
            firstname: req.body.fname,
            lastname: req.body.lname,
            email: req.body.email,
            username: user,
            password: hashedPwd
        });

        console.log(result);
        res.sendStatus(201);

    }
    catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

//Need to implement modify user controller using patch

module.exports = {handleUser};