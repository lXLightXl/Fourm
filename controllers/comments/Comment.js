const expressAsyncHandler = require("express-async-handler")
const Comment = require('../../model/comment/Comment')



const createCommentCtrl = expressAsyncHandler(async(req,res,next) => {
 const {profilePhoto, firstName} = req.user
 const user = req.user
 const {postId, description} = req.body
 const comment = await Comment.create({
  post: postId,
  user: user,
  description
 })
res.json(comment)
})

const allComments = expressAsyncHandler(async(req,res,next) => {
 const comment = await Comment.find({})
 res.json(comment)
})

const singleComment = expressAsyncHandler(async(req,res,next) => {
 const {id} = req.params
 const comment = await Comment.findById(id)
 res.json(comment)
})

module.exports = {createCommentCtrl}