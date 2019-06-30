<template>
    <div>
        <div :style="{ width : widthSideBar }" id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" @click.prevent="closeNav()">&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
        <div class="sidebar">
          <img class="logo-side-bar" src="https://s3.r29static.com//bin/entry/125/0,638,2000,1125/1200xbm,80/2117584/image.jpg" alt="" srcset="">
          <br>
          <span v-if="isBack" class="bar-icon" style="font-size:30px; cursor:pointer" @click="backTo"><i class="fas fa-chevron-left"></i></span>
          <span v-if="!isBack" class="bar-icon" style="font-size:30px; cursor:pointer" @click="openNav">&#9776;</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      widthSideBar: '0',
      isBack: false
    }
  },
  methods: {
    openNav () {
      this.widthSideBar = '250px'
    },
    closeNav () {
      this.widthSideBar = '0'
    },
    backTo () {
      this.$router.push('/listItem/male')
    }
  },
  mounted () {
    if(this.$route.params.id) {
      this.isBack = true
    }
  }
}
</script>

<style scoped>
.logo-side-bar {
  width: 100px;
  height: 50px;
  margin-bottom: 20px;
}
.bar-icon {
  color: white;
  margin-left: 30px
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
