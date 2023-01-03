const Book = require('../model/Book');

const getBooks = async (req,res) => {
    const books = await Book.find({}).populate('author').populate('category').exec();
    if(!books) return res.sendStatus(404).json({"message":"Books not found"});
    res.json(books);
};

const getBook = async (req,res) => {
    const book = await Book.findById(req.params.bookId).populate("category").populate("author");
    if(!book) return res.sendStatus(404).json({"message":"Book was not found"});
    res.json(book);
};


const createBook = async (req,res) => {
    if(!req.body.summary || !req.body.title || !req.body.author || !req.body.category || !req.body.quantity) {
        return res.sendStatus(404);
    }

    const result = await Book.create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        summary: req.body.summary,
        quantity: req.body.quantity
    });

    if(!result) return res.sendStatus(500);

    res.json(result);
}

const modifyBook = async (req,res) => {
    if(!req.body.bookSummary || !req.body.bookTitle || !req.body.bookAuthor || !req.body.bookCategory || !req.body.bookQuantity) return res.sendStatus(422);

    const book = await Book.findById(req.params.bookId);

    if(!book) return res.sendStatus(404);

    book.title = req.body.bookTitle;
    book.category = req.body.bookCategory;
    book.author = req.body.bookAuthor;
    book.summary = req.body.bookSummary;
    book.quantity = req.body.bookQuantity

    const result = await book.save();
    if(!result) return res.sendStatus(500);

    res.json(result);
}

const deleteBook = async (req,res) => {
    const result = await Book.findByIdAndDelete(req.params.bookId);
    console.log(result);
    if(!result) return res.sendStatus(500);

    res.json(result);
}

module.exports = {getBooks,getBook,createBook,modifyBook,deleteBook};