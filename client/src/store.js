import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      items : [],
      carts : [],
      transactions: [],
      province: []
  },
  mutations: {
    checkout(state, payload) {
      state.carts = payload
    },
    transaction(state, payload) {
      state.transactions = payload
    }
  },
  actions: {
    
  },
  getters: {
    totalPrice: state => {
      let totalPrice = 0
      state.carts.forEach(el =>{
          totalPrice += el.itemId.price * el.quantity
      })
      return totalPrice
    }
  }
})
