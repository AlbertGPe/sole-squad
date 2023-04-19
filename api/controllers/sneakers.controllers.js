const Sneaker = require('../models/sneaker.model')
const createError = require('http-errors')

module.exports.list = (req, res, next) => {
  Sneaker.find()
    .then((sneakers) => res.json(sneakers))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  Sneaker.create(req.body)
    .then((sneaker) => res.status(201).json(sneaker))
    .catch(next)
}

module.exports.detail = (req, res, next) =>  res.json(req.sneaker)

module.exports.delete = (req, res, next) => {
  Sneaker.deleteOne({ _id: req.sneaker.id })
    .then((sneaker) => res.status(204).send())
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const data = {
    name: req.body.name,
    price: req.body.price,
    brand: req.body.brand,
    description: req.body.description,
    details: req.body.details,
    gender: req.body.gender,
    release_date: req.body.release_date,
    images: req.body.images,
    box_condition: req.body.box_condition
  }
  Object.assign(req.sneaker, data);
  req.sneaker.save()
    .then((sneaker) => res.json(sneaker))
    .catch(next)
}