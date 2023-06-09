const User = require('../models/user.model');
const createError = require('http-errors');

module.exports.exists = (req, res, next) => {
  User.findById(req.params.id)
    .populate('sneakers')
    .then((user) => {
      if (user) {
        req.user = user
        next();
      } else {
        next(createError(404, 'User not found'))
      }
    })
    .catch(next)
}

/*module.exports.checkOwner = (req, res, next) => {
  if (req.params.id.toString() !== req.user.id.toString()){
    next(createError(404, 'Forbidden'));
  } else {
    next();
  }
}*/