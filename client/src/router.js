import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import ListItem from './views/ListItem.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './components/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "register" */ './components/Login.vue')
    },
    {
      path: '/listItem/:category',
      name: 'listItem',
      // component: ListItem
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "listItem" */ './views/ListItem.vue')
    },
    {
      path: '/detailItem/:id',
      name: 'detailItem',
      // component: ListItem
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "detailItem" */ './components/DetailItem.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      // component: ListItem
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "cart" */ './components/Cart.vue')
    },
    {
      path: '/payment/:transactionId',
      name: 'payment',
      // component: ListItem
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "payment" */ './components/Payment.vue')
    },
    {
      path: '/transaction',
      name: 'transaction',
      // component: ListItem
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "transaction" */ './components/Transaction.vue'),
      children : [
        { 
          path: 'detail/:transactionId',
          name : 'detail-transaction',
          component: () => import (/* webpackChunkName: "detail-transaction" */ './components/TransactionDetail.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // component: ListItem
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      children: [
        {
          path: 'transaction',
          name: 'dashboard-transaction',
          component: () => import(/* webpackChunkName: "dashboard-transaction" */ './components/DashboardTransaction.vue'),
        },
        {
          path: 'product',
          name: 'dashboard-product',
          component: () => import(/* webpackChunkName: "dashboard-product" */ './components/DashboardProduct.vue'),
        },
        {
          path: 'addItem',
          name: 'dashboard-addItem',
          component: () => import(/* webpackChunkName: "dashboard-addItem" */ './components/DashboardAddItem.vue'),
        },
        {
          path: 'revenue',
          name: 'dashboard-revenue',
          component: () => import(/* webpackChunkName: "dashboard-revenue" */ './components/DashboardRevenue.vue'),
        },
        {
          path: 'updateItem/:id',
          name: 'dashboard-updateItem',
          component: () => import(/* webpackChunkName: "dashboard-updateItem" */ './components/DashboardUpdateItem.vue'),
        },
        {
          path: 'detail/:id',
          name: 'dashboard-detail',
          component: () => import(/* webpackChunkName: "dashboard-detail" */ './components/DashboardDetailTransaction.vue'),
        }
      ]
    }
  ]
})
