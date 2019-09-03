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
    async getGroups(context) {
      const res = await Axios.get('/group')
      context.commit('groups', res.data)
      return res
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
