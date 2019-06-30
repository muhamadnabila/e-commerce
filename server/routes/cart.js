const route = require('express').Router()
const { ControllerCart } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

route.post('/cart', authenticate, ControllerCart.create)
route.get('/cart', authenticate, ControllerCart.findAll)
route.get('/cart/:id', authenticate, ControllerCart.findOne)
route.put('/cart/:id', authenticate, ControllerCart.update)
route.delete('/cart/:id', authenticate, ControllerCart.delete)

module.exports = route