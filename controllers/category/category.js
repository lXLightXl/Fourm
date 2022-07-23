const expressAsyncHandler = require('express-async-handler')
const Categories = require('../../model/Category/Category')

const Category = expressAsyncHandler(async(req,res,next) => {
 const category = await Categories.create({
  user: req.user._id,
  title: req.body.title,
 })
 res.json(category)
})

module.exports = {Category}