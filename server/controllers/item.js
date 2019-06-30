const { Item } = require('../models')

class ControllerItem {
    static create(req, res, next) {
        let image = ''
        if(req.file) {
            image = req.file.cloudStoragePublicUrl
        }
        let input = { ...req.body, ...{ image } }
        Item.create(input)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }
    static findAll(req, res, next) {
        Item.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static findOne(req, res, next) {
        Item.findOne({ _id: req.params.id })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
    }
    static update(req, res, next) {
    let image = ''
    if(req.file) {
        image = req.file.cloudStoragePublicUrl
    }
    let input = { ...req.body, ...{ image }}
        Item.findOneAndUpdate({ _id: req.params.id }, input, { new: true })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
    }
    static delete(req, res, next) {
        Item.findOneAndDelete({ _id: req.params.id })
        .then(user => {
            res.status(200).json({ message: 'Delete successfully' })
        })
        .catch(next)
    }
}

module.exports = ControllerItem
