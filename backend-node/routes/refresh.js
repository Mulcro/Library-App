const express = require('express');
const Router = express.Router();
const refreshController = require('../controllers/refreshController');

Router.route('/')
    .post(refreshController.handleRefresh);

module.exports = Router;