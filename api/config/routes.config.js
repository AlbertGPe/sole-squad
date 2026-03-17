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

const storage = require('../config/cloudinary.config')

router.get('/sneakers', sneakers.list)
router.post('/sneakers', secureMid.auth, storage.user.single('images'), sneakers.create) 
router.get('/sneakers/:id', sneakersMid.exists, sneakers.detail)
router.delete('/sneakers/:id', secureMid.auth,  sneakersMid.exists, sneakersMid.checkOwner, sneakers.delete)
router.patch('/sneakers/:id', secureMid.auth, sneakersMid.exists, sneakersMid.checkOwner, sneakers.update)

router.post('/sneakers/:id/like', secureMid.auth, sneakersMid.exists, likes.toggle)

router.post('/sneakers/:id/comment', secureMid.auth, sneakersMid.exists, comments.create)
router.patch('/sneakers/:id/comment/:commentId', secureMid.auth, sneakersMid.exists, commentsMid.exists, commentsMid.checkOwner, comments.update)
router.delete('/sneakers/:id/comment/:commentId', secureMid.auth, sneakersMid.exists, commentsMid.exists, commentsMid.checkOwner, comments.delete)


router.post('/login', users.login);
router.post('logout', secureMid.auth);

router.post('/register', users.create);


router.get('/users', users.list)

router.get('/users/:id', usersMid.exists, users.detail); 
router.get('/users/:id/confirm', usersMid.exists, users.confirm)
router.delete('/users/:id', secureMid.auth, users.delete);
router.patch('/users/:id', secureMid.auth, storage.user.single('image'), users.update);


//router.get('/order', secureMid.auth, users.detail) //x-NEED LOGIN-x, NEED OWNER

module.exports = router;