const route = require('express').Router()
const { authenticate } = require('../middlewares/auth')
const userRouter = require('./user')
const itemRouter = require('./item')
const cartRouter = require('./cart')
const transactionRouter = require('./transaction')

route.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connect'
    })
})
route.get('/authenticate',authenticate,(req,res) => { 
    res.status(200).json({}) 
})
route.get('/authenticateAdmin',authenticate,(req,res) => { 
    res.status(200).json({}) 
})

route.use('/', userRouter)
route.use('/', itemRouter)
route.use('/', cartRouter)
route.use('/', transactionRouter)

route.use('/*', (req, res) => res.status(404).json({ error: 'Not Found :(' }))

module.exports = route