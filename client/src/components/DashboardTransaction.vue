<template>
    <div>
        <div class="container mt-5">
            <h1>Transaction</h1>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID Transaction</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TransactionList v-for="(transaction, index) in transactions" :key="index" :transaction="transaction" @fetchTransaction="fetchTransaction"></TransactionList>
                </tbody>
            </table>
        </div>
    </div>
    
</template>

<script>
import axios from '@/api/server.js'
import TransactionList from '@/components/TransactionList.vue'
export default {
    name: 'dashboard-transaction',
    components: {
        TransactionList,
    },
    data () {
        return {
            transactions: []
        }
    },
    created () {
        this.fetchTransaction()
    },
    methods: {
        fetchTransaction () {
            let token = localStorage.getItem('token')
            axios.get('/transaction', { headers: { token } })
            .then(({ data }) => {
                this.transactions = data
                this.$store.commit('transaction', data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
thead {
    background-color: aliceblue
}
h1 {
    background-color: rgb(226, 225, 159);
    padding: 7px;
}
.container {
    max-height: 300vh;
    overflow: scroll;
    background-color: rgb(194, 189, 189);
    padding: 7px;
}
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	background-color: #3366FF;
	border-radius: 10px;
	background-image: -webkit-linear-gradient(0deg,
  rgba(255, 255, 255, 0.5) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, 0.5) 50%,
  rgba(255, 255, 255, 0.5) 75%,
  transparent 75%,
  transparent)
}
</style>
