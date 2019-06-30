const { verify } = require('../helpers/jwt');
const { User } = require('../models');
const { Item } = require('../models');

module.exports = {
    authenticate: function(req, res, next) {
        let token = req.headers.token;
        if (!token) {
        throw({ code : 401, message: 'Unauthorized' })
        } else {
            let decoded = verify(token);
            User
            .findOne({
                email: decoded.email
            })
            .then(user => {
                if(user) {
                    req.user = user;
                    next();
                } else {
                    throw({ code : 401, message: 'Unauthorized' })
                }
            })
            .catch(next)
        }
    },
    authenticateAdmin: function(req, res, next) {
        let token = req.headers.token;
        if (!token) {
        throw({ code : 401, message: 'Unauthorized' })
        } else {
            let decoded = verify(token);
            User
            .findOne({
                email: decoded.email
            })
            .then(user => {
                if(user) {
                    if(user.role == 'admin') {
                        req.user = user;
                        next();
                    } else {
                        throw({ code : 401, message: 'Unauthorized' })
                    }
                } else {
                    throw({ code : 401, message: 'Unauthorized' })
                }
            })
            .catch(next)
        }
    },
    authorize: function(req, res, next) {
        let { id } = req.params;
        let userId = req.user._id
        Item
        .findOne({ _id:id })
        .then( data =>{
            if( data ) {
                if( String(data.userId) == String(userId) ) {
                    next()
                } else {
                    throw({ code : 403, message : 'Forbidden' })
                }
            } else {
                throw({ code : 400, message : 'Bad Request' })
            }
        })
        .catch(next)
    }
}