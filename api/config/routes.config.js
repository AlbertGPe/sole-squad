const express = require('express');
const router = express.Router();

const sneakers = require('../controllers/sneakers.controllers');
const users = require('../controllers/users.controllers')
const comments = require('../controllers/comments.cotrollers')
const likes = require('../controllers/likes.controllers')

const sneakersMid = require('../middlewares/sneakers.mid')
const usersMid = require('../middlewares/users.mid')
const commentsMid = require('../middlewares/comments.mid')
const secureMid = require('../middlewares/secure.mid')

const todo = (req, res, next) => res.send('TODO');

router.get('/sneakers', sneakers.list)
router.post('/sneakers', secureMid.auth, sneakers.create) //x-NEED LOGIN-x -- NEED OWNER
router.get('/sneakers/:id', sneakersMid.exists, sneakers.detail)
router.delete('/sneakers/:id', secureMid.auth,  sneakersMid.exists, sneakersMid.checkOwner, sneakers.delete) //x-NEED LOGIN-x -- x-NEED OWNER-x
router.patch('/sneakers/:id', secureMid.auth, sneakersMid.exists, sneakersMid.checkOwner, sneakers.update) //x-NEED LOGIN-x -- x-NEED OWNER-x

router.post('/sneakers/:id/like', secureMid.auth, sneakersMid.exists, likes.toggle) //x-NEED LOGIN-x

router.post('/sneakers/:id/comment', secureMid.auth, sneakersMid.exists, comments.create) //x-NEED LOGIN-x
router.patch('/sneakers/:id/comment/:commentId', secureMid.auth, sneakersMid.exists, commentsMid.exists, commentsMid.checkOwner, comments.update) //x-NEED LOGIN-x, NEED OWNER
router.delete('/sneakers/:id/comment/:commentId', secureMid.auth, sneakersMid.exists, commentsMid.exists, commentsMid.checkOwner, comments.delete) //x-NEED LOGIN-x, NEED OWNER


router.post('/login', users.login);
router.post('logout', secureMid.auth, todo); //x-NEED LOGIN-x

router.post('/register', users.create);


router.get('/users', users.list) //SOLO PARA PRUEBAS, BORRAR AL FINAL

router.get('/users/:id', usersMid.exists, users.detail); 
router.get('/users/:id/confirm', usersMid.exists, users.confirm)
router.delete('/users/:id', secureMid.auth, users.delete); //x-NEED LOGIN-x, NEED OWNER
router.patch('/users/:id', secureMid.auth, users.update); //x-NEED LOGIN-x, NEED OWNER


router.post('/order', secureMid.auth, todo) //x-NEED LOGIN-x, NEED OWNER

module.exports = router;