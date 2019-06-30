<template>
    <li class="list-group-item">
        <div class="card" style="width: 100%;">
  <div class="card-body">
      <img :src="image" alt="" srcset="">
    <!-- <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> -->
    <a href="#" class="btn btn-primary">Change</a>
  </div>
</div>
    </li>
</template>

<script>
export default {
    name: 'dashboard-detailItem',
    props: ['item'],
    data () {
        return {
            image: ''
        }
    },
    created () {
        if(this.item.banner) {
            image = this.item.image
        }
    }

}
</script>

<style>

</style>
