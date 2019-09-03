import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    actions: [],
    modules: []
  },
  mutations: {
    actions(state, payload) {
      state.actions = payload
    },
    modules(state, payload) {
      state.modules = payload
    }
  },
  actions: {
    async getActions(context) {
      const res = await Axios.get('/tools/actions')
      context.commit('actions', res.data)
      return res
    },
    async getModules(context) {
      const res = await Axios.get('/tools/modules')
      context.commit('modules', res.data)
      return res
    }
  },
  getters: {
    actions(state) {
      return state.actions
    },
    modules(state) {
      return state.modules
    }
  }
}
