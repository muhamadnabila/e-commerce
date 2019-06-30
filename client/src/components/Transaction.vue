<template>
<div>
    <NavbarUp></NavbarUp>
  <div class="mt-5">
    <h1 class="title">TRANSACTION</h1>
    <div class="container list-transaction">
      <table class="table">
        <thead class="thead-dark a">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        <TransactionList v-for="(transaction, index) in transactions" :key="index" :transaction="transaction" @fetchTransaction="fetchTransaction"></TransactionList>
        </tbody>
      </table>
    </div>
    <router-view/>
  </div>
</div>
</template>

<script>
import axios from "@/api/server.js";
import TransactionList from '@/components/TransactionList.vue'
import NavbarUp from '@/components/NavbarUp.vue'
export default {
  name: 'transaction',
  components: {
      TransactionList,
      NavbarUp
  } ,
  data() {
    return {
      transactions: [],
    };
  },
  created() {
    this.fetchTransaction();
  },
  methods: {
    fetchTransaction() {
      let token = localStorage.getItem("token");
      axios
        .get(`/transaction`, { headers: { token } })
        .then(({ data }) => {
          this.transactions = data;
          this.$store.commit('transaction', data)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.list-transaction {
  max-height: 1000px;
  overflow: scroll;
  background-color: rgb(243, 238, 215);
}
.title {
  text-align: center;
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
