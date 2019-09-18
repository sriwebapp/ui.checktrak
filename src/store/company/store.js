import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    company: {},
    companies: [],
    editedCompany: {},
    loading: false
  },
  mutations: {
    company(state, payload) {
      state.company = payload
      state.editedCompany = Object.assign({}, payload)
    },
    companies(state, payload) {
      state.companies = payload
    },
    editedCompany(state, payload) {
      state.editedCompany = payload
    },
    loading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    async getCompany(context, code) {
      context.commit('loading', true)
      context.commit('company', {})
      try {
        const res = await Axios.get('/company/' + code)
        context.commit('company', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getCompanies(context) {
      context.commit('loading', true)
      try {
        const res = await Axios.get('/company')
        context.commit('companies', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, company) {
      context.commit('loading', true)
      try {
        await Axios.post('/company', company)
        router.push({ name: 'companies' })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async edit(context, company) {
      context.commit('loading', true)
      try {
        const res = await Axios.patch(
          '/company/' + context.getters.company.code,
          company
        )
        router.push({
          name: 'show-company',
          params: { code: res.data.company.code }
        })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    }
  },
  getters: {
    company(state) {
      return state.company
    },
    editedCompany(state) {
      return state.editedCompany
    },
    companies(state) {
      return state.companies
    },
    loading(state) {
      return state.loading
    }
  }
}
