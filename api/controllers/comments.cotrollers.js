const Comment = require('../models/comment.model')

module.exports.create = (req, res, next) => {
  Comment.create({
    text: req.body.text, 
    sneaker: req.params.id,
    author: "643ee1be6a7e66b8ce5a9432" //TODO AUTH - req.user.id
  })
  .then((comment) => res.json(comment))
  .catch(next)
}

module.exports.update = (req, res, next) => {
  Object.assign(req.comment, req.body)
  req.comment
    .save()
    .then((comment) => res.json(comment))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Comment.deleteOne({ _id: req.comment.id })
    .then(() => res.status(204).send())
    .catch(next);
}