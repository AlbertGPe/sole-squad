const Sneaker = require('../models/sneaker.model')
const createError = require('http-errors')

module.exports.exists = (req, res, next) => {
  Sneaker.findById(req.params.id)
    .populate('comments')
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
  console.log(req.sneaker.user)
  if (
    !req.sneaker.user
  ) {
    next(createError(403, 'Forbidden'));
  } else {
    next();
  }
}