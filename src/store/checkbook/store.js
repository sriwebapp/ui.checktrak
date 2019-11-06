import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    checkbook: {},
    checkbooks: [],
    loading: false,
    showDelete: false,
    waiting: false
  },
  mutations: {
    checkbook(state, payload) {
      state.checkbook = payload
    },
    checkbooks(state, payload) {
      state.checkbooks = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    showDelete(state, payload) {
      state.showDelete = payload
    },
    waiting(state, payload) {
      state.waiting = payload
    }
  },
  actions: {
    async getCheckbooks(context) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/check-book'
        const res = await Axios.get(url)

        context.commit('checkbooks', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getCheckbook(context, id) {
      context.commit('checkbook', {})
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/check-book/' + id
        const res = await Axios.get(url)

        context.commit('checkbook', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, checkbook) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/check-book'
        await Axios.post(url, checkbook)
        router.push({ name: 'checkbooks' })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async delete(context, id) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/check-book/' + id
        await Axios.delete(url)
        router.push({ name: 'checkbooks' })
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
        context.commit('showDelete', false)
      }
    }
  },
  getters: {
    checkbook(state) {
      return state.checkbook
    },
    checkbooks(state) {
      return state.checkbooks
    },
    loading(state) {
      return state.loading
    },
    showDelete(state) {
      return state.showDelete
    },
    waiting(state) {
      return state.waiting
    }
  }
}
