<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/login">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
    let token = localStorage.getItem('token')
    let role = localStorage.getItem('role')
    if (!token) {
      this.$router.push('/login')
    } else {
      if(role == 'admin') {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>

</style>
