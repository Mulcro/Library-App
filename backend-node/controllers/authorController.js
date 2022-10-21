const Author = require('../model/author');
const Book = require('../model/Book');

const getAuthors = async (req,res) => {
    const categories = await Author.find({}).exec();
    if(!categories) return res.sendStatus(404).json({"message":"Categoreis not found"});

    res.json(categories);
}

const getBooksFromAuthor = async (req,res) => {
    const books = await Book.find({author: req.params.authorId}).populate('author').populate('category').exec();
    if(!books) return res.sendStatus(404).json({"message":"Categoreis not found"});

    res.json(books);
}

const getAuthor = async (req,res) => {
    const author = await Author.findById(req.params.authorId).exec();
    if(!author) return res.sendStatus(404).json({"message":"Author not found"});

    res.json(author);
}
//Need to implement modify author controller using patch

const createAuthor = async (req,res) => {
    if(!req.body.firstname || !req.body.lastname) return res.sendStatus(422).json({"message":"A valid author name is required"});
    const author = await Author.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    const result =  await author.save();
    if(!result) return res.sendStatus(500);

    res.json(result);

}

const deleteAuthor = async (req,res) => {
    const result = await Author.findByIdAndDelete(req.params.authorId).exec();
    if(!result) return res.sendStatus(500);

    res.json(result);
}


module.exports = {getAuthors,getBooksFromAuthor,getAuthor,createAuthor,deleteAuthor};