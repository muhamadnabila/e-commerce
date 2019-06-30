const { Transaction } = require('../models')
const moment = require('moment')
const { nodeMailer } = require('../helpers/nodemailer')

class ControllerTransaction {
    static create(req, res, next) {
        let userId = req.user._id
        let cart = { ...req.body, ...{ userId } }
        Transaction.create(cart)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static findAll(req, res, next) { 
        let userId = req.user._id
        let role = req.user.role
        let query = {}
        if(role == 'customer') {
            query = {
                userId
            }
        }
        Transaction.find(query).sort([['createdAt', -1]])
          .then(data => {
              res.status(200).json(data)
          })
          .catch(next)
    }
    static findOne(req, res, next) {
        Transaction.findOne({ _id: req.params.id })
          .then(data => {
              res.status(200).json(data)
          })
          .catch(next)
     }
    static update(req, res, next) {
        let receiptImage
        let input  
        let sendNotif = false
        if(req.file) {
            receiptImage = req.file.cloudStoragePublicUrl
            input = {
                payment: { ...req.body, ...{ receiptImage } },
                status: 'packaging',
                amount: req.body.amount
            }
            sendNotif = true
        }else {
            input = req.body
        }
        Transaction.findOneAndUpdate({
            _id: req.params.id
        }, input, { new: true })
          .then(data => {
              if(sendNotif){
                return nodeMailer()
                .then(() => {
                    res.status(200).json(data)
                })
              }
          })
          .catch(next)
    }
    static delete(req, res, next) { 
        Transaction.findByIdAndDelete({ _id: req.params.id })
        .then(data => {
            res.status(200).json({ message: 'Delete successfully' })
        })
        .catch(next)
    }

}

module.exports = ControllerTransaction