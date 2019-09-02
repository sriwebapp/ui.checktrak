import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    branches: []
  },
  mutations: {
    branches(state, payload) {
      state.branches = payload
    }
  },
  actions: {
    getBranches(context) {
      Axios.get('/branch').then(res => context.commit('branches', res.data))
    }
  },
  getters: {
    branches(state) {
      return state.branches
    }
  }
}
