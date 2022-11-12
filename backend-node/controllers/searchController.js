const Book = require('../model/Book');

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const handleSearch = async (req,res) => {
    const query = req.body.query;
    console.log(query);
    const parameter = parseInt(req.body.param, 10);
    
    if(!query) return await res.json(Book.find({}).exec());
    
    const regex = new RegExp(escapeRegex(query), 'gi');
    switch (parameter) {
        case 1:
            const booksByTitle = await Book.find({title: regex}).populate('author').populate('category').exec();
    
            res.json(booksByTitle);
            res.status(200);
            break;
        
        case 2:
            const booksByCategory = await Book.find({category: query}).populate('author').populate('category').exec();
            
            res.json(booksByCategory);
            res.status(200);
            break;
        
        case 3:
            const booksByAuthor = await Book.find({author: query}).populate('author').populate('category').exec();
            
            res.json(booksByAuthor);
            res.status(200);
            break;
    }
}

module.exports = {handleSearch};