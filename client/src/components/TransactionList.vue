<template>
  <tr>
    <th scope="row">{{ transaction._id }}</th>
    <td v-if="isAdmin">{{ transaction.payment.firstName }}</td>
    <td v-if="!isAdmin">IDR {{ convertToRupiah(transaction.amount) }}</td>
    <td v-if="isAdmin">{{ transaction.createdAt }}</td>
    <td>{{ transaction.status }}</td>
    <td>
      <router-link v-if="!isAdmin" :to="'/transaction/detail/' + transaction._id">
        <button type="button" class="btn btn-info">Check</button>
      </router-link>
      <router-link v-if="isAdmin" :to="'/dashboard/detail/' + transaction._id">
        <button type="button" class="btn btn-info">Check</button>
      </router-link>
      <button
        v-if="!isArrived && !isAdmin"
        @click="arrivedConfirm"
        type="button"
        class="btn btn-success ml-3"
      >Arrived</button>
      <button
        v-if="isArrived && !isAdmin"
        type="button"
        class="btn btn-secondary ml-3"
        disabled
      >Arrived</button>
      <button
        v-if="!isDelivery && isAdmin "
        @click="deliveredConfirm"
        type="button"
        class="btn btn-success ml-3"
      >Delivery</button>
      <button
        v-if="isDelivery && isAdmin"
        type="button"
        class="btn btn-secondary ml-3"
        disabled
      >Delivery</button>
    </td>
  </tr>
</template>

<script>
import axios from "@/api/server.js";

export default {
  name: 'transactionList',
  props: ["transaction"],
  data() {
    return {
      isArrived: false,
      isAdmin: false,
      isDelivery: false
    };
  },
  created() {
    let role = localStorage.getItem("role");
    if (role == "admin") {
      this.isAdmin = true;
    }
  },
  methods: {
    convertToRupiah (angka) {
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return rupiah.split('',rupiah.length-1).reverse().join('');
    },
    deliveredConfirm() {
      let token = localStorage.getItem('token')
      axios
        .put(`/transaction/${this.transaction._id}`,
          {
            status: "On Delivery"
          },
          {
            headers: {
              token
            }
          }
        )
        .then(({ data }) => {
          this.isDelivery = true
          this.$emit('fetchTransaction')
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrivedConfirm() {
      let token = localStorage.getItem("token");
      axios
        .put(`/transaction/${this.transaction._id}`,
          {
            arrivedConfirmationUser: true,
            status: "Success"
          },
          {
            headers: { token }
          }
        )
        .then(data => {
          this.$emit('fetchTransaction');
          this.isArrived = true
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (this.transaction.arrivedConfirmationUser) {
      this.isArrived = true;
    }
    if(this.transaction.status == 'On Delivery' || this.transaction.status == 'Success') {
        this.isDelivery = true
    }
  }
};
</script>

<style scoped>
</style>
