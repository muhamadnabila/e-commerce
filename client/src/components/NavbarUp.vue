<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <span class="navbar-brand">
            <router-link to="/">
                <img src="https://www.stickpng.com/assets/images/585990814f6ae202fedf28d6.png" alt="" srcset="">
            </router-link>
        </span>
        <div class="collapse navbar-collapse ml-5" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                 <li class="nav-item active">
                    <router-link class="transaction" to="/transaction">Transaction</router-link>
                    <router-link class="transaction ml-5" to="/listItem/male">Collection</router-link>
                </li>
            </ul>
            <ul class="navbar-nav mr-4">
                <li class="nav-item active">
                    <router-link to="/cart"><i class="fas fa-shopping-cart">{{ cartsTotal }}</i></router-link>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <span @click="logout" class="nav-link logout"> Log out</span>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import axios from '@/api/server.js'
export default {
    name: 'navbarUp',
    data () {
        return {
            cartsTotal: null
        }
    },
    methods : {
        logout () {
            localStorage.clear()
            this.$router.push('/login')
        }
    },
    computed: {
        totalCarts () {
            if(this.$store.state.carts.length == 0){
                return ''
            }else{
                return this.$store.state.carts.length
            }
        }
    },
    mounted () {
        let token = localStorage.getItem('token')
        axios.get('/cart', { headers: { token }})
          .then(({ data }) => {
              if(data.length == 0) {
                  this.cartsTotal = null
              }else {
                  this.cartsTotal = data.length
              }
          })
          .catch(err => {
              console.log(err)
          })
    }
}

</script>

<style scoped>
.logout {
    cursor: pointer;
}
.transaction {
    color: grey;
    text-decoration: none
}
.transaction:hover {
    color: #000000
}
.navbar-expand-lg {
  border-top: 3px solid;
  margin-top: 2px;
  background-color: aliceblue;
  color: black;
  text-align: center;
  font-family: Georgia, serif;
  font-size: 25px;
  letter-spacing: 2px;
  word-spacing: 2px;
  text-decoration: normal solid rgb(68, 68, 68);
  color: #000000;
  font-weight: normal;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
}
.fas {
    color: black
}
img {
 width: 150px;
}
</style>
