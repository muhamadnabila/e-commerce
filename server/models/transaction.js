const mongoose = require('mongoose')
const Cart = require('./cart')
const moment = require('moment')

let transactionSchema = new mongoose.Schema({
  carts: [Object],
  status: {
      type: String,
      default: 'pending'
  },
  amount: {
      type: Number,
      min: [1, 'amount minimal : 1']
  },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  payment : {
      type: Object,
  },
  arrivedConfirmationUser : {
      type: Boolean,
      default: false
  },
  arrivedConfirmationAdmin : {
      type: Boolean,
      default: false
  },
  date: {
      type: String
  }
},{ timestamps: true })

transactionSchema.post('save', function(doc,next) {
    Cart.deleteMany({ userId : this.userId })
    .then(data => {
        next()
    })
    .catch(err => {
        throw(err)
    })
})
transactionSchema.pre('save', function(next) {
    this.date = moment(this.createdAt).format('M')
    next()
})

let Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction