const { Cart } = require('../models')

class ControllerCart {
    static create(req, res, next) {
      let userId = req.user._id
      let cart = { ...req.body, ...{ userId } }
      Cart.create(cart)
        .then(data => {
          res.status(201).json(data)
        })
        .catch(next)
    }
    static findAll(req, res, next) {
      let userId = req.user._id
      Cart.find({ userId })
      .populate('userId')
      .populate('itemId')
      .then (data => {
        res.status(200).json(data)
      })
      .catch(next)
    }
    static findOne(req, res, next) {
      Cart.findOne({ _id: req.params.id })
      .then (data => {
        res.status(200).json(data)
      })
      .catch(next)
    }
    static update(req, res, next) {
      Cart.findOne({ _id: req.params.id })
      .then (data => {
        data.set(req.body)
        return data.save()
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
    }
    static delete(req, res, next) {
      Cart.findOneAndDelete({ _id: req.params.id })
      .then (data => {
        res.status(200).json(data)
      })
      .catch(next)
    }
}

module.exports = ControllerCart