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
    getActions(context) {
      Axios.get('/tools/actions').then(res => {
        context.commit('actions', res.data)
      })
    },
    getModules(context) {
      Axios.get('/tools/modules').then(res => {
        context.commit('modules', res.data)
      })
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
