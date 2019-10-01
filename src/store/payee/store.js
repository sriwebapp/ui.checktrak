import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    editedPayee: {},
    loading: false,
    waiting: false,
    payee: {},
    payees: [],
    showDelete: false
  },
  mutations: {
    editedPayee(state, payload) {
      state.editedPayee = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    waiting(state, payload) {
      state.waiting = payload
    },
    payee(state, payload) {
      state.payee = payload
      state.editedPayee = Object.assign({}, payload)
    },
    payees(state, payload) {
      state.payees = payload
    },
    showDelete(state, payload) {
      state.showDelete = payload
    }
  },
  actions: {
    async getPayees(context) {
      context.commit('loading', true)
      try {
        const url = '/' + context.rootGetters['tools/company'].code + '/payee'
        const res = await Axios.get(url)
        context.commit('payees', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getPayee(context, id) {
      context.commit('loading', true)
      context.commit('payee', {})
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/payee/' + id
        const res = await Axios.get(url)
        context.commit('payee', res.data)
      } catch (error) {
        return
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
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async edit(context, payee) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/payee/' + payee.id
        await Axios.patch(url, payee)
        router.push({ name: 'payees' })
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async delete(context, id) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/payee/' + id
        await Axios.delete(url)
        router.push({ name: 'payees' })
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
        context.commit('showDelete', false)
      }
    }
  },
  getters: {
    editedPayee(state) {
      return state.editedPayee
    },
    loading(state) {
      return state.loading
    },
    waiting(state) {
      return state.waiting
    },
    payee(state) {
      return state.payee
    },
    payees(state) {
      return state.payees
    },
    showDelete(state) {
      return state.showDelete
    }
  }
}
