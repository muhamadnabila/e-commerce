const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app')
const { clearAllTransaction } = require('../helpers/clearTransaction')
const { getToken } = require('../helpers/getToken')
const { createUser } = require('../helpers/createUser')
const { clearAllUser } = require('../helpers/clearUser')

chai.use(chaiHttp)
const expect = chai.expect

before (function() {
    clearAllTransaction()
})
after (function() {
    clearAllTransaction()
})
describe('Transaction CRUD', function () {
    before(function (done) {
        createUser(done)
    })
    after ( function (done) {
        clearAllUser(done)
    })
    let user = {
        email: 'bilal@mail.com',
        password: 'a'
    }
    let token
    let userId
    let invalidToken = '1nval1dt0k3n' 
    var transactionId
    let invalidTransactionId = 'invalid'
    before(function(done) {
        getToken(user)
        .then(data => {
            token = data.token
            userId = data.userId
            done()
        })
        .catch(err =>{
            console.log(err)
        })
    })
    describe('POST /transaction', function() {
        it('should return an object with 201 status code', function(done) {
            let data = {
                carts : [{
                    name: 'sweater',
                    description: 'warna hitam nimbul-nimbul from window',
                    price: 10000,
                    quantity: 2
                }],
                amount : 20000,
                userId : userId,
                date : '6',
                payment: {
                    firstName: 'bilal',
                    lastName: 'ghozali'
                },
            }
            chai
                .request(app)
                .post('/transaction')
                .send(data)
                .set('token',token)
                .then(function(res) {
                    transactionId = res.body._id
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('carts')
                    expect(res.body).to.have.property('status')
                    expect(res.body).to.have.property('amount')
                    expect(res.body).to.have.property('userId')
                    expect(res.body).to.have.property('payment')
                    expect(res.body).to.have.property('arrivedConfirmationUser')
                    expect(res.body).to.have.property('arrivedConfirmationAdmin')
                    expect(res.body).to.have.property('date')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let data = {
                carts : [{
                    name: 'sweater',
                    description: 'warna hitam nimbul-nimbul from window',
                    price: 10000,
                    quantity: 2
                }],
                amount : -1,
                userId : userId,
                date : '6',
                payment: {
                    firstName: 'bilal',
                    lastName: 'ghozali'
                },
            }
            chai
                .request(app)
                .post('/transaction')
                .send(data)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(res.body).to.deep.equal(['amount minimal : 1'])
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let data = {
                carts : [{
                    name: 'sweater',
                    description: 'warna hitam nimbul-nimbul from window',
                    price: 10000,
                    quantity: 2
                }],
                amount : 'it is not a number',
                userId : userId,
                date : '6',
                payment: {
                    firstName: 'bilal',
                    lastName: 'ghozali'
                },
            }
            chai
                .request(app)
                .post('/transaction')
                .send(data)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 401 status code', function(done) {
            let data = {
                carts : [{
                    name: 'sweater',
                    description: 'warna hitam nimbul-nimbul from window',
                    price: 10000,
                    quantity: 2
                }],
                amount : 'it is not a number',
                userId : userId,
                date : '6',
                payment: {
                    firstName: 'bilal',
                    lastName: 'ghozali'
                },
            }
            chai
                .request(app)
                .post('/transaction')
                .send(data)
                .set('token',invalidToken)
                .then(function(res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.deep.equal({message: 'Unauthorized'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
       
    })
    describe('GET /transaction', function() {
        it('should return an array with 200 status code', function(done) {
            chai
                .request(app)
                .get('/transaction')
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('array')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 401 status code', function(done) {
            chai
                .request(app)
                .get('/transaction')
                .set('token',invalidToken)
                .then(function(res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.deep.equal({message: 'Unauthorized'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 200 status code', function(done) {
            chai
                .request(app)
                .get(`/transaction/${transactionId}`)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 401 status code', function(done) {
            chai
                .request(app)
                .get(`/transaction/${transactionId}`)
                .set('token',invalidToken)
                .then(function(res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.deep.equal({message: 'Unauthorized'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            chai
                .request(app)
                .get(`/transaction/${invalidTransactionId}`)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.deep.equal({message: 'Bad request'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
    })
    describe('PUT /transaction', function() {
        let update = {
            carts : [{
                name: 'sweater',
                description: 'warna hitam nimbul-nimbul from window',
                price: 10000,
                quantity: 2
            }],
            amount : 20000,
            userId : userId,
            date : '6',
            payment: {
                firstName: 'bilal',
                lastName: 'ghozali'
            },
            status: 'Packaging'
        }
        it('should return an array with 404 status code', function(done) {
            chai
            .request(app)
            .put(`/transaction/${invalidTransactionId}`)
            .send(update)
            .set('token',token)
            .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.deep.equal({message: 'Bad request'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 401 status code', function(done) {
            chai
            .request(app)
            .put(`/transaction/${invalidTransactionId}`)
            .send(update)
            .set('token',invalidToken)
            .then(function(res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.deep.equal({message: 'Unauthorized'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
    })
    describe('DELETE /transaction', function() {
        it('should return an array with 401 status code', function(done) {
            chai
            .request(app)
            .delete(`/transaction/${invalidTransactionId}`)
            .set('token',invalidToken)
            .then(function(res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.deep.equal({message: 'Unauthorized'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 401 status code', function(done) {
            chai
            .request(app)
            .delete(`/transaction/${transactionId}`)
            .set('token',token)
            .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            chai
            .request(app)
            .delete(`/transaction/${invalidTransactionId}`)
            .set('token',token)
            .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.deep.equal({message: 'Bad request'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
    })
})