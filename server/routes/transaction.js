const route = require('express').Router()
const { ControllerTransaction } = require('../controllers')
const { authenticate } = require('../middlewares/auth')
const images = require('../helpers/images')

route.post('/transaction',  authenticate, ControllerTransaction.create)
route.get('/transaction', authenticate, ControllerTransaction.findAll)
route.get('/transaction/:id', authenticate, ControllerTransaction.findOne)
route.put('/transaction/:id', images.multer.single('image'), images.sendUploadToGCS, authenticate, ControllerTransaction.update)
route.delete('/transaction/:id', authenticate, ControllerTransaction.delete)


module.exports = route