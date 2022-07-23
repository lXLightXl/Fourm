const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs = require('fs')
const Post = require("../../model/post/Post");
const validateMongodbId = require("../../utils/validateMongodbID");
const User = require("../../model/user/User");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  //Check for bad words
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  //Block user
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating Failed because it contains profane words and you have been blocked"
    );
  }
  const localPath = `public/images/posts/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    const post = await Post.create(req.body);
    res.json(post);
    fs.unlinkSync(localPath)
  } catch (error) {
    res.json(error);
  }
});

const fetchPosts = expressAsyncHandler(async (req, res) => {
  try{
    const posts = await Post.find({}).populate('user')
    res.json(posts)
  }catch(error){
    res.json(error)
  }
})


const fetchPost = expressAsyncHandler(async (req, res) => {
  const {id} = req.params
  validateMongodbId(id)
  const post = await Post.findById(id)
  res.json(post)
})

const viewsNum = expressAsyncHandler(async (req, res) => {
  const {id} = req.params
  const post = await Post.findByIdAndUpdate(id, {
    $inc: {Views: +1}
  }, {new: true})
})


const updatePost = expressAsyncHandler(async (req, res) => {
  const {id} = req.params
  const updatePost = await Post.findByIdAndUpdate(id, {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  }, {new: true})

  res.json(updatePost)
})

const deletePost = expressAsyncHandler(async (req, res) => {
  const {id} = req.params
  await Post.findByIdAndDelete(id)
})

const postLike = expressAsyncHandler(async (req, res) => {
  const {postId} = req.body

  const userId = req.user.id
  const post = await Post.findById(postId)
  const isLiked = post.isLiked
  const alreadyDislik = post.isDisliked.find(user => user.toString() === userId.toString())

  if(alreadyDislik){
    const post = await Post.findByIdAndUpdate(postId, {
      pull: {dislikes: userId}
    })
  }
})

module.exports = { createPostCtrl, fetchPosts, fetchPost, updatePost, postLike, viewsNum, deletePost};
