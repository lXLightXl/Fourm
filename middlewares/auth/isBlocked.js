const User = require('../../route/users/usersRoute')

const isBlocked = async (req,res,next) => {
 const {_id} = req.user
 const user = findById(_id)
 /* NOT WORKING */
 if(user.isBlocked){
  return next('You are blocked');
 } else{
  next();
 }
 next();
}

module.exports = isBlocked