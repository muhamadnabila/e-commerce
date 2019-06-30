const mongoose = require('mongoose')
const { hash } = require('../helpers/bcryptjs')

let validEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Name is required.`],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    validate: [
      {
        validator: validEmail, msg: "Format email is not valid"
      },
      {
        validator: function (value) {
          return User.find({
            _id: { $ne: this._id },
            email: value
          })
          .then(data => {
            if (data.length !== 0) {
              throw 'Email has been used';
            }
          })
          .catch(err => {
            throw err;
          });
        }
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  role : {
    type : String
  }
}, { timestamps: true })

userSchema.pre('save', function (next) {
  this.password = hash(this.password)
  next()
})

let User = mongoose.model('User', userSchema)

module.exports = User