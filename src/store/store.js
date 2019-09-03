import Vue from 'vue'
import Vuex from 'vuex'
import Error from './../helper/Error'

import auth from './auth/store'
import user from './user/store'
import group from './group/store'
import branch from './branch/store'
import tools from './tools/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, user, group, branch, tools },
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
  actions: {
    async loadData(context) {
      context.commit('auth/logging', true)
      await context.dispatch('auth/getUser')
      await context.dispatch('group/getGroups')
      await context.dispatch('branch/getBranches')
      context.commit('auth/logging', false)
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
    }
  }
})
