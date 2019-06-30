<template>
    <div>
        <div class="row">
            <div class="col-2">
                <DashboardNavbar></DashboardNavbar>
            </div>
            <div class="col-10 p-0 bg-light">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import DashboardNavbar from '@/components/DashboardNavbar.vue'
export default {
    name: 'dashboard',
    components: {
        DashboardNavbar
    }
}
</script>

<style scoped>
.row {
    /* height: 100vh; */
    width: 100%
}
.col-2 {
    padding: 20px;
    height: 320vh;
    background-color: #212120;
}
.col-10 {
    height: 320vh;
}

::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
    background-color: #3366FF;
    border-radius: 10px;
    background-image: -webkit-linear-gradient(0deg,
  rgba(255, 255, 255, 0.5) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, 0.5) 50%,
  rgba(255, 255, 255, 0.5) 75%,
  transparent 75%,
  transparent)
}

</style>
