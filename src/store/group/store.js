import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    groups: [],
    loading: false
  },
  mutations: {
    groups(state, payload) {
      state.groups = payload
    },
    loading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    getGroups(context) {
      context.commit('loading', true)
      Axios.get('/group')
        .then(res => context.commit('groups', res.data))
        .finally(() => context.commit('loading', true))
    }
  },
  getters: {
    groups(state) {
      return state.groups
    },
    loading(state) {
      return state.loading
    }
  }
}
