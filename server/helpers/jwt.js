const jwt = require('jsonwebtoken')

module.exports = {
  sign: function (payload) {
    return jwt.sign(payload, process.env.SECRET_KEY)
  },
  verify: function (token) {
    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch(err) {
        return ({code : 401, message : 'Unauthorized'})
    }
  }
}