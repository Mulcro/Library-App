const express = require('express');
const router = express.Router();
const authorController = require('../../controllers/authorController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES = require('../../config/roles');

router.route('/')
    .get(authorController.getAuthors)
    .post(verifyRoles(ROLES.Admin,ROLES.Editor),authorController.createAuthor);

router.route('/:authorId')
    .get(authorController.getAuthor)
    .patch(verifyRoles(ROLES.Editor,ROLES.Admin),authorController.modifyAuthor)
    .delete(verifyRoles(ROLES.Admin),authorController.deleteAuthor);

router.route('/:authorId/books')
    .get(authorController.getBooksFromAuthor);


module.exports = router;