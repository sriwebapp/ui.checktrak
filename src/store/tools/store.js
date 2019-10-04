import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    access: [],
    accounts: [],
    actions: [],
    branches: [],
    company: {},
    companies: [],
    groups: [],
    modules: [],
    payees: {},
    payeeGroup: [],
    users: []
  },
  mutations: {
    access(state, payload) {
      state.access = payload
    },
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
    async getAccess(context) {
      try {
        const res = await Axios.get('/tools/access')
        context.commit('access', res.data)
      } catch (error) {
        throw error
      }
    },
    async getAccounts(context) {
      try {
        const res = await Axios.get(
          '/tools/accounts/' + context.rootGetters['tools/company'].code
        )
        context.commit('accounts', res.data)
      } catch (error) {
        throw error
      }
    },
    async getActions(context) {
      try {
        const res = await Axios.get('/tools/actions')
        context.commit('actions', res.data)
      } catch (error) {
        throw error
      }
    },
    async getBranches(context) {
      try {
        const res = await Axios.get('/tools/branches')
        context.commit('branches', res.data)
      } catch (error) {
        throw error
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
        throw error
      }
    },
    async getCompanies(context) {
      try {
        const res = await Axios.get('/tools/companies')
        context.commit('companies', res.data)
      } catch (error) {
        throw error
      }
    },
    async getGroups(context) {
      try {
        const res = await Axios.get('/tools/groups')
        context.commit('groups', res.data)
      } catch (error) {
        throw error
      }
    },
    async getModules(context) {
      try {
        const res = await Axios.get('/tools/modules')
        context.commit('modules', res.data)
      } catch (error) {
        throw error
      }
    },
    async getPayees(context, option) {
      try {
        const url = '/tools/payees/' + context.rootGetters['tools/company'].code
        const res = await Axios.post(url, option)
        context.commit('payees', res.data)
      } catch (error) {
        throw error
      }
    },
    async getPayeeGroup(context) {
      try {
        const res = await Axios.get('/tools/payee-group')
        context.commit('payeeGroup', res.data)
      } catch (error) {
        throw error
      }
    },
    async getTransmittalRef(context, branch) {
      try {
        const url =
          '/tools/transmittalRef/' +
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
        throw error
      }
    },
    async getBranchUsers(context, id) {
      try {
        const res = Axios.get('/tools/users/' + id)
        return res
      } catch (error) {
        return
      }
    },
    async getGroupIncharge(context, id) {
      try {
        const res = Axios.get('/tools/incharge/' + id)
        return res
      } catch (error) {
        return
      }
    }
  },
  getters: {
    access(state) {
      return state.access
    },
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
