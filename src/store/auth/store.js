import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    company: parseInt(localStorage.getItem('company_id')) || null,
    loading: false,
    logging: true,
    user: {},
    token: localStorage.getItem('access_token') || null
  },
  mutations: {
    company(state, id) {
      state.company = id
    },
    loading(state, payload) {
      state.loading = payload
    },
    logging(state, payload) {
      state.logging = payload
    },
    setToken(state, token) {
      state.token = token
    },
    user(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async login(context, credential) {
      context.commit('loading', true)
      try {
        const res = await Axios.post('/login', credential)
        const token = res.data.token.access_token
        context.commit('setToken', token)
        localStorage.setItem('access_token', token)
        localStorage.setItem('company_id', res.data.company)
        router.push({ name: 'home' })
        context.commit(
          'alert',
          { message: 'Successfully logged in.', color: 'blue' },
          { root: true }
        )
      } finally {
        context.commit('loading', false)
      }
    },
    async sendResetPassword(context, credential) {
      context.commit('loading', true)
      try {
        await Axios.post('/password/email', credential)
        router.push({ name: 'login' })
      } finally {
        context.commit('loading', false)
      }
    },
    async resetPassword(context, credential) {
      context.commit('loading', true)
      try {
        await Axios.post('/password/reset', credential)
        router.push({ name: 'login' })
      } finally {
        context.commit('loading', false)
      }
    },
    async logout(context) {
      context.commit('logging', true)
      try {
        await Axios.post('logout')
        context.dispatch('clearStorage')
      } finally {
        context.commit('logging', false)
      }
    },
    async getUser(state) {
      const res = await Axios.get('/auth')
      state.commit('user', res.data)
      return res
    },
    clearStorage(context) {
      context.commit('setToken', null)
      context.commit('company/companies', [], { root: true })
      context.commit('branch/branches', [], { root: true })
      context.commit('group/groups', [], { root: true })
      context.commit('user/users', [], { root: true })
      context.commit('account/accounts', [], { root: true })
      context.commit('payee/payees', [], { root: true })
      context.commit('check/checks', [], { root: true })
      context.commit('footer', false, { root: true })
      localStorage.removeItem('access_token')
      router.push({ name: 'login' })
    }
  },
  getters: {
    company(state) {
      return state.company
    },
    loading(state) {
      return state.loading
    },
    loggedIn(state) {
      return state.token !== null
    },
    logging(state) {
      return state.logging
    },
    user(state) {
      return state.user
    },
    token(state) {
      return state.token
    }
  }
}
