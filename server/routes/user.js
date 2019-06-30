const route = require('express').Router()
const { ControllerUser } = require('../controllers')

route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)
route.post('/register/admin', ControllerUser.createAdmin)
route.post('/login/admin', ControllerUser.loginAdmin)

module.exports = route