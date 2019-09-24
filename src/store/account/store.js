import Axios from 'axios'
import router from './../../router.js'

export default {
  namespaced: true,
  state: {
    account: {},
    accounts: [],
    editedAccount: {},
    loading: false,
    showDelete: false
  },
  mutations: {
    account(state, payload) {
      state.account = payload
      state.editedAccount = Object.assign({}, payload)
    },
    accounts(state, payload) {
      state.accounts = payload
    },
    editedAccount(state, payload) {
      state.editedAccount = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    showDelete(state, payload) {
      state.showDelete = payload
    }
  },
  actions: {
    async getAccount(context, id) {
      context.commit('loading', true)
      context.commit('account', {})
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/account/' + id
        const res = await Axios.get(url)
        context.commit('account', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getAccounts(context) {
      context.commit('loading', true)
      try {
        const url = '/' + context.rootGetters['tools/company'].code + '/account'
        const res = await Axios.get(url)
        context.commit('accounts', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, account) {
      context.commit('loading', true)
      try {
        const url = '/' + context.rootGetters['tools/company'].code + '/account'
        await Axios.post(url, account)
        router.push({ name: 'accounts' })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async edit(context, account) {
      context.commit('loading', true)
      try {
        const url =
          '/' +
          context.rootGetters['tools/company'].code +
          '/account/' +
          account.id
        await Axios.patch(url, account)
        router.push({ name: 'show-account' })
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
          '/' + context.rootGetters['tools/company'].code + '/account/' + id
        await Axios.delete(url)
        router.push({ name: 'accounts' })
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
        context.commit('showDelete', false)
      }
    }
  },
  getters: {
    account(state) {
      return state.account
    },
    accounts(state) {
      return state.accounts
    },
    editedAccount(state) {
      return state.editedAccount
    },
    loading(state) {
      return state.loading
    },
    showDelete(state) {
      return state.showDelete
    }
  }
}
