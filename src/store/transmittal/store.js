import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    transmittals: [],
    waiting: false
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    transmittals(state, payload) {
      state.transmittals = payload
    },
    waiting(state, payload) {
      state.waiting = payload
    }
  },
  actions: {
    async getTransmittals(context) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/transmittal'
        const res = await Axios.get(url)
        context.commit('transmittals', res.data)
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    transmittals(state) {
      return state.transmittals
    },
    waiting(state) {
      return state.waiting
    }
  }
}
