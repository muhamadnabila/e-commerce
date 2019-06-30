const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
const { User } = require('../models')

class ControllerUser {
    static login(req, res, next) {
        let { email, password } = req.body
        User
        .findOne({ email })
        .then(user => {
            if (!user) {
                throw ({ code : 400, message: 'Username/ password invalid' })
            } else {
                if(!password) {
                    throw ({ code : 400, message: 'Username/ password invalid' })
                }
                if (!compare(password, user.password)) {
                    throw ({ code : 400, message: 'Username/ password invalid' })
                } else {
                    let token = sign({ email: user.email })
                    if(user.role === 'admin') {
                        res.status(200).json({ 
                            token,
                            name : user.name,
                            role : user.role
                        })
                    } else {
                        res.status(200).json({ 
                            token,
                            name : user.name,
                            role: 'customer'
                        })
                    }
                }
            }
        })
        .catch(next)
    }
    static create (req, res, next) {
        let user = { ...req.body }
        User.create(user)
        .then(data => {
            let token = sign({ email: data.email })
            if(data.role == 'admin') {
                res.status(201).json({
                    token,
                    name : data.name,
                    role : data.role
                })
            }else {
                res.status(201).json({
                    token,
                    name : data.name,
                    role: 'customer'
                })
            }
        })
        .catch(next)
    }
    static createAdmin (req, res, next) {
        let user = { ...req.body }
        User.create(user)
        .then(data => {
            let token = sign({ email: data.email })
                res.status(201).json({
                    token,
                    name : data.name,
                    role : data.role
                })
        })
        .catch(next)
    }
    static loginAdmin(req, res, next) {
        let { email, password } = req.body
        User.findOne({ 
            role : 'admin',
            email
        })
        .then(user => {
            if(!user) {
                res.status(400).json('Username/ password invalid')
            }else {
                if(!password) {
                    throw ({ code : 400, message: 'Username/ password invalid' })
                }
                if (!compare(password, user.password)) {
                    throw ({ code : 400, message: 'Username/ password invalid' })
                } else {
                    let token = sign({email: user.email})
                    res.status(200).json({ 
                        token,
                        name : user.name,
                        role : user.role
                    })
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}
module.exports = ControllerUser