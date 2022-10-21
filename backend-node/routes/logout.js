const express = require('express');
const Router = express.Router();
const logoutController = require('../controllers/logoutController');

Router.route('/')
    .post(logoutController.handleLogout);

module.exports = Router;