import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    actions: [],
    branches: [],
    company: {},
    companies: [],
    groups: [],
    modules: [],
    users: []
  },
  mutations: {
    actions(state, payload) {
      state.actions = payload
    },
    branches(state, payload) {
      state.branches = payload
    },
    company(state, payload) {
      state.company = payload
    },
    companies(state, payload) {
      state.companies = payload
    },
    groups(state, payload) {
      state.groups = payload
    },
    modules(state, payload) {
      state.modules = payload
    },
    users(state, payload) {
      state.users = payload
    }
  },
  actions: {
    async getActions(context) {
      const res = await Axios.get('/tools/actions')
      context.commit('actions', res.data)
      return res
    },
    async getBranches(context) {
      const res = await Axios.get('/tools/branches')
      context.commit('branches', res.data)
      return res
    },
    async getCompany(context, id) {
      try {
        const res = await Axios.get('/tools/company/' + id)
        context.commit('company', res.data)
        return res
      } catch (error) {
        context.dispatch('auth/clearStorage', {}, { root: true })
      }
    },
    async getCompanies(context) {
      const res = await Axios.get('/tools/companies')
      context.commit('companies', res.data)
      return res
    },
    async getGroups(context) {
      const res = await Axios.get('/tools/groups')
      context.commit('groups', res.data)
      return res
    },
    async getModules(context) {
      const res = await Axios.get('/tools/modules')
      context.commit('modules', res.data)
      return res
    },
    async getUsers(context) {
      const res = await Axios.get('/tools/users')
      context.commit('users', res.data)
      return res
    }
  },
  getters: {
    actions(state) {
      return state.actions
    },
    branches(state) {
      return state.branches
    },
    company(state) {
      return state.company
    },
    companies(state) {
      return state.companies
    },
    groups(state) {
      return state.groups
    },
    modules(state) {
      return state.modules
    },
    users(state) {
      return state.users
    }
  }
}
