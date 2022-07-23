const express = require("express");
const { createPostCtrl, fetchPosts, fetchPost, deletePost, postLike, updatePost } = require("../../controllers/posts/postCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const postRoute = express.Router();

postRoute.post("/", authMiddleware, createPostCtrl);
postRoute.get("/", fetchPosts);
postRoute.get("/:id", fetchPost);
postRoute.put('/:id', authMiddleware, updatePost)
postRoute.put('/likes', authMiddleware, postLike)
postRoute.delete('/:id', authMiddleware, deletePost)
module.exports = postRoute;
