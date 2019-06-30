const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app')
const { clearAllUser } = require('../helpers/clearUser')
const { getToken } = require('../helpers/getToken')

chai.use(chaiHttp);
const expect = chai.expect

after ( function (done) {
    clearAllUser(done)
})

describe('User CRUD', function() {
    
    before(function(done) {
        clearAllUser(done)
    })
    after ( function (done) {
        clearAllUser(done)
    })
    
    describe('POST /register', function() {
        it('should return an object with 201 status code', function(done) {
            let user = {
                email : 'bilal@mail.com',
                name : 'Bilal',
                password : 'secret'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('name')
                    done()
                })
                .catch(err => {
                    console.log(err)
                    done()
                })
        })
        it('should return an object with 201 status code', function(done) {
            let user = {
                email : 'bilalmailcom',
                name : 'Bilal',
                password : 'secret'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error')
                    expect(res.body).to.contain('Format email is not valid')
                    done()
                })
                .catch(err => {
                    console.log(err)
                    done()
                })
        })
        it('should return an object with 404 status code', function(done) {
            let user = {
                email : 'bilal@mail.com',
                name : 'Bilal',
                password : 'secret'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Email has been used')
                    done()
                })
                .catch(err => {
                    console.log(err)
                    done()
                })
        })
        it('should return an object with 404 status code', function(done) {
            let user = {
                email : 'bilal@mail.com',
                password : 'secret',
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(res.body).to.include('Name is required.')
                    expect(['Name is required.']).to.be.ok;
                    expect(new Error).to.be.an('error');
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
        it('should return an object with 404 status code', function(done) {
            let user = {
                email : 'bilal@mail.com',
                name : 'Bilal',
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Password is required.')
                    expect(['Password is required.']).to.be.ok;
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
        it('should return an object with 404 status code', function(done) {
            let user = {
                password : 'secret',
                name : 'Bilal',
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error')
                    expect(res.body).to.include('Email is required.')
                    expect(['Email is required.']).to.be.ok;
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
        it('should return an object with 404 status code', function(done) {
            let user = {
                email : 'bilal@mail.com',
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Name is required.','Password is required.')
                    expect(['Name is required.','Password is required.']).to.be.ok;
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
        it('should return an object with 404 status code', function(done) {
            let user = {
                name : 'Bilal'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Email is required.','Name is required.')
                    expect(['Email is required.','Name is required.']).to.be.ok;
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
        it('should return an object with 404 status code', function(done) {
            let user = {}
            chai
                .request(app)
                .post('/register')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.a('array')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.include('Email is required.','Name is required.','Password is required.')
                    expect(['Name is required.','Email is required.','Password is required.']).to.be.ok;
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
    })
    describe('POST /login', function() {
        it('should return an object with 200 status code', function(done) {
            let user = {
                email : 'bilal@mail.com',
                password : 'secret'
            }
            chai
                .request(app)
                .post('/login')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.keys('token','name','role')
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
        it('should return an object with 400 status code', function(done) {
            let user = {
                email : 'bilal@mail.com',
            }
            chai
                .request(app)
                .post('/login')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.a('object')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.deep.equal({ message : 'Username/ password invalid'})
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
        it('should return an object with 400 status code', function(done) {
            let user = {
                password : 'secret',
            }
            chai
                .request(app)
                .post('/login')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.a('object')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.deep.equal({ message : 'Username/ password invalid'})
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
        it('should return an object with 400 status code', function(done) {
            let user = {
                email : 'bilal@mail.com',
                password : 'secretboy',
            }
            chai
                .request(app)
                .post('/login')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.a('object')
                    expect(new Error).to.be.an('error');
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.deep.equal({ message : 'Username/ password invalid'})
                    done()
                })
                .catch(err => {
                    console.log(err)
                }) 
        })
    })
    describe('POST /register/admin', function() {
        it('should return an object with 201 status code', function(done) {
            let user = {
                email : 'admin@admin.com',
                password : 'admin',
                role : 'admin',
                name : 'admin'
            }
            chai
                .request(app)
                .post('/register/admin')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('role')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe('POST /login/admin', function() {
        it('should return an object with 200 status code', function(done) {
            let user = {
                email : 'admin@admin.com',
                password : 'admin',
            }
            chai
                .request(app)
                .post('/login/admin')
                .send(user)
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('role')
                    done()
                })
                .catch(err =>{
                    console.log(err)
                })
        })
    })
    describe('GET /authenticate', function() {
        let user = {
            email : 'bilal@mail.com',
            password : 'secret',
        }
        let token
        before(function(done) {
                getToken(user)
                .then(data => {
                    token = data.token
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
        it('should return an object with 200 status code', function(done) {
            chai
                .request(app)
                .get('/authenticate')
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe('GET /authenticateAdmin', function() {
        let user = {
            email : 'admin@admin.com',
            password : 'admin',
        }
        let token
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
        it('should return an object with 200 status code', function(done) {
            chai
                .request(app)
                .get('/authenticateAdmin')
                .set('token',token)
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
})