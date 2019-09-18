import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    group: {},
    groups: [],
    loading: false
  },
  mutations: {
    group(state, payload) {
      state.group = payload
    },
    groups(state, payload) {
      state.groups = payload
    },
    loading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    async getGroup(context, id) {
      context.commit('loading', true)
      try {
        context.commit('group', {})
        const res = await Axios.get('/group/' + id)
        context.commit('group', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getGroups(context) {
      context.commit('loading', true)
      try {
        const res = await Axios.get('/group')
        context.commit('groups', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async editAccess(context, access) {
      context.commit('loading', true)
      try {
        await Axios.patch('/group/' + access.group_id, access)
        router.push({ name: 'groups' })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    }
  },
  getters: {
    group(state) {
      return state.group
    },
    groups(state) {
      return state.groups
    },
    loading(state) {
      return state.loading
    }
  }
}
