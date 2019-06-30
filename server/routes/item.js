const route = require('express').Router()
const { authenticateAdmin } = require('../middlewares/auth')
const { authenticate } = require('../middlewares/auth')
const { ControllerItem } = require('../controllers')
const images = require('../helpers/images')

route.post('/items', images.multer.single('image'), images.sendUploadToGCS, authenticateAdmin, ControllerItem.create)
route.get('/items', authenticate, ControllerItem.findAll)
route.get('/items/:id', authenticate, ControllerItem.findOne)
route.put('/items/:id', images.multer.single('image'), images.sendUploadToGCS, authenticateAdmin, ControllerItem.update)
route.delete('/items/:id', authenticateAdmin,  ControllerItem.delete)

module.exports = route