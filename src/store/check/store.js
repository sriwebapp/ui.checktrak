import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    checks: [],
    loading: false
  },
  mutations: {
    checks(state, payload) {
      state.checks = payload
    },
    loading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    async getChecks(context) {
      context.commit('loading', true)
      try {
        const url = '/' + context.rootGetters['tools/company'].code + '/check'
        const res = await Axios.get(url)
        context.commit('checks', res.data)
      } finally {
        context.commit('loading', false)
      }
    }
  },
  getters: {
    checks(state) {
      return state.checks
    },
    loading(state) {
      return state.loading
    }
  }
}
