<template>
    <div>
        <div class="container mt-5">
            <h1>Update Item</h1>
            <hr>
            <form @submit.prevent="updateItem">
                <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input v-model="newItem.name" type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Name">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <input v-model="newItem.description" type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Description">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Price</label>
                    <input v-model="newItem.price" style="width:300px" type="text" class="form-control"  aria-describedby="emailHelp" placeholder="IDR 0.00">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Stock</label>
                    <input v-model="newItem.stock" style="width:100px" type="number" class="form-control" name="quantity" min="1">
                </div>
                 <div class="form-group" style="width:150px">
                    <label for="exampleFormControlSelect1">Category</label>
                    <select v-model="newItem.category" class="form-control" id="exampleFormControlSelect1">
                        <option>male</option>
                        <option>female</option>
                    </select>
                </div>
                <div class="form-group form-check">
                    <input v-model="newItem.banner" type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Set as Banner</label>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlFile1">Image</label>
                    <input @change="onFileChange" type="file" ref="file1" class="form-control-file" id="exampleFormControlFile1">
                </div>
                <div id="preview">
                    <img v-if="image" :src="image">
                </div>
                <br>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '@/api/server.js'
export default {
    name: 'dashboard-updateItem',
    data() {
        return {
            newItem: {
                name: '',
                description: '',
                price: null,
                stock: 1,
                category: '',
                banner: false,
                image: ''
            },
            image: ''
        }
    },
    created () {
        this.getItem()
    },
    methods: {
        getItem () {
            let token = localStorage.getItem('token')
            axios.get(`/items/${this.$route.params.id}`, { headers: { token } })
              .then(({ data }) => {
                  this.newItem = data
                  this.image = data.image
                   window.scrollTo(0, 0);
              })
              .catch(err => {
                  console.log(err)
              })
        },
        updateItem () {
            let token = localStorage.getItem('token')
            let formData = new FormData()
                  formData.append('image',this.newItem.image)
                  formData.append('name',this.newItem.name)
                  formData.append('description',this.newItem.description)
                  formData.append('price',this.newItem.price)
                  formData.append('stock',this.newItem.stock)
                  formData.append('category',this.newItem.category)
                  formData.append('banner',this.newItem.banner)

            axios.put(`/items/${this.$route.params.id}`, formData, { headers: { token } })
              .then(({ data }) => {
                  this.newItem = {}
                  this.$router.push('/dashboard/product')
              })
              .catch(err => {
                  console.log(err.response)
              })
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.image = URL.createObjectURL(file);
            this.newItem.image = this.$refs.file1.files[0]
        }
    },
    mounted () {
        window.scrollTo(0, 0);
    }
}
</script>

<style scoped>
.container {
    background-color: rgb(251, 241, 206);
    padding: 20px
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
button {
    width: 100px
}
h1 {
    text-align: center
}
</style>
