import Vue from 'vue'
import Vuex from 'vuex'
import Error from './../helper/Error'

import auth from './auth/store'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth },
  state: {
    alert: {},
    drawer: true,
    error: new Error(),
    showAlert: false,
    user: {}
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
    },
    user(state, payload) {
      state.user = payload
    }
  },
  actions: {
    getUser(state) {
      state.commit('auth/logging', true)
      axios
        .get('/auth')
        .then(res => {
          state.commit('user', res.data)
        })
        .finally(() => state.commit('auth/logging', false))
    }
  },
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
    },
    user(state) {
      return state.user
    }
  }
})
