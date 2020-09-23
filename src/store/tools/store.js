import Axios from 'axios'

export default {
  namespaced: true,
  state: {
    access: [],
    accounts: [],
    actions: [],
    allTransmittals: [],
    branches: [],
    company: {},
    companies: [],
    groups: [],
    modules: [],
    payees: [],
    payeeGroup: [],
    reports: [],
    staledChecks: [],
    status: [],
    transmittals: [],
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
    allTransmittals(state, payload) {
      state.allTransmittals = payload
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
    reports(state, payload) {
      state.reports = payload
    },
    status(state, payload) {
      state.status = payload
    },
    staledChecks(state, payload) {
      state.staledChecks = payload
    },
    transmittals(state, payload) {
      state.transmittals = payload
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
    async getStaledChecks(context) {
      try {
        const url =
          '/tools/staled-checks/' + context.rootGetters['tools/company'].code
        const res = await Axios.get(url)

        if (res.data.length) {
          context.commit('staledChecks', res.data)
          context.commit('staledNotification', true, { root: true })
        }
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
    async getReports(context) {
      try {
        const res = await Axios.get('/tools/reports')
        context.commit('reports', res.data)
      } catch (error) {
        throw error
      }
    },
    async getStatus(context) {
      try {
        const res = await Axios.get('/tools/status')
        context.commit('status', res.data)
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
    },
    async getTransmittals(context, option) {
      try {
        const url =
          '/tools/transmittals/' + context.rootGetters['tools/company'].code
        const res = await Axios.post(url, option)
        context.commit('allTransmittals', res.data)
      } catch (e) {
        return
      }
    },
    async getReceivedTransmittals(context) {
      try {
        const url =
          '/tools/transmittals/received/' +
          context.rootGetters['tools/company'].code
        const res = await Axios.get(url)
        context.commit('transmittals', res.data)
      } catch (e) {
        return
      }
    },
    async getSentTransmittals(context) {
      try {
        const url =
          '/tools/transmittals/sent/' +
          context.rootGetters['tools/company'].code
        const res = await Axios.get(url)
        context.commit('transmittals', res.data)
      } catch (e) {
        return
      }
    },
    async getReturnedTransmittals(context) {
      try {
        const url =
          '/tools/transmittals/returned/' +
          context.rootGetters['tools/company'].code
        const res = await Axios.get(url)
        context.commit('transmittals', res.data)
      } catch (e) {
        return
      }
    },
    async uploadAvatar(context, file) {
      try {
        let data = new FormData()
        data.append('avatar', file)
        await Axios.post('/auth/avatar', data)
      } catch (error) {
        throw error
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
    allTransmittals(state) {
      return state.allTransmittals
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
    reports(state) {
      return state.reports
    },
    staledChecks(state) {
      return state.staledChecks
    },
    status(state) {
      return state.status
    },
    transmittals(state) {
      return state.transmittals
    },
    users(state) {
      return state.users
    }
  }
}
