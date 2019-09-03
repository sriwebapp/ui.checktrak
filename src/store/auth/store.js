import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    loading: false,
    logging: true,
    user: {},
    token: localStorage.getItem('access_token') || null
  },
  mutations: {
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
        const token = res.data.access_token
        localStorage.setItem('access_token', token)
        context.commit('setToken', token)
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
        router.push({ name: 'login' })
        context.dispatch('clearToken')
      } finally {
        context.commit('logging', false)
      }
    },
    async getUser(state) {
      const res = await Axios.get('/auth')
      state.commit('user', res.data)
      return res
    },
    clearToken(context) {
      localStorage.removeItem('access_token')
      context.commit('setToken', null)
      router.push({ name: 'login' })
    }
  },
  getters: {
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
