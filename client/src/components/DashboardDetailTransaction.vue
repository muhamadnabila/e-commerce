<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <h1>Detail Information</h1>
                    <hr>
                    <div class="card" style="width: 100%;">
                        <div class="card-body">
                            <h5 class="card-title">ID: {{ transaction._id }}</h5>
                            <p class="card-text">Amount: {{ transaction.amount }} </p>
                            <p class="card-text">Status: {{ transaction.status }} </p>
                            <p class="card-text">Checkout: {{ transaction.createdAt }} </p>
                        </div>
                    </div>
                    <div class="card mt-5" style="width: 100%;">
                        <div class="card-body">
                            <h5 class="card-title">Payment Bill</h5>
                            <p class="card-text">First Name: {{ transaction.payment.firstName }} </p>
                            <p class="card-text">Last Name: {{ transaction.payment.lastName }} </p>
                            <p class="card-text">Address: {{ transaction.payment.address }} </p>
                            <p class="card-text">City: {{ transaction.payment.city }} </p>
                            <p class="card-text">Phone: {{ transaction.payment.phone }} </p>
                            <p class="card-text">Postal Code: {{ transaction.payment.postalCode }} </p>
                            <p class="card-text">Receipt Image:  </p>                        
                            <img :src="transaction.payment.receiptImage" alt="" srcset="">
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <h1>List Product</h1>
                    <hr>
                    <div v-for="(cart, index) in transaction.carts" :key="index" class="card mb-3" style="width: 100%;">
                        <div class="card-body">
                            <h5 class="card-title">Name: {{ cart.itemId.name }}</h5>
                            <p class="card-text">Description: {{ cart.itemId.description }} </p>
                            <p class="card-text">Category: {{ cart.itemId.category }} </p>
                            <p class="card-text">Price: {{ cart.itemId.price }} </p>
                            <p class="card-text">Size: {{ cart.size }} </p>
                            <p class="card-text">Quantity: {{ cart.quantity }} </p>
                            <p class="card-text">Image: </p>
                            <img :src="cart.itemId.image" alt="" srcset="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DashboardNavbar from '@/components/DashboardNavbar.vue'
import axios from '@/api/server.js'
export default {
    name: 'dashboard-detail',
    components: {
        DashboardNavbar
    },
    data () {
        return {
            transaction: ''
        }
    },
    created () {
      let token = localStorage.getItem('token')
      axios.get(`/transaction/${this.$route.params.id}`, { headers: { token } })
        .then(({ data }) => {
            this.transaction = data
        })
        .catch(err => {
            console.log(err)
        })
    }
}
</script>

<style scoped>
h1 {
  /* text-align: center; */
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 50px;
  letter-spacing: 2px;
  word-spacing: 2px;
  color: #000000;
  font-weight: normal;
  text-decoration: none solid rgb(68, 68, 68);
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  text-align: center
}
.container {
    margin-top: 100px;
}
img {
    width: 300px;
}
.card {
  -webkit-box-shadow: 0px 3px 5px -2px rgba(89,86,89,1);
  -moz-box-shadow: 0px 3px 5px -2px rgba(89,86,89,1);
  box-shadow: 0px 3px 5px -2px rgba(89,86,89,1);
}
</style>
