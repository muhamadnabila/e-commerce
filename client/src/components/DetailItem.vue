<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-1 bg-dark p-0">
                <div id="side-bar">
                    <Navbar></Navbar>
                </div>
            </div>
            <div class="col-11">
                <div class="row" style="height:100vh">
                    <div class="col-md-6 image mt-5">
                        <img :src="item.image" alt="" srcset="">
                    </div>
                    <div class="col-md-6 description p-4">
                        <div class="row">
                            <div class="col-md-12">
                                <h2>{{ item.name }}</h2>
                                <hr>
                                <h3>IDR {{ convertToRupiah }}</h3>
                                <h5 class="item-description">{{ item.description }}</h5>
                                <hr>
                                <div class="row">
                                    <div class="col-lg-6 sm-7">
                                        <h5 choose>CHOOSE YOUR SIZE</h5>
                                        <div class="row d-flex justify-content-between">
                                            <div class="col-4 pr-0 size">
                                              <span @click.prevent="selectSizeS" :style="{ color : sizeSColor }">S</span>
                                                <!-- <a @click.prevent="selectSizeS" :style="{ color : sizeSColor }"  href="#">S</a> -->
                                            </div>
                                            <div class="col-4 pl-0 size">
                                              <span @click.prevent="selectSizeM" :style="{ color : sizeMColor }">M</span>
                                                <!-- <a @click.prevent="selectSizeM" :style="{ color : sizeMColor }" href="#">M</a> -->
                                            </div>
                                            <div class="col-4 pl-0 size">
                                              <span @click.prevent="selectSizeL" :style="{ color : sizeLColor }">L</span>
                                                <!-- <a @click.prevent="selectSizeL" :style="{ color : sizeLColor }" href="#">L</a> -->
                                            </div>
                                        </div>
                                        <hr>
                                    </div>
                                    <div class="col-lg-6 sm-5">
                                        <h5>QUANTITY</h5>
                                        <div class="row d-flex justify-content-between">
                                            <div class="col-4 pl-0 quantity">
                                                <span @click.prevent="minusQuantity">
                                                  <i class="fas fa-minus-circle fa-quantity"></i>
                                                </span>
                                            </div>
                                            <div class="col-4 pl-0 quantity">
                                                <h5>{{ newCart.quantity }}</h5>
                                            </div>
                                            <div class="col-4 pl-0 quantity">
                                              <span @click.prevent="addQuantity">
                                                <i class="fas fa-plus-circle fa-quantity"></i>
                                              </span>
                                            </div>
                                        </div>
                                        <hr>
                                        <div>
                                          <p class="stock">Stock Available : {{ item.stock }}</p>
                                        </div>
                                    </div>
                                </div>
                                <button @click="addToCart" type="button" class="btn btn-warning"> <i class="fas fa-cart-arrow-down"> Add to cart</i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from '@/api/server.js'
export default {
  name: 'detailItem',
  components: {
    Navbar
  },
  data () {
    return {
      item: {},
      sizeSColor: 'white',
      sizeMColor: 'black',
      sizeLColor: 'black',
      newCart: {
          itemId: '',
          size: 'S',
          quantity: 1
      },
    }
  },
  created () {
    this.fetchItem()
  },
  methods: {
    fetchItem () {
      let token = localStorage.getItem('token')
      let id = this.$route.params.id
      axios.get(`/items/${id}`, {
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.item = data
          this.newCart.itemId = data._id
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    addToCart () {
      let token = localStorage.getItem('token')
      axios.post('/cart', this.newCart , { headers: { token } })
      .then(({ data }) => {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Add to chart success',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    selectSizeS () {
      this.sizeSColor = 'white'
      this.sizeMColor = 'black'
      this.sizeLColor = 'black'
      this.newCart.size = 'S'
    },
    selectSizeM () {
      this.sizeSColor = 'black'
      this.sizeMColor = 'white'
      this.sizeLColor = 'black'
      this.newCart.size = 'M'
    },
    selectSizeL () {
      this.sizeSColor = 'black'
      this.sizeMColor = 'black'
      this.sizeLColor = 'white'
      this.newCart.size = 'L'
    },
    addQuantity () {
      if(this.newCart.quantity < this.item.stock ) this.newCart.quantity ++
    },
    minusQuantity () {
      if(this.newCart.quantity > 1) this.newCart.quantity --
    }
  },
  computed : {
    convertToRupiah() {
      let angka = this.item.price
      var rupiah = '';		
      var angkarev = angka.toString().split('').reverse().join('');
      for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
      return rupiah.split('',rupiah.length-1).reverse().join('');
    }
  }
}
</script>

<style scoped>
span {
  cursor: pointer;
}
.stock {
  color: black;
  background-color: darkgray;
  padding: 10px;
}
.item-description {
    font-size: 15px;
    color: grey
}
.fa-quantity {
    color: black
}
.quantity {
    height: 25px
}
.description {
    color: rgb(0, 0, 0);
    background-color: #D8D5D5;
    font-family: "HelveticaLT";
}
.image img {
    width: 500px;
    height: 500px;
    max-width: wo;
    overflow: hidden;
    /* flex-shrink: 0;
    min-width: 100%;
    min-height: 100% */
}
.image {
    /* padding: 10px;
    background-size: cover; */
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
#side-bar {
  padding: 7px;
  display: flex;
  justify-content: center;
}

</style>
