const Category = require('../model/Category');
const Book = require('../model/Book');

const getCategories = async (req,res) => {
    const categories = await Category.find({}).exec();
    if(!categories) return res.sendStatus(404).json({"message":"Categoreis not found"});

    res.json(categories);
}

const getCategory = async (req,res) => {
    const category =  await Category.findById(req.params.categoryId);
    if(!category) return res.sendStatus(404).json({"message":"Category not found"});

    res.json(category);
}

//Need to implement modify category controller using patch

const getBooksFromCategory = async (req,res) => {    
    const books = await Book.find({category: req.params.categoryId}).populate('author').populate('category');
    if(!books) return res.sendStatus(404).json({"message":"Categoreis not found"});

    res.json(books);
}

const createCategory = async (req,res) => {
    if(!req.body.category_name) return res.sendStatus(422).json({"message":"A valid category name is required"});
    const category = await Category.create({
        categoryName: req.body.category_name
    });

    const result =  await category.save();
    if(!result) return res.sendStatus(500);

    res.json(result);

}

const deleteCategory = async (req,res) => {
    const result1 = await Category.findByIdAndDelete(req.params.categoryId).exec();
    const result2 = await Book.findByIdAndDelete({category: req.params.categoryId}).exec();
    
    if(!result1 || !result2) return res.sendStatus(500);

    res.json(result1,result2);
}


module.exports = {getCategories,getBooksFromCategory,getCategory,createCategory,deleteCategory};