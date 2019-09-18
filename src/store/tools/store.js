import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    accounts: [],
    actions: [],
    branches: [],
    company: {},
    companies: [],
    groups: [],
    modules: [],
    payees: [],
    payeeGroup: [],
    users: []
  },
  mutations: {
    accounts(state, payload) {
      state.accounts = payload
    },
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
    payees(state, payload) {
      state.payees = payload
    },
    payeeGroup(state, payload) {
      state.payeeGroup = payload
    },
    users(state, payload) {
      state.users = payload
    }
  },
  actions: {
    async getAccounts(context) {
      try {
        const res = await Axios.get(
          '/tools/accounts/' + context.rootGetters['tools/company'].code
        )
        context.commit('accounts', res.data)
      } catch (error) {
        return
      }
    },
    async getActions(context) {
      try {
        const res = await Axios.get('/tools/actions')
        context.commit('actions', res.data)
      } catch (error) {
        return
      }
    },
    async getBranches(context) {
      try {
        const res = await Axios.get('/tools/branches')
        context.commit('branches', res.data)
      } catch (error) {
        return
      }
    },
    async getChecks(context, transmittal_id) {
      try {
        const res = await Axios.get('/tools/checks/' + transmittal_id)
        return res
      } catch (error) {
        return
      }
    },
    async getCompany(context, id) {
      try {
        const res = await Axios.get('/tools/company/' + id)
        context.commit('company', res.data)
      } catch (error) {
        context.dispatch('auth/clearStorage', {}, { root: true })
      }
    },
    async getCompanies(context) {
      context.commit('auth/loading', true, { root: true })
      try {
        const res = await Axios.get('/tools/companies')
        context.commit('companies', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('auth/loading', false, { root: true })
      }
    },
    async getGroups(context) {
      try {
        const res = await Axios.get('/tools/groups')
        context.commit('groups', res.data)
      } catch (error) {
        return
      }
    },
    async getModules(context) {
      try {
        const res = await Axios.get('/tools/modules')
        context.commit('modules', res.data)
      } catch (error) {
        return
      }
    },
    async getPayees(context) {
      try {
        const res = await Axios.get(
          '/tools/payees/' + context.rootGetters['tools/company'].code
        )
        context.commit('payees', res.data)
      } catch (error) {
        return
      }
    },
    async getPayeeGroup(context) {
      try {
        const res = await Axios.get('/tools/payee-group')
        context.commit('payeeGroup', res.data)
      } catch (error) {
        return
      }
    },
    async getSeries(context, branch) {
      try {
        const url =
          '/tools/series/' +
          context.rootGetters['tools/company'].code +
          '/' +
          branch
        const res = Axios.get(url)
        return res
      } catch (error) {
        return
      }
    },
    async getUsers(context) {
      try {
        const res = await Axios.get('/tools/users')
        context.commit('users', res.data)
      } catch (error) {
        return
      }
    }
  },
  getters: {
    accounts(state) {
      return state.accounts
    },
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
    payees(state) {
      return state.payees
    },
    payeeGroup(state) {
      return state.payeeGroup
    },
    users(state) {
      return state.users
    }
  }
}
