const express = require('express')
const category = express.Router();
const {Category} = require('../../controllers/category/category')
const authMiddleware = require("../../middlewares/auth/authMiddleware");

category.post('/', authMiddleware, Category)

module.exports = category