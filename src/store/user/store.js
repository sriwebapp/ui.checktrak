import Axios from 'axios'
import router from './../../router.js'

export default {
  namespaced: true,
  state: {
    group: null,
    loading: false,
    newUser: {},
    selectedUser: {},
    users: []
  },
  mutations: {
    group(state, payload) {
      state.group = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    newUser(state, payload) {
      state.newUser = payload
    },
    selectedUser(state, payload) {
      state.selectedUser = payload
    },
    users(state, payload) {
      state.users = payload
    }
  },
  actions: {
    getUser(context, id) {
      context.commit('selectedUser', {})
      context.commit('group', {})
      context.commit('loading', true)
      Axios.get('/user/' + id)
        .then(res => {
          context.commit('selectedUser', res.data)
          context.commit('group', res.data.group.id)
        })
        .finally(() => context.commit('loading', false))
    },
    getUsers(context) {
      context.commit('loading', true)
      Axios.get('/user')
        .then(res => context.commit('users', res.data))
        .finally(() => context.commit('loading', false))
    },
    create(context, user) {
      context.commit('loading', true)
      Axios.post('/user', user)
        .then(() => {
          context.commit('newUser', {})
          router.push({ name: 'users' })
          context.dispatch('getUsers')
        })
        .finally(() => context.commit('loading', false))
    },
    edit(context, user) {
      context.commit('loading', true)
      Axios.patch('/user/' + user.id, user)
        .then(() => {
          router.push({ name: 'users' })
          context.dispatch('getUsers')
        })
        .finally(() => context.commit('loading', false))
    }
  },
  getters: {
    group(state) {
      return state.group
    },
    loading(state) {
      return state.loading
    },
    newUser(state) {
      return state.newUser
    },
    selectedUser(state) {
      return state.selectedUser
    },
    users(state) {
      return state.users
    }
  }
}
