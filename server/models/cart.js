const mongoose = require('mongoose')
const Item = require('./item')

let cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  quantity : {
      type: Number
  },
  size: {
      type: String
  }
},{ timestamps: true })

cartSchema.pre('save', function(next) {
  return Item.findOne({ 
      _id: this.itemId,
      stock: { $lt : this.quantity }
    })
      .then(data => {
        if(data) {
          throw ({ code : 400, message: 'Item out of stock' })
        }else {
          next()
        }
      })
      .catch(err =>{
        throw(err)
      })
})

let Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart