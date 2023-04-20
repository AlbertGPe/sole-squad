const Like = require('../models/like.model')

module.exports.toggle = (req, res, next) => {
  const params = {
    sneaker: req.params.id,
    user: "643ee1be6a7e66b8ce5a9432" //TODO AUTH - req.user.id
  };

  Like.findOne(params)
    .then((like) => {
      if (like) {
        return Like.deleteOne({ _id: like.id });
      } else {
        return Like.create(params);
      }
    })
    .then((like) => res.json(like))
    .catch(next)
}