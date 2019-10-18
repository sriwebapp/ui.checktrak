import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    transmittals: {},
    transmittal: { checks: [] },
    waiting: false
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    transmittals(state, payload) {
      state.transmittals = payload
    },
    transmittal(state, payload) {
      state.transmittal = payload
    },
    waiting(state, payload) {
      state.waiting = payload
    }
  },
  actions: {
    async getTransmittals(context, options) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/transmittal'
        const res = await Axios.post(url, options)
        context.commit('transmittals', res.data)
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getTransmittal(context, id) {
      context.commit('loading', true)
      context.commit('transmittal', { checks: [] })
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/transmittal/' + id
        const res = await Axios.get(url)
        context.commit('transmittal', res.data)
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
    transmittal(state) {
      return state.transmittal
    },
    waiting(state) {
      return state.waiting
    }
  }
}
