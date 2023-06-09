const User = require('../models/user.model')
const createError = require('http-errors')
const mailer = require('../config/mailer.config')
const jwt = require('jsonwebtoken')

const studentConfirmationRequired = process.env.USER_CONFIRMATION_REQUIRED === 'true'
const maxSessionTime = parseInt(process.env.MAX_SESSION_TIME) || 604800;

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      if (studentConfirmationRequired){
        mailer.sendConfirmationEmail(user);
      }
      res.status(201).json(user);
    })
    .catch(next)
}

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next)
}

module.exports.detail = (req, res, next) => res.json(req.user)

module.exports.delete = (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(createError(403, 'Forbidden'))
  }

  User.deleteOne({ _id: req.user.id })
    .then((user) => res.status(204).send())
    .catch(next)
}

module.exports.update = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(createError(403, 'Forbidden'))
  }

  const updateCriterial = {};

  if (req.file) {
    updateCriterial.image = req.file.path;
  }

  if (req.body.description) updateCriterial.description = req.body.description;

  if (req.body.instagramUrl) updateCriterial.instagramUrl = req.body.instagramUrl;
 
  Object.assign(req.user, updateCriterial);
  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next)
}

module.exports.confirm = (req, res, next) => {
  req.user.confirm = true;

  req.user
    .save()
    .then((user) => res.json(user))//res.redirect(`${process.env.WEB_URL}/login`))
    .catch(next)
}

module.exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user || !req.body.password) {
        return next(createError(401, { errors: { password: 'Invalid credentials, please check the username or password' }}));
      } 

      if (!user.confirm){
        return next(createError(401, { errors: { username: 'Please confirm your account' }}));
      }

      user.checkPassword(req.body.password)
        .then((match) => {
          if (!match) {
            return next(createError(401, { errors: { password: 'Invalid credentials, please check the username or password' }}));
          }

          const token = jwt.sign({ sub: user.id, exp: (Date.now() / 1000) + maxSessionTime}, process.env.TOKEN);
          res.json({ token, ...user.toJSON() })
        });
    })
    .catch(next);
}