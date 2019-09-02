import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    loading: false,
    logging: false,
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
    login(context, credential) {
      context.commit('loading', true)
      Axios.post('/login', credential)
        .then(res => {
          const token = res.data.access_token
          localStorage.setItem('access_token', token)
          context.commit('setToken', token)
          router.push({ name: 'home' })
          context.commit(
            'alert',
            { message: 'Successfully logged in.', color: 'blue' },
            { root: true }
          )
        })
        .finally(() => {
          context.commit('loading', false)
        })
    },
    sendResetPassword(context, credential) {
      context.commit('loading', true)
      Axios.post('/password/email', credential)
        .then(() => {
          router.push({ name: 'login' })
        })
        .finally(() => {
          context.commit('loading', false)
        })
    },
    resetPassword(context, credential) {
      context.commit('loading', true)
      Axios.post('/password/reset', credential)
        .then(() => {
          router.push({ name: 'login' })
        })
        .finally(() => {
          context.commit('loading', false)
        })
    },
    logout(context) {
      context.commit('logging', true)
      Axios.post('logout').then(() => {
        context.dispatch('clearToken')
        router.push({ name: 'login' })
        context.commit('logging', false)
      })
    },
    getUser(state) {
      state.commit('logging', true)
      Axios.get('/auth')
        .then(res => {
          state.commit('user', res.data)
        })
        .finally(() => state.commit('logging', false))
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
