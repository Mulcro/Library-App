const Book = require('../model/Book');

const getBooks = async (req,res) => {
    const books = await Book.find({}).exec();
    if(!books) return res.sendStatus(404).json({"message":"Books not found"});
    res.json(books);
};

const getBook = async (req,res) => {
    const book = await Book.findById(req.params.bookId);
    if(!book) return res.sendStatus(404).json({"message":"Book was not found"});
    res.json(book);
};

const createBook = async (req,res) => {
    if(!req.body.title || !req.body.author || !req.body.category || !req.body.quantity) {
        return res.status(404).json({"message":"You must enter a title,author,category and quantity"});
    }
    const result = await Book.create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        quantity: req.body.quantity
    });

    if(!result) return res.sendStatus(500);

    res.json(result);
}

const deleteBook = async (req,res) => {
    const result = await Book.findByIdAndDelete(req.params.bookId);
    if(!result) return res.sendStatus(500);

    res.json(result);
}

module.exports = {getBooks,getBook,createBook,deleteBook};