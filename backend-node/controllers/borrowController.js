const Book = require("../model/Book");
const User = require("../model/User");

const borrowBook = async(req,res) => {
    if(!req.body.username || !req.params.bookId) return res.sendStatus(422);

    const book = await Book.findById(req.params.bookId).exec();
    const user = await User.findOne({username: req.body.username});

    if(user.books.includes(req.params.bookId)) return res.sendStatus(409);

    if(!book || !user) return  res.sendStatus(404);
    
    User.findOneAndUpdate(
        {username: req.body.username},
        {$push: {books: req.params.bookId}},
        (error,success) => {
            if(error){
                console.log(error);
            }
        }
        );

    book.quantity -= 1;
    
    const result2 = await book.save();

    if(!result2) return res.sendStatus(500);

    res.json(result2);
}

module.exports = {borrowBook}