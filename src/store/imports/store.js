import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    item: {},
    items: []
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
    },
    item(state, payload) {
      state.item = payload
    },
    items(state, payload) {
      state.items = payload
    }
  },
  actions: {
    async getItems(context) {
      context.commit('loading', true)
      try {
        const url = '/' + context.rootGetters['tools/company'].code + '/import'
        const res = await Axios.get(url)
        context.commit('items', res.data)
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getItem(context, id) {
      context.commit('loading', true)
      context.commit('item', {})
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/import/' + id
        const res = await Axios.get(url)
        context.commit('item', res.data)
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
    item(state) {
      return state.item
    },
    items(state) {
      return state.items
    }
  }
}
