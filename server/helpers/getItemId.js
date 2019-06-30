const { Item } = require('../models')

module.exports = {
    getItemId : function (user) {
        if (process.env.NODE_ENV === 'test') {
            let { email, password } = user
            return User
                .findOne({ email })
                .then(function(user) {
                    if (!user) {
                        throw ({ code : 400, message: 'Username/ password invalid' })
                    } else {
                        if(!password) {
                            throw ({ code : 400, message: 'Username/ password invalid' })
                        }
                        if (!compare(password, user.password)) {
                            throw ({ code : 400, message: 'Username/ password invalid' })
                        } else {

                            let token = sign({email: user.email})
                            let userId = user._id
                            return {token, userId}
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
}