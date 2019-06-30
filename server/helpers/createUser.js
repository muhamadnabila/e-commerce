const { User } = require('../models')

module.exports = {
    createUser(done) {
        if (process.env.NODE_ENV === 'test') {
            User.create({
                name : 'admin',
                email : 'admin@admin.com',
                password : 'admin',
                role : 'admin'
            })
            .then(data => {
                console.log('admin created')
                return User.create({
                    name : 'bilal',
                    email : 'bilal@mail.com',
                    password : 'a',
                    role : 'customer'
                })
            })
            .then(data => {
                done()
                console.log('user created')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}