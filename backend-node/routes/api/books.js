const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/bookController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES = require('../../config/roles');


router.route('/')
    .get(bookController.getBooks)
    .post(verifyRoles(ROLES.Admin,ROLES.Editor),bookController.createBook);

router.route('/:bookId')
    .get(bookController.getBook)
    .patch(verifyRoles(ROLES.Admin,ROLES.Editor),bookController.modifyBook)
    .delete(verifyRoles(ROLES.Admin),bookController.deleteBook)

module.exports = router;