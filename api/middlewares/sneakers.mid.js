const Sneaker = require('../models/sneaker.model')
const createError = require('http-errors')

module.exports.exists = (req, res, next) => {
  Sneaker.findById(req.params.id)
    .populate('comments')
    .populate('likes')
    .then((sneaker) => {
      if (sneaker) {
        req.sneaker = sneaker
        next();
      } else {
        next(createError(404, 'Sneaker not found'))
      }
    })
    .catch(next)
}

module.exports.checkOwner = (req, res, next) => {

  if (
    !req.sneaker.user
  ) {
    next(createError(403, 'Forbidden'));
  } else {
    next();
  }
}