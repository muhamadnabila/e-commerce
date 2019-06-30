<template>
    <div class="list-group">
        <span class="list-group-item list-group-item-action title"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ToURLvFmy2YXtXWrI1cnhrnYDkg7-b5gxsIgZgNfX2qkxwK7" alt="" srcset=""> HNDSUPPLYCO. </span>
        <hr>
        <span @click="showProduct" class="list-group-item list-group-item-action list" active><i class="fas fa-store"> PRODUCT</i></span>
        <span @click="showTransaction" class="list-group-item list-group-item-action list"><i class="fas fa-list"> TRANSACTION</i></span>
        <span @click="showRevenue" class="list-group-item list-group-item-action list"><i class="fas fa-file-invoice-dollar"> REVENUE </i></span>
        <span @click="logout" class="list-group-item list-group-item-action list"><i class="fas fa-sign-out-alt"> LOGOUT</i></span>
    </div>
</template>

<script>
export default {
    name: 'dashboard-navbar',
    methods : {
        showTransaction () {
            this.$router.push('/dashboard/transaction')
        },
        showProduct () {
            this.$router.push('/dashboard/product')
        },
        showRevenue () {
            this.$router.push('/dashboard/revenue')
        },
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.list-group-item {
    background-color: transparent;
    color : rgb(158, 155, 155);
    border: none;
    font-weight: bold;
    display:list-item;
}
.title {
    color: aliceblue
}
.list-group-item-action {
    background-color: transparent;
}
.list-group-item-action:hover {
    background-color: transparent;
}
.list {
    font-size: 15px;
    cursor: pointer
}
.list:hover {
    /* font-size: 15px; */
    /* cursor: pointer */
    color: rgb(210, 217, 223);
}
img{
    width: 60px;
    padding:5px; 
}
</style>
