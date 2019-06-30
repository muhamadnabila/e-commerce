const bcrypt = require('bcryptjs')

module.exports = {
  hash: function (password) {
    try {
        return bcrypt.hashSync (password, 10)
    } catch(err) {
        throw  ({code : 400, message : 'Password required'})
    }
  },
  compare: function(password, hash) {
    return data = bcrypt.compareSync(password, hash)
  }
}