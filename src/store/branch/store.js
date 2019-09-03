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
    async getBranches(context) {
      const res = await Axios.get('/branch')
      context.commit('branches', res.data)
      return res
    }
  },
  getters: {
    branches(state) {
      return state.branches
    }
  }
}
