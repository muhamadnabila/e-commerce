<template>
  <div>
    <div class="container">
      <h2>PAYMENT INFORMATION</h2>
      <hr>
      <form @submit.prevent="confirmPayment">
        <div class="form-group">
          <label for="exampleInputEmail1">First Name</label>
          <input
            v-model="payment.firstName"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="First name"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Last Name</label>
          <input
            v-model="payment.lastName"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Last name"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Address</label>
          <input
            v-model="payment.address"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Address"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">City</label>
          <input
            v-model="payment.city"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="City"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Postal Code</label>
          <input
            v-model="payment.postalCode"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Postal code"
          >
        </div>
        <div class="form-group mb-5">
          <label for="exampleInputEmail1">Phone</label>
          <input
            v-model="payment.phone"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Phone"
          >
        </div>
        <div class="form-group">
          <h3>
            <span>
              Your Bill : {{ $store.getters.totalPrice }} 
            </span>
          </h3>
          <br>
          <label for="exampleInputEmail1">Receipt of payment</label>
          <br>
          <input type="file" ref="file2" @change="onFileChange">
          <div id="preview">
            <img v-if="receiptImage" :src="receiptImage">
          </div>
        </div>
        <div v-if="isLoading" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Confirm</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/api/server.js'
export default {
  name: 'payment',
  data() {
    return {
      payment: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          postalCode: '',
          phone: '',
      },
      multerReceiptImage: '',
      receiptImage: '',
      isLoading : false
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.receiptImage = URL.createObjectURL(file);
      this.multerReceiptImage = this.$refs.file2.files[0]
    },
    confirmPayment() {
      this.isLoading = true
      let token = localStorage.getItem('token')
      let formData = new FormData()
                  formData.append('firstName',this.payment.firstName)
                  formData.append('lastName',this.payment.lastName)
                  formData.append('address',this.payment.address)
                  formData.append('city',this.payment.city)
                  formData.append('postalCode',this.payment.postalCode)
                  formData.append('phone',this.payment.phone)
                  formData.append('image',this.multerReceiptImage)
                  formData.append('amount',this.$store.getters.totalPrice)
                  formData.append('status','packaging')
      axios.put(`/transaction/${this.$route.params.transactionId}`, formData , 
      {
        headers : {
          token
        }
      })
        .then(({ data }) => {
          this.isLoading = false
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Payment succesfully. Check transaction for more',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/listItem/male')
          this.payment = {}
        })
        .catch(err => {
          this.isLoading = false
        })
    }
  }
};
</script>

<style scoped>
.container {
  -webkit-box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.75);
  width: 80vw;
  margin-top: 50px;
  padding: 20px;
}
img {
  width: 400px;
  height: 400px;
}
#preview {
  width: 400px;
  height: 400px;
  border: 2px solid;
}
h2 {
  text-align: center;
  font-weight: bold;
}
h3 span {
  background-color: rgb(189, 185, 185);
  width: 100%;
  padding: 8px
}
</style>
