const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleUser = async (req,res) => {
    
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.username || !req.body.password) return res.sendStatus(400).json({"message":"Enter a valid first name, last name, email, username and password"});
    const user = req.body.username.toLowerCase();
    const pwd = req.body.password;

    console.log(user, pwd);
    //check for duplicate
    const duplicate = await User.findOne({username: user}).exec();
    console.log(duplicate);
    if(duplicate) return res.status(409).json({"message":"Username already exists"});

    //create new user
    try{
        const hashedPwd = await bcrypt.hash(pwd,10);

        const result = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
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