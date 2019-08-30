import Vue from 'vue'
import Vuex from 'vuex'
import Error from './../helper/Error'

import auth from './auth/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth },
  state: {
    alert: {},
    drawer: true,
    error: new Error(),
    showAlert: false
  },
  mutations: {
    alert(state, payload) {
      state.alert = payload
      state.showAlert = true
    },
    drawer(state, payload) {
      state.drawer = payload
    },
    showAlert(state, payload) {
      state.showAlert = payload
    }
  },
  actions: {},
  getters: {
    alert(state) {
      return state.alert
    },
    drawer(state) {
      return state.drawer
    },
    error(state) {
      return state.error
    },
    showAlert(state) {
      return state.showAlert
    }
  }
})
