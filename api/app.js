require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose')
const createError = require('http-errors')
const secure = require('./middlewares/secure.mid');

/* MONGODB CONFIG */
require('./config/db.config');

const app = express();

const cors = require('./config/cors.config');
app.use(cors);
app.use(express.json());
app.use(logger('dev'));
app.use(secure.cleanBody);

app.use('/api/v1', require('./config/routes.config'));

/* ERRORS */
app.use((req, res, next) => next(createError(404, 'Route not found')))

app.use((error, req, res, next) => {
  console.error(error);
  if (error instanceof mongoose.Error.ValidationError){
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError && error.path === '_id') {
    const resourceName = error.model().constructor.modelName;
    error = createError(404, `${resourceName} not found`);
  } else if (error.message.includes('E11000')) {
    Object.keys(error.keyValue).forEach((key) => error.keyValue[key] = 'Already exists');
    error = createError(409, { errors: error.keyValue })  //TODO -> Modificar porq sale "message" : "conflict"
  } else if (!error.status) {
    error = createError(500, error);
  }
  console.error(error);

  const data = {
    message: error.message
  }

  if (error.errors) {
    const errors = Object.keys(error.errors) //DEVUELVE EN UN ARRAY LAS CLAVES DEL OBJECT
      .reduce((errors, errorKey) => {
        errors[errorKey] = error.errors[errorKey]?.message || error.errors[errorKey]
        return errors;
      }, {});
    data.errors = errors
  }

  res.status(error.status)
    .json(data)
})

const port = process.env.PORT || 3001
app.listen(port, () => console.info(`Aplication running at port ${port}`))