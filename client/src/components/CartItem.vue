<template>
    <tbody>
        <tr>
            <th scope="row">
                <img :src="cart.itemId.image" class="img-thumbnail" alt="" srcset="">
            </th>
            <td>{{ cart.itemId.name }}</td>
            <td>{{ cart.itemId.description }}</td>
            <td>{{ cart.size }}</td>
            <td><i @click="minusQuantity" class="fas fa-minus-circle fa-quantity"></i> {{ cart.quantity }} <i @click="addQuantity" class="fas fa-plus-circle fa-quantity"></i></td>
            <td>IDR {{ cart.itemId.price }}</td>
            <td>IDR {{ totalPrice }}</td>
            <td> <span @click ="deleteCart(cart._id)" class="delete-cart">x</span></td>
        </tr>
    </tbody>
</template>

<script>
import axios from '@/api/server.js'
export default {
    name: 'cartItem',
    props: ['cartTable'],
    data () {
        return {
            cart: {},
            amount: ''
        }
    },
    created () {
        this.cart = this.cartTable
    },
    methods: {
        deleteCart(cartId) {
            let token = localStorage.getItem('token')
            axios.delete(`/cart/${cartId}`, { headers: { token } })
            .then(({ data }) => {
                this.$emit('fetchCart')
            })
            .catch(err => {
                console.log(err)
            })
        },
        minusQuantity () {
            if(this.cart.itemId.stock > 1){
                let token = localStorage.getItem('token')
                axios.put(`/cart/${this.cart._id}`, { quantity: this.cart.quantity} ,{ headers: { token } })
                .then(({ data }) => {
                    this.cart.quantity --
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        addQuantity () {
            if(this.cart.itemId.stock > 1){
                let token = localStorage.getItem('token')
                axios.put(`/cart/${this.cart._id}`, { quantity: this.cart.quantity + 1} ,{ headers: { token } })
                .then(({ data }) => {
                    this.cart.quantity ++
                })
                .catch(err => {
                    this.$emit('errorStock',err.response.data.message)
                })
            }
        }
    },
    computed: {
        totalPrice: function() {
            let angka = this.cart.itemId.price * this.cart.quantity
            let rupiah = '';		
            let angkarev = angka.toString().split('').reverse().join('')
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.'
            return rupiah.split('',rupiah.length-1).reverse().join('')
        },
    },
    mounted () {
        this.cart = this.cartTable
    }
}
</script>

<style scoped>
.delete-cart {
    background-color: rgb(209, 151, 151);
    padding: 4px;
    border-radius: 5px;
    cursor: pointer;
}
.delete-cart:hover {
    background-color: brown;
}
.fas {
    margin-left: 4px;
    cursor: pointer;
}
.img-thumbnail {
    width: 100px;
    height: 100px;
}
</style>
