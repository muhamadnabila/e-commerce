<template>
    <div>
      <NavbarUp></NavbarUp>
      <div class="category">
        <span @click="$router.push('/listItem/male')" v-bind:style="styleCategoryMale"> Male </span> 
        <span @click="$router.push('/listItem/female')" v-bind:style="styleCategoryFemale"> Female </span>
      </div>
        <div class="container mt-5">
          <div>
        <carousel v-bind:per-page-custom=[[480,3],[780,4]]>
          <slide class="banner" v-for="(itemBanner,index) in itemBanners" :key="index">
              <img :src="itemBanner.image" alt="" srcset="">
          </slide>
        </carousel>
      </div>
      <div class="title">Collection</div>
      <hr>
          <div class="container-fluid mt-5">
              <div class="row ">
                  <div v-for="(item,index) in items" :key="index" class="col-md-4 sm-12">
                      <router-link class="item" :to="{ name: 'detailItem', params: { id: item._id }}">
                          <div class="card mb-2">
                              <img :src="item.image" class="card-img-top" alt="...">
                              <div class="card-body">
                              <h5 class="card-title">{{ item.name }}</h5>
                              <p class="card-text description">{{ item.description }}</p>
                              <p class="card-text price">IDR {{ convertToRupiah(item.price) }}</p>
                              </div>
                          </div>
                      </router-link>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from '@/api/server.js'
import NavbarUp from '@/components/NavbarUp.vue'
export default {
  name: 'listItem',
  components: {
    Navbar,
    NavbarUp,
    'carousel': VueCarousel.Carousel,
    'slide': VueCarousel.Slide
  },
  data () {
    return {
      itemBanners: [],
      items: [],
      styleCategoryMale: {
        color: 'black'
      },
      styleCategoryFemale: {
        color: 'black'
      }
    }
  },
  created () {
    this.fetchItem()
    let token
    if(this.$route.params.category == 'female'){
      this.styleCategoryMale.color = '#9D9494'
      this.styleCategoryFemale.color = 'black'
    } else {
      this.styleCategoryMale.color = 'black'
      this.styleCategoryFemale.color = '#9D9494'
    }
  },
  methods: {
    fetchItem () {
      let token = localStorage.getItem('token')
      axios.get('/items', {
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.itemBanners = []
          this.items = []
          data.forEach(el => {
            if (this.$route.params.category === 'male') {
              if (el.category === 'male') {
                if (el.banner === true) this.itemBanners.push(el)
                else this.items.push(el)
              }
            }else {
              if (el.category === 'female') {
                if (el.banner === true) this.itemBanners.push(el)
                else this.items.push(el)
              }
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
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
      if(this.$route.params.category == 'female'){
        this.styleCategoryMale.color = '#9D9494'
        this.styleCategoryFemale.color = 'black'
        this.fetchItem()
      } else {
        this.styleCategoryMale.color = 'black'
        this.styleCategoryFemale.color = '#9D9494'
        this.fetchItem()
      }
    }
  },
  computed : {
    // convertToRupiah : {
    //   set : function (angka) {
    //     var rupiah = '';		
    //     var angkarev = angka.toString().split('').reverse().join('');
    //     for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    //     return rupiah.split('',rupiah.length-1).reverse().join('');
    //   }
    // }
  }
}
</script>

<style scoped>
.item {
  text-decoration: none
}
span {
  cursor: pointer;
}
.category {
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
.VueCarousel-slide {
  height:100px;
  color:#FFF;
  background:#59ecff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right:1px solid #FFF;
  box-sizing:border-box;
  font-size:12px;
  text-align:center;
}
#side-bar {
  text-align: center;
  margin-top: 10px;
  margin-left: 0;
  text-align: center;
  height: 100vh;
}
.jumbotron img {
    width: 1500px;
    height: 550px;
    max-width: wo;
    overflow: hidden;
    /* flex-shrink: 0;
    min-width: 100%;
    min-height: 100% */
}
.jumbotron {
    /* padding: 10px;
    background-size: cover; */
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.card {
  border: none;
}
.description {
    color:gray
}
.card-title {
    text-align: center;
}
.price {
    color: green
}
.banner {
  height: 300px;
}
.banner img {
  width: 100%;
  height: 100%;
}
h5 {
  color: black
}
</style>
