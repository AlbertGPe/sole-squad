const Sneaker = require('../models/sneaker.model')
const createError = require('http-errors')

module.exports.list = (req, res, next) => {
  Sneaker.find()
    .then((sneakers) => res.json(sneakers))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  Sneaker.create(req.body)
    .then((sneaker) => {
      sneaker.new = false
      res.status(201).json(sneaker)
    })
    .catch(next)
}

module.exports.detail = (req, res, next) =>  res.json(req.sneaker)

module.exports.delete = (req, res, next) => {
  Sneaker.deleteOne({ _id: req.sneaker.id })
    .then((sneaker) => res.status(204).send())
    .catch(next)
}

module.exports.update = (req, res, next) => {
  delete req.body.new
  Object.assign(req.sneaker, req.body);
  req.sneaker.save()
    .then((sneaker) => res.json(sneaker))
    .catch(next)
}