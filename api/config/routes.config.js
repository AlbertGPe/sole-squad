const express = require('express');
const router = express.Router();
const sneakers = require('../controllers/sneakers.controllers');
const sneakersMid = require('../middlewares/sneakers.mid')

router.get('/sneakers', sneakers.list)
router.post('/sneakers', sneakers.create)
router.get('/sneakers/:id', sneakersMid.exists, sneakers.detail)
router.delete('/sneakers/:id', sneakersMid.exists, sneakers.delete)
router.patch('/sneakers/:id', sneakersMid.exists, sneakers.update)

module.exports = router;