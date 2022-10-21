const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES = require('../../config/roles');

//Get all categories
router.route('/')
    .get(verifyRoles(ROLES.Admin),categoryController.getCategories)
    .post(verifyRoles(ROLES.Admin,ROLES.Editor),categoryController.createCategory);

//Get specific category
router.route('/:categoryId')
    .get(categoryController.getCategory)
    .delete(categoryController.deleteCategory);

//Get all books in a category
router.route('/:categoryId/books')
    .get(categoryController.getBooksFromCategory);


module.exports = router;