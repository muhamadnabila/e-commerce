const mongoose = require('mongoose')

let itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Name is required.`],
  },
  description: { 
    type: String,
    required: [true, 'Description is required.'],
    },
  price: {
    type: Number,
    min: [1, 'Price minimal : 1'],
    required: [true, 'Price is required.'],
  },
  stock: {
    type: Number,
    min: [1, 'Stock minimal : 1'],
    required: [true, 'Stock is required.'],
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
  },
  banner: {
    type: Boolean,
    default : false
  },
  image: {
    type: String,
  }
},{ timestamps: true })


let Item = mongoose.model('Item', itemSchema)

module.exports = Item