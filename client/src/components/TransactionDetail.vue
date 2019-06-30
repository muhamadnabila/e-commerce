<template>
    <div>
        <h2>
            TRANSACTION DETAIL
        </h2>
        <div class="container detail">
            <ul class="list-group list-group-flush">
                <li v-for="(cart, index) in carts" :key="index" class="list-group-item">
                    <div class="row">
                        <div class="col-6 ">
                            <img class="image" :src="cart.itemId.image" alt="" srcset="">
                        </div>
                        <div class="col-6 bg-light p-3">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Name: {{ cart.itemId.name }}</li>
                                <li class="list-group-item">Description: {{ cart.itemId.description }}</li>
                                <li class="list-group-item">Quantity: {{ cart.quantity }}</li>
                                <li class="list-group-item">Size: {{ cart.size }}</li>
                                <li class="list-group-item"> Price: {{ convertToRupiah(cart.itemId.price) }} /item</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detail-transaction',
    data () {
        return {
            carts: []
        }
    },
    created () {
        this.getCart()
    },
    methods: {
        getCart() {
            this.$store.state.transactions.forEach(el => {
                if(el._id == this.$route.params.transactionId) {
                    this.carts = el.carts
                }
            })
            window.scrollTo(0, 1300);
        },
        convertToRupiah (angka) {
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return rupiah.split('',rupiah.length-1).reverse().join('');
    }
    },
    watch: {
        $route () {
            this.getCart()
        }
    },
    mounted () {
        window.scrollTo(0, 1300);
    }
}
</script>

<style scoped>
.container {
    border: 1px solid;
    margin-top: 100px;
    margin-bottom: 100px;
    border-radius: 10px;
    margin-bottom: 350px
}
.image {
    width: 50%;
    height: 100%;
    display: block;
    margin: auto
}
h2 {
    text-align: center;
    font-weight: bold;
    margin-top: 100px
}
</style>
