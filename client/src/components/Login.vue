<template>
  <div>
      <div class="d-flex justify-content-center" style=" margin:10px auto;">
          <img src="https://www.stickpng.com/assets/images/585990814f6ae202fedf28d6.png" alt="logo" style="width:200px">
      </div>
    <hr>
    <div class="d-flex justify-content-center mb-5" style="width:500px; margin:10px auto;">
        <form @submit.prevent="login" style="width: 100%">
          <p v-show="page === 'login'" style="font-weight: bold; text-align: center;">To continue, log in to hndsupplyco.</p>
          <p v-show="page === 'register'" style="font-weight: bold; text-align: center;">Sign up with your email</p>
          <div v-for="(errorMessage,index) in errorMessages" :key="index">
            <div  class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
          </div>
          <span>{{ errorMessageLogin }}</span>
          <div class="form-group">
            <input @blur="errorMessageLogin = '', errorMessages = ''" v-model="newUser.email" type="email" class="form-control rounded-0"  aria-describedby="emailHelp" placeholder="Email address">
          </div>
          <div class="form-group">
            <input @blur="errorMessages = ''" v-model="newUser.password" type="password" class="form-control rounded-0"  placeholder="Password">
          </div>
          <div v-show="page === 'register'" class="form-group">
            <input @blur="checkPassword" v-model="newUser.passwordConfirm"  type="password" class="form-control rounded-0"  aria-describedby="emailHelp" placeholder="Password">
            <span v-show="passwordError">*password doesn't match</span>
          </div>
          <div v-show="page === 'register'" class="form-group">
            <input @blur="errorMessages = ''" v-model="newUser.name" type="text" class="form-control rounded-0"  aria-describedby="emailHelp" placeholder="Name">
          </div>
          <input v-show="page === 'login'" type="submit" class="btn btn-dark rounded-pill" style="width:100%; height: 50px; font-weight:bold;" value="LOG IN">
          <input v-show="page === 'register'" type="submit" class="btn btn-dark rounded-pill" style="width:100%; height: 50px; font-weight:bold;" value="REGISTER">
        </form>
      </div>
      <hr style="border: 1px solid rgb(153, 150, 150); width:500px">
      <div class="d-flex justify-content-center" style="width:500px; margin:50px auto;">
        <form v-show="page === 'login'" style="width: 100%">
          <h5 style="text-align: center; font-weight:bold;">
            Don't have an account?
          </h5>
          <div class="form-group mt-4">
            <button @click.prevent="registerPageTrigger"  type="submit" class="btn btn btn-outline-secondary rounded-pill" style="width:100%; height: 50px; font-weight:bold;">SIGN UP FOR HNDSUPPLYCO.</button>
          </div>
        </form>
        <form v-show="page === 'register'" style="width: 100%">
          <h5 style="text-align: center; font-weight:bold;">
            Already have an account?
          </h5>
          <div class="form-group mt-4">
            <button @click.prevent="loginPageTrigger"  type="submit" class="btn btn btn-outline-secondary rounded-pill" style="width:100%; height: 50px; font-weight:bold;">Login</button>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import axios from '@/api/server.js'
export default {
  name: 'login',
  props: {
    msg: String
  },
  data () {
    return {
      page: 'login',
      newUser: {
        email: '',
        password: '',
        passwordConfirm: '',
        name: ''
      },
      passwordError: false,
      errorMessages: '',
      errorMessageLogin: ''
    }
  },
  methods: {
    registerPageTrigger () {
      this.page = 'register'
    },
    loginPageTrigger () {
      this.page = 'login'
    },
    login () {
      if (this.page === 'login') {
        axios.post('/login', {
          email: this.newUser.email,
          password: this.newUser.password,
          role: 'customer'
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('role', data.role)
            if(data.role == 'admin'){
              this.$router.push('/dashboard')
            }else {
              this.$router.push('/')
            }
          })
          .catch(err => {
            this.errorMessageLogin = err.response.data.message
          })
      } else {
        axios.post('/register', {
          email: this.newUser.email,
          password: this.newUser.password,
          name: this.newUser.name,
          role: 'customer'
        })
          .then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('role', data.role)
            this.$router.push('/')
          })
          .catch(err => {
            this.errorMessages = err.response.data
          })
      }
    },
    checkPassword () {
      (this.newUser.password !== this.newUser.passwordConfirm) ? this.passwordError = true : this.passwordError = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  color: red;
}
</style>
