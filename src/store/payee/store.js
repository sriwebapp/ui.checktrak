import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    loading: false,
    payees: []
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    payees(state, payload) {
      state.payees = payload
    }
  },
  actions: {
    async getPayees(context) {
      context.commit('loading', true)
      try {
        const url = '/' + context.rootGetters['tools/company'].code + '/payee'
        const res = await Axios.get(url)
        context.commit('payees', res.data)
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, payee) {
      context.commit('loading', true)
      try {
        const url = '/' + context.rootGetters['tools/company'].code + '/payee'
        await Axios.post(url, payee)
        router.push({ name: 'payees' })
      } finally {
        context.commit('loading', false)
      }
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    payees(state) {
      return state.payees
    }
  }
}
