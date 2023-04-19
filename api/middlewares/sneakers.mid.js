const Sneaker = require('../models/sneaker.model')
const createError = require('http-errors')

module.exports.exists = (req, res, next) => {
  Sneaker.findById(req.params.id)
    .then((sneaker) => {
      if (sneaker) {
        req.sneaker = sneaker;
        next();
      } else {
        next(createError(404, 'Sneaker not found'))
      }
    })
    .catch(next)
}