<template>
    <div>
        <NavbarUp></NavbarUp>
        <div class="container shadow-sm p-3 mt-5 bg-white rounded ">
            <div class="d-flex justify-content-between mb-3">
                <h2>YOUR SHOPPING BAG</h2>
                <button v-if="buttonConfirm" @click="checkout" type="button" class="btn btn-info">CHECKOUT</button>
                <button v-if="!buttonConfirm" type="button" class="btn btn-secondary" disabled>CHECKOUT</button>
            </div>
            <div v-show="errorMessage.status" class="alert alert-danger" role="alert">
                <span @click="errorMessage.status = false" style="margin-right:100px">X</span>
                {{errorMessage.message}} 
            </div>
                <div class="table-cart">
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Size</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Total</th>
                            <th scope="col"></th>                            
                        </tr>
                    </thead>
                    <h3>
                        {{checkEmptyCart}}
                    </h3>
                    <CartItem v-for="(cart,index) in carts" :key="index" @errorStock="errorMessage.message = $event, errorMessage.status = true" :cartTable="cart" @fetchCart="fetchCart"></CartItem>
                </table>
                <hr>
                <div>
                    <div class="row ">
                        <div class="col-6 d-flex justify-content-end">
                            <h5>Total</h5>
                        </div>
                        <div class="col-6 d-flex justify-content-end">
                            <h5>IDR {{ totalPrice }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import axios from '@/api/server.js'
import NavbarUp from '@/components/NavbarUp.vue'
import CartItem from '@/components/CartItem.vue'
export default {
    name: 'cart',
    components: {
        NavbarUp,
        CartItem
    },
    data () {
      return {
          carts: [],
          errorMessage : {
              status: false,
              message: ''
          },
          total: 0
      }
    },
    created () {
      this.fetchCart()
    },
    methods: {
        fetchCart () {
            let token = localStorage.getItem('token')
            axios.get('/cart',{ headers: { token } })
            .then(({ data }) => {
              this.carts = []
              this.carts = data
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteCart (cartId) {
            let token = localStorage.getItem('token')
            axios.delete(`/cart/${cartId}`, { headers: { token } })
            .then(({ data }) => {
                this.fetchCart()
            })
            .catch(err => {
                console.log(err)
            })
        },
        checkout () {
            let token = localStorage.getItem('token')
            axios.post('/transaction', { 
                carts: this.carts
            }, 
            { headers: { token } })
              .then(({ data }) => {
                  this.$store.commit('checkout',this.carts)
                  this.$router.push(`/payment/${data._id}`)
              })
              .catch(err => {
                  console.log(err)
              })
        }
    },
    computed: {
        totalPrice () {
            let total = 0
            this.carts.forEach(el => {
                total += el.itemId.price * el.quantity
            })
            let angka = total
            let rupiah = '';		
            let angkarev = angka.toString().split('').reverse().join('')
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.'
            return rupiah.split('',rupiah.length-1).reverse().join('')
            // return total
        },
        checkEmptyCart () {
            if(this.carts.length == 0) {
                return "You have empty cart. let's enjoy shopping"
            }
        },
        buttonConfirm () {
            if(this.carts.length == 0) {
                return false
            }else {
                return true
            }
        }
    }
}
</script>

<style scoped>

span {
    cursor: pointer;
}
.delete-cart {
    background-color: rgb(209, 151, 151);
    padding: 4px;
    border-radius: 5px;
}
.container button {
    height: 35px;
}
.img-thumbnail {
    width: 100px;
    height: 100px;
}
h3 {
    color: green
}
</style>
