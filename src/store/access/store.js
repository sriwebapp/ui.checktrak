import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    access: {},
    accesses: [],
    loading: false,
    waiting: false
  },
  mutations: {
    access(state, payload) {
      state.access = payload
    },
    accesses(state, payload) {
      state.accesses = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    waiting(state, payload) {
      state.waiting = payload
    }
  },
  actions: {
    async getAccess(context, id) {
      context.commit('loading', true)
      context.commit('access', {})
      try {
        const res = await Axios.get('/access/' + id)
        context.commit('access', res.data)
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getAccesses(context) {
      context.commit('loading', true)
      try {
        const res = await Axios.get('/access')
        context.commit('accesses', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async edit(context, access) {
      context.commit('loading', true)
      try {
        await Axios.patch('/access/' + access.access_id, access)
        router.push({ name: 'access' })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    }
  },
  getters: {
    access(state) {
      return state.access
    },
    accesses(state) {
      return state.accesses
    },
    loading(state) {
      return state.loading
    },
    waiting(state) {
      return state.waiting
    }
  }
}
