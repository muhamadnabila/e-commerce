<template>
    <div>
        <div class="container-fluid mt-2 p-4">
            <h1>PRODUCT</h1>
            <hr>
            <div class="d-flex">
                <button @click="addItem" type="button" class="btn btn-primary add-item"> + Add Item</button>
            </div>
            <div class="row mt-5">
                <div class="col-3">
                    <h3>Banner</h3>
                    <ul class="list-group list-group-flush">
                        <li v-for="(banner, index) in banners" :key="index" class="list-group-item">
                            <img class="banner" :src="banner.image" alt="" srcset="">
                            <br>
                            <br>
                            <button type="button" class="btn btn-warning">Change</button>
                        </li>
                    </ul>
                </div>
                <div class="col-7 offset-1 bg-light">
                    <h3 class="collection">Collection</h3>
                    <div v-for="(collection, index) in collections" :key="index" class="card mb-3 mt-3" style="width:100%">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                            <img :src="collection.image" class="card-img " alt="...">
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <div class="">

                                </div>
                                <h5 class="card-title">{{collection.name}}</h5>
                                <p class="card-text">{{collection.description}}</p>
                                <p class="card-text">IDR {{collection.price}}</p>
                                <p class="card-text"><small class="text-muted">Stock : {{ collection.stock }}</small></p>
                                <div>
                                    <i @click="updateItem(collection._id)" class="fas fa-edit mr-3">Edit</i>
                                    <i @click="deleteItem(collection._id)" class="fas fa-trash">Delete</i>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/server.js'
import DashboardDetailItem from '@/components/DashboardDetailItem.vue'
export default {
    name: 'dashboard-product',
    components: {
        DashboardDetailItem
    },
    data () {
        return {
            items: [],
            banners: [],
            collections: []
        }
    },
    created() {
        this.fetchItem()
       
    },
    methods: {
        fetchItem () {
            let token = localStorage.getItem('token')
            axios.get('/items', { headers : { token } })
            .then(({ data }) => {
                this.items = data
                this.filterBanner()
            })
            .catch(err => {
                console.log(err)
            })
        },
        filterBanner () {
            this.banners = this.items.filter(el => {
                return el.banner == true
            })
            this.collections = this.items.filter(el => {
                return el.banner == false
            })
        },
        deleteItem(itemId) {
            let token = localStorage.getItem('token')
            axios.delete(`/items/${itemId}`, { headers: { token } })
              .then(() => {
                  this.fetchItem()
              })
              .catch(err => {
                  console.log(err)
              })
        },
        updateItem(itemId) {
            this.$router.push(`/dashboard/updateItem/${itemId}`)
        },
        addItem() {
            this.$router.push('/dashboard/addItem')
        }
    }
}
</script>

<style scoped>
.col-7 {
    max-height: 280vh;
    overflow: scroll;
}
.fas {
    cursor: pointer;
}
.fa-edit:hover {
    color:rgb(87, 184, 74)
}
.fa-trash:hover {
    color:#FF0000
}
.collection{
    background-color: aquamarine;
    display: block;
    padding: 7px;
}
.banner {
    width: 200px;
}
.container-fluid {
  font-family: "Comic Sans MS", cursive, sans-serif;
}
.col-3 {
  max-height: 280vh;
  overflow: scroll;
  background-color: #FBFECE;
  text-align: center;
  padding: 10px;
}
::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}
h1 {
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
.add-item {
    height: 50px;
    font-size: 25px
}
</style>
