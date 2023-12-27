const User = require('../model/User');
const Book = require('../model/Book');
const bcrypt = require('bcrypt');

const getUsers = async (req,res) => {
    console.log("Working");
    const rawUsers = await User.find({}).exec();

    if(!rawUsers) return res.sendStatus(404);

    const filteredUsers = [];

    for(const user of rawUsers){
        data = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            createdOn: user.createdAt
        }

        filteredUsers.push(data);
    }

    res.json(filteredUsers);
}

const getUser = async (req,res) => {
    if(!req.params.username) return res.sendStatus(422);
    const userId = req.params.username;

    const foundUser = await User.findOne({username: userId});
    if(!foundUser) return res.sendStatus(404);

    const books = [];

    for(const book of foundUser.books){
        const result = await Book.findById(book).exec();
        books.push(result);
    }

    const data = {
        id: foundUser._id,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        email: foundUser.email,
        username: foundUser.username,
        profile: foundUser.profilePic,
        books: books
    }
    res.json(data);
}

const returnBook = async (req,res) => {
    if(!req.params.username && !req.body.bookId) return res.sendStatus(422);

    const username = req.params.username;
    const bookId = req.body.bookId;

    const foundUser = await User.findOne({username: username}).exec();
    if(!foundUser) return res.sendStatus(404);

    const book = await Book.findById(bookId).exec();

    if(foundUser.books.includes(bookId)){
        const index = foundUser.books.indexOf(bookId);
        foundUser.books.splice(index,1);
    }
    else{
        return res.sendStatus(404);
    }

    const result = await foundUser.save();
    if(!result) return res.sendStatus(500);

    book.quantity ++;
    
    const result2 = await book.save();
    if(!result2) return res.sendStatus(500);

    return res.json(result);
}

const updateUser = async (req,res) => {
    if(!req.params.username && !req.body.firstname && !req.body.lastname && !req.body.email) return res.sendStatus(422);
    
    const username = req.params.username;

    const foundUser = await User.findOne({username});
    if(!foundUser) return res.sendStatus(404);
    
    foundUser.firstname = req.body.firstname;
    foundUser.lastname = req.body.lastname;
    foundUser.email = req.body.email

    const result = await foundUser.save();

    if(!result) return res.sendStatus(422);
    res.json(result);
}

const updatePassword = async (req,res) => {
    if(!req.params.username && !req.body.oldpassword && !req.body.newpassword) return res.sendStatus(422);

    const username = req.params.username;

    const foundUser = await User.findOne({username});
    if(!foundUser) return res.sendStatus(404);

    const oldPwd = req.body.oldpassword;
    const newPwd = req.body.newpassword;

    const pwdMatch = await bcrypt.compare(oldPwd, foundUser.password);

    if(!pwdMatch) return res.sendStatus(422);

    foundUser.password = await bcrypt.hash(newPwd, 10);

    const result = await foundUser.save();
    if(!result) return res.sendStatus(422);
    res.json(result);
}

const addRole = async (req,res) => {
    if(!req.params.username && !req.body.userRole) res.sendStatus(422);
    console.log("Working");
    const role = parseInt(req.body.userRole);

    const username = req.params.username;

    console.log(role,username);

    const foundUser = await User.findOne({username});
    if(!foundUser) return res.sendStatus(404);

    const roles = Object.values(foundUser.roles);

    const duplicate = roles.includes(role);
    if(duplicate) return res.sendStatus(409);

    if(role === 10){
        const roleList = {...foundUser.roles, "Editor": 10};
        foundUser.roles = roleList;

        const result = await foundUser.save();
        if(!result) return res.sendStatus(422);

        res.json(result);
    }
    else if(role === 1){
        const roleList = {...foundUser.roles, "Admin": 1};
        foundUser.roles = roleList;

        const result1 = await foundUser.save();
        if(!result1) return res.sendStatus(422);

        res.json(result1); 
    }
    else{
       res.sendStatus(422); 
    }
}

const deleteRole = async(req,res) => {
    if(!req.params.username && !req.body.userRole) res.sendStatus(422);
    
    const role = parseInt(req.body.userRole);

    const user = req.params.username;

    const foundUser = await User.findOne({username:user});
    if(!foundUser) return res.sendStatus(404);

    const roles = Object.values(foundUser.roles);
    console.log(roles);
    const roleIsPresent = roles.includes(role);
    console.log(roleIsPresent);

    if(!roleIsPresent) return res.sendStatus(404);

    if(role === 10){
        // const checkEditor = foundUser.roles.hasOwnProperty("Editor");
        // console.log(checkEditor);
        // if(!checkEditor) return res.sendStatus(404);

        const currentRoles = Object.keys(foundUser.roles).filter(role => role !== "Editor");

        let newRoles = {};
        for(const role of currentRoles){
            newRoles[role] = foundUser.roles[role];
        }

        foundUser.roles = newRoles;

        const result = await foundUser.save();

        res.json(result);
    }
    else if(role === 1){
        // const checkAdmin = foundUser.roles.hasOwnProperty("Admin");
        // if(!checkAdmin) return res.sendStatus(404);

        const currentRoles = Object.keys(foundUser.roles).filter(role => role !== "Admin");

        console.log(currentRoles);

        let newRoles = {};
        for(const role of currentRoles){
            newRoles[role] = foundUser.roles[role];
        }

        foundUser.roles = newRoles;

        const result = await foundUser.save();

        res.json(result);
    }
    else{
        res.sendStatus(422);
    }
}

const deleteUser = async (req,res) => {
    if(!req.params.username) return res.sendStatus(422);
    
    //Logic to return all borrowed books
    const foundUser = await User.findOne({username:req.params.username}).exec();
    if(!foundUser) return res.sendStatus(404);

    for(const bookId of foundUser.books){
        const book = await Book.findById(bookId).exec();
        book.quantity ++;
    }

    const result = await User.findOneAndDelete({username:req.params.username}).exec();
    if(!result) return res.sendStatus(500);

    res.json(result);
}

module.exports = {getUsers,getUser,returnBook,updateUser,updatePassword,addRole, deleteRole, deleteUser};