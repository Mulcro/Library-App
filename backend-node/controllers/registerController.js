const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleUser = async (req,res) => {
    if(!req.body.fname || !req.body.lname || !req.body.email || !req.body.user || !req.body.pwd) return res.status(400).json({"message":"Enter a valid first name, last name, email, username and password"});
    const user = req.body.user.toLowerCase();
    const pwd = req.body.pwd;

    //check for duplicate
    const duplicate = await User.findOne({username: user}).exec();
    // console.log(duplicate);
    if(duplicate) {
        res.json({"message":"Username taken"});
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
        res.status(201).json({"message":`User ${user} was succesfully created.`});

    }
    catch(err){
        console.error(err);
        res.status(500).json({"message":"A server error occured"});
    }
}

//Need to implement modify user controller using patch

module.exports = {handleUser};