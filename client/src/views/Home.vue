<template>
  <div v-bind:style="{ 'background-image': 'url(' + backgroundImage + ')' } " class="home">
    <div class="container-fluid">
      <div class="row">
        <div id="side-bar" class="col-2">
          <Navbar></Navbar>
        </div>
        <div class="col">
            <div class="row">
              <div class="col-6">
                  <h4 @mouseover="maleBackground">
                    <a @click.prevent="showListMale" href="#">
                      SHOP MALE
                      <p>VIEW NOW</p>
                    </a>
                  </h4>
              </div>
              <div class="col-6">
                  <h4 @mouseover="femaleBackground">
                    <a @click.prevent="showListFemale" href="#">
                          SHOP FEMALE
                        <p>VIEW NOW</p>
                    </a>
                  </h4>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'home',
  components: {
    Navbar
  },
  data () {
    return {
      backgroundImage: 'https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      widthSideBar: '0'
    }
  },
  methods: {
    openNav () {
      this.widthSideBar = '250px'
    },
    closeNav () {
      this.widthSideBar = '0'
    },
    femaleBackground () {
      this.backgroundImage = "'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'"
    },
    maleBackground () {
      this.backgroundImage = "'https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'"
    },
    showListMale () {
      this.$router.push('/listItem/male')
    },
    showListFemale () {
      this.$router.push('/listItem/female')
    }
  },
}
</script>

<style scoped>
.home {
  font-family: "Lato", sans-serif;
  background-repeat: no-repeat;
  height: 100vh;
  background-size: cover;
}
h4 {
  text-align: center;
  margin-top:50px;
  width: 40%
}
p {
  text-align: center;
  /* width: 40%; */
  color: white;
  font-size: 13px;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  color: white;
  text-decoration: none;
}
#side-bar {
  text-align: center;
  margin-top: 10px;
  margin-left: -20px;
  text-align: center;
}

</style>
