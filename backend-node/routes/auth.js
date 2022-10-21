const express = require('express')
const Router = express.Router()
const authController = require('../controllers/authController');

Router.route('/')
    .post(authController.handleLogin);

module.exports = Router;