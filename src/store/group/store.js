import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    group: {},
    editedGroup: {},
    groups: [],
    loading: false,
    waiting: false,
    showDelete: false
  },
  mutations: {
    group(state, payload) {
      state.group = payload
      state.editedGroup = Object.assign({}, payload)
    },
    editedGroup(state, payload) {
      state.editedGroup = payload
    },
    groups(state, payload) {
      state.groups = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    waiting(state, payload) {
      state.waiting = payload
    },
    showDelete(state, payload) {
      state.showDelete = payload
    }
  },
  actions: {
    async getGroup(context, id) {
      context.commit('loading', true)
      try {
        const res = await Axios.get('/group/' + id)
        context.commit('group', res.data)
        return res
      } catch (error) {
        throw error
      } finally {
        context.commit('loading', false)
      }
    },
    async getGroups(context) {
      context.commit('loading', true)
      try {
        const res = await Axios.get('/group')
        context.commit('groups', res.data)
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, group) {
      context.commit('loading', true)
      try {
        await Axios.post('/group', group)
        router.push({ name: 'groups' })
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async edit(context, group) {
      context.commit('loading', true)
      try {
        await Axios.patch('/group/' + group.id, group)
        router.push({ name: 'groups' })
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async delete(context, id) {
      context.commit('loading', true)
      try {
        await Axios.delete('/group/' + id)
        router.push({ name: 'groups' })
      } catch (error) {
        return
      } finally {
        context.commit('showDelete', false)
        context.commit('loading', false)
      }
    }
  },
  getters: {
    group(state) {
      return state.group
    },
    editedGroup(state) {
      return state.editedGroup
    },
    groups(state) {
      return state.groups
    },
    loading(state) {
      return state.loading
    },
    waiting(state) {
      return state.waiting
    },
    showDelete(state) {
      return state.showDelete
    }
  }
}
