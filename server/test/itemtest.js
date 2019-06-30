const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app')
const { clearAllItem } = require('../helpers/clearItem')
const { getToken } = require('../helpers/getToken')
const { createUser } = require('../helpers/createUser')
const { clearAllUser } = require('../helpers/clearUser')

chai.use(chaiHttp);
const expect = chai.expect

before(function() {
    clearAllItem()
})
describe('Item CRUD', function() {
    before(function (done) {
        createUser(done)
    })
    after ( function (done) {
        clearAllUser(done)
    })
    let user = {
        email : 'admin@admin.com',
        password : 'admin',
    }
    var token
    let itemId
    let invalidToken ='1inv4l1dToken'
    before(function(done) {
            getToken(user)
            .then(data => {
                token = data.token
                done()
            })
            .catch(err =>{
                console.log(err)
            })
    })
    describe('POST /items', function() {
        it('should return an object with 201 status code', function(done) {
            let item = {
                name : 'item 01',
                description : 'item 01 description',
                price : 10000,
                stock : 1,
                category : 'male',
                banner : true
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    itemId = res.body._id
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('banner')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let item = {
                description : 'item 01 description',
                price : '10000',
                stock : '1',
                category : 'top',
                banner : true
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Name is required.')
                    expect(['Name is required.']).to.be.ok;
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let item = {
                name : 'item 01',
                price : '10000',
                stock : '1',
                category : 'top',
                banner : true
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Description is required.')
                    expect(['Description is required.']).to.be.ok;
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let item = {
                name : 'item 01',
                description : 'item 01 description',
                stock : '1',
                category : 'top',
                banner : true
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Price is required.')
                    expect(['Price is required.']).to.be.ok;
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let item = {
                name : 'item 01',
                description : 'item 01 description',
                price : '10000',
                category : 'top',
                banner : true
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Stock is required.')
                    expect(['Stock is required.']).to.be.ok;
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let item = {
                name : 'item 01',
                description : 'item 01 description',
                price : '10000',
                stock : '1',
                banner : true
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Category is required.')
                    expect(['Category is required.']).to.be.ok;
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an object with 201 status code', function(done) {
            let item = {
                name : 'item 01',
                description : 'item 01 description',
                price : '10000',
                stock : '1',
                category : 'top',
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('banner')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let item = {
                name : 'item 01',
                description : 'item 01 description',
                price : '10000',
                stock : 0,
                category : 'top',
                banner : true
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Stock minimal : 1')
                    expect(['Stock minimal : 1']).to.be.ok;
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let item = {
                name : 'item 01',
                description : 'item 01 description',
                price : 0,
                stock : 1,
                category : 'top',
                banner : true
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Price minimal : 1')
                    expect(['Price minimal : 1']).to.be.ok;
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an array with 404 status code', function(done) {
            let item = {
                price : 1,
                stock : 1,
                category : 'top',
                banner : true
            }
            chai
                .request(app)
                .post('/items')
                .send(item)
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Name is required.')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
    })
    describe('GET /items', function () {
        it('should return an array with 200 status code', function (done) {
            chai
                .request(app)
                .get(`/items`)
                .set("token",token)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('array')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
        it('should return an object with 200 status code', function (done) {
            chai
                .request(app)
                .get(`/items/${itemId}`)
                .set("token",token)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
        it('should return an object with 404 status code', function (done) {
            chai
                .request(app)
                .get(`/items/1nv4l1dId`)
                .set("token",token)
                .then(function (res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('object')
                    expect(new Error).to.be.an('error')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
        it('should return an object with 401 status code', function (done) {
            chai
                .request(app)
                .get(`/items`)
                .set('token',invalidToken)
                .then(function (res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.a('object')
                    expect(new Error).to.be.an('error')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.deep.equal({ message : 'Unauthorized'})
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
        
    })
    describe('PUT /items', function () {
        it('should return an object with 200 status code', function (done) {
            let updateItem = {
                name : 'item 01 udpdate',
                description : 'item 01 description update',
                price : 1000,
                stock : 1,
                category : 'top',
                banner : true
            }
            
            chai
                .request(app)
                .put(`/items/${itemId}`)
                .send(updateItem)
                .set('token', token)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res).to.be.a('object')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an object with 401 status code', function (done) {
            let updateItem = {
                name : 'item 01 udpdate',
                description : 'item 01 description update',
                price : 1000,
                stock : 1,
                category : 'top',
                banner : true
            }
            chai
                .request(app)
                .put(`/items/${itemId}`)
                .send(updateItem)
                .set('token', invalidToken)
                .then(function (res) {
                    expect(res).to.have.status(401)
                    expect(new Error).to.be.an('error')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.deep.equal({ message : 'Unauthorized'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        it('should return an object with 401 status code', function (done) {
            let updateItem = {
                name : 'item 01 udpdate',
                description : 'item 01 description update',
                price : 1000,
                stock : 1,
                category : 'top',
                banner : true
            }
            chai
                .request(app)
                .put(`/items/${itemId}`)
                .send(updateItem)
                .set('token', '')
                .then(function (res) {
                    expect(res).to.have.status(401)
                    expect(new Error).to.be.an('error')
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.deep.equal({ message : 'Unauthorized'})
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
    })
    describe('DELETE /items', function () {
            it('should return an object with 200 status code', function (done) {
                chai
                    .request(app)
                    .delete(`/items/${itemId}`)
                    .set('token', token)
                    .then(function (res) {
                        expect(res).to.have.status(200)
                        expect(res).to.be.a('object')
                        expect(res.body).to.have.property('message')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('should return an object with 401 status code', function (done) {
                chai
                    .request(app)
                    .delete(`/items/${itemId}`)
                    .set('token', invalidToken)
                    .then(function (res) {
                        expect(res).to.have.status(401)
                        expect(res).to.be.a('object')
                        expect(res.body).to.have.property('message')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('should return an object with 401 status code', function (done) {
                chai
                    .request(app)
                    .delete(`/items/${itemId}`)
                    .set('token', '')
                    .then(function (res) {
                        expect(res).to.have.status(401)
                        expect(res).to.be.a('object')
                        expect(res.body).to.have.property('message')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    })
})