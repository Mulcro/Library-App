const express = require('express');
const router = express.Router();
const ROLES = require('../../config/roles');
const verifyRoles = require('../../middleware/verifyRoles');
const borrowController = require('../../controllers/borrowController');

router.route('/:bookId')
    .post(borrowController.borrowBook);

module.exports = router;