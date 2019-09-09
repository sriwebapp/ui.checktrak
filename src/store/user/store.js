import Axios from 'axios'
import router from './../../router.js'

export default {
  namespaced: true,
  state: {
    editedUser: {},
    group: null,
    loading: false,
    newUser: {},
    user: {},
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
    user(state, payload) {
      state.user = payload
      state.editedUser = Object.assign({}, payload)
    },
    users(state, payload) {
      state.users = payload
    }
  },
  actions: {
    async getGroup(context, id) {
      context.commit('group', null)
      context.commit('loading', true)
      try {
        const res = await Axios.get('/user/' + id)
        context.commit('user', res.data)
        context.commit('group', res.data.group.id)
      } finally {
        context.commit('loading', false)
      }
    },
    async getUser(context, id) {
      context.commit('user', {})
      context.commit('loading', true)
      try {
        const res = await Axios.get('/user/' + id)
        context.commit('user', res.data)
      } finally {
        context.commit('loading', false)
      }
    },
    async getUsers(context) {
      context.commit('loading', true)
      try {
        const res = await Axios.get('/user')
        context.commit('users', res.data)
        return res
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, user) {
      context.commit('loading', true)
      try {
        const res = await Axios.post('/user', user)
        context.commit('newUser', {})
        router.push({ name: 'user-access', params: { id: res.data.user.id } })
      } finally {
        context.commit('loading', false)
      }
    },
    async edit(context, user) {
      context.commit('loading', true)
      try {
        await Axios.patch('/user/' + user.id, user)
        router.push({ name: 'users' })
      } finally {
        context.commit('loading', false)
      }
    },
    async editAccess(context, access) {
      context.commit('loading', true)
      try {
        await Axios.post('/user/' + access.user_id + '/access', access)
        router.push({ name: 'users' })
      } finally {
        context.commit('loading', false)
      }
    }
  },
  getters: {
    editedUser(state) {
      return state.editedUser
    },
    group(state) {
      return state.group
    },
    loading(state) {
      return state.loading
    },
    newUser(state) {
      return state.newUser
    },
    user(state) {
      return state.user
    },
    users(state) {
      return state.users
    }
  }
}
