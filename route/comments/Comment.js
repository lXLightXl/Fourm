const express = require('express')
const {createCommentCtrl} = require('../../controllers/comments/Comment')
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const commentRouter = express.Router();

commentRouter.post('/', authMiddleware, createCommentCtrl)


module.exports = commentRouter