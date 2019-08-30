import axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    loading: false,
    logging: false,
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
    }
  },
  actions: {
    login(context, credential) {
      context.commit('loading', true)
      axios
        .post('/api/login', credential)
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
      axios
        .post('/api/password/email', credential)
        .then(() => {
          router.push({ name: 'login' })
        })
        .finally(() => {
          context.commit('loading', false)
        })
    },
    resetPassword(context, credential) {
      context.commit('loading', true)
      axios
        .post('/api/password/reset', credential)
        .then(() => {
          router.push({ name: 'login' })
        })
        .finally(() => {
          context.commit('loading', false)
        })
    },
    logout(context) {
      context.commit('logging', true)
      axios.post('api/logout').then(() => {
        context.dispatch('clearToken')
        router.push({ name: 'login' })
        context.commit('logging', false)
      })
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
    token(state) {
      return state.token
    }
  }
}
