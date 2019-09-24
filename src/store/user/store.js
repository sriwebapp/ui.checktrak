import Axios from 'axios'
import router from './../../router.js'

export default {
  namespaced: true,
  state: {
    access: null,
    editedUser: {},
    loading: false,
    showDelete: false,
    user: {},
    users: []
  },
  mutations: {
    access(state, payload) {
      state.access = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    showDelete(state, payload) {
      state.showDelete = payload
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
    async getAccess(context, id) {
      context.commit('access', null)
      context.commit('loading', true)
      try {
        const res = await Axios.get('/user/' + id)
        context.commit('user', res.data)
        context.commit('access', res.data.access.id)
      } catch (e) {
        return
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
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getUsers(context) {
      context.commit('loading', true)
      try {
        const res = await Axios.get('/user')
        context.commit('users', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, user) {
      context.commit('loading', true)
      try {
        const res = await Axios.post('/user', user)
        await context.dispatch('auth/getUser', {}, { root: true })
        await context.dispatch('tools/getUsers', {}, { root: true })
        router.push({ name: 'user-access', params: { id: res.data.user.id } })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async edit(context, user) {
      context.commit('loading', true)
      try {
        await Axios.patch('/user/' + user.id, user)
        await context.dispatch('auth/getUser', {}, { root: true })
        await context.dispatch('tools/getUsers', {}, { root: true })
        router.push({ name: user.active ? 'user-access' : 'users' })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async editAccess(context, access) {
      context.commit('loading', true)
      try {
        await Axios.post('/user/' + access.user_id + '/access', access)
        router.push({ name: 'users' })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async delete(context, id) {
      context.commit('loading', true)
      try {
        await Axios.delete('/user/' + id)
        await context.dispatch('auth/getUser', {}, { root: true })
        await context.dispatch('tools/getUsers', {}, { root: true })
        router.push({ name: 'users' })
      } catch (error) {
        throw error
      } finally {
        context.commit('showDelete', false)
        context.commit('loading', false)
      }
    }
  },
  getters: {
    access(state) {
      return state.access
    },
    editedUser(state) {
      return state.editedUser
    },
    loading(state) {
      return state.loading
    },
    showDelete(state) {
      return state.showDelete
    },
    user(state) {
      return state.user
    },
    users(state) {
      return state.users
    }
  }
}
