import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    editedPayee: {},
    loading: false,
    waiting: false,
    payee: {},
    payees: {},
    showDelete: false,
    import: null,
    showImportCreate: false,
    showSuccessMessage: false,
    showFailedMessage: false,
    successMessage: null,
    failedMessage: null,
    failedImports: [],
    successImports: [],
    showFailedCreate: false,
    showSuccessCreate: false
  },
  mutations: {
    editedPayee(state, payload) {
      state.editedPayee = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    waiting(state, payload) {
      state.waiting = payload
    },
    payee(state, payload) {
      state.payee = payload
      state.editedPayee = Object.assign({}, payload)
    },
    payees(state, payload) {
      state.payees = payload
    },
    showDelete(state, payload) {
      state.showDelete = payload
    },
    import(state, payload) {
      state.import = payload
    },
    showImportCreate(state, payload) {
      state.showImportCreate = payload
    },
    showSuccessMessage(state, payload) {
      state.showSuccessMessage = payload
    },
    showFailedMessage(state, payload) {
      state.showFailedMessage = payload
    },
    successMessage(state, payload) {
      state.successMessage = payload
      state.showSuccessMessage = true
    },
    failedMessage(state, payload) {
      state.failedMessage = payload
      state.showFailedMessage = true
    },
    failedImports(state, payload) {
      state.failedImports = payload
    },
    successImports(state, payload) {
      state.successImports = payload
    },
    showFailedCreate(state, payload) {
      state.showFailedCreate = payload
    },
    showSuccessCreate(state, payload) {
      state.showSuccessCreate = payload
    }
  },
  actions: {
    async getPayees(context, options) {
      context.commit('loading', true)
      try {
        const url = '/' + context.rootGetters['tools/company'].code + '/payee'
        const res = await Axios.post(url, options)
        context.commit('payees', res.data)
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async getPayee(context, id) {
      context.commit('loading', true)
      context.commit('payee', {})
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/payee/' + id
        const res = await Axios.get(url)
        context.commit('payee', res.data)
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, payee) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/payee/create'
        await Axios.post(url, payee)
        router.push({ name: 'payees' })
      } catch (e) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async edit(context, payee) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/payee/' + payee.id
        await Axios.patch(url, payee)
        router.push({ name: 'payees' })
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    },
    async delete(context, id) {
      context.commit('loading', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/payee/' + id
        await Axios.delete(url)
        router.push({ name: 'payees' })
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
        context.commit('showDelete', false)
      }
    },
    async importCreatePayees(context, file) {
      context.commit('loading', true)
      try {
        let data = new FormData()
        data.append('payees_file', file)
        const url =
          '/' + context.rootGetters['tools/company'].code + '/import/payee'
        const res = await Axios.post(url, data)
        context.commit('showImportCreate', false)
        router.push({ name: 'payees' })

        if (res.data.successMessage) {
          context.commit('successMessage', res.data.successMessage)
        }
        if (res.data.failedMessage) {
          context.commit('failedMessage', res.data.failedMessage)
        }
        context.commit('import', res.data.import)
      } catch (error) {
        return
      } finally {
        context.commit('loading', false)
      }
    }
  },
  getters: {
    editedPayee(state) {
      return state.editedPayee
    },
    loading(state) {
      return state.loading
    },
    waiting(state) {
      return state.waiting
    },
    payee(state) {
      return state.payee
    },
    payees(state) {
      return state.payees
    },
    showDelete(state) {
      return state.showDelete
    },
    import(state) {
      return state.import
    },
    showImportCreate(state) {
      return state.showImportCreate
    },
    showSuccessMessage(state) {
      return state.showSuccessMessage
    },
    showFailedMessage(state) {
      return state.showFailedMessage
    },
    successMessage(state) {
      return state.successMessage
    },
    failedMessage(state) {
      return state.failedMessage
    },
    failedImports(state) {
      return state.failedImports
    },
    successImports(state) {
      return state.successImports
    },
    showFailedCreate(state) {
      return state.showFailedCreate
    },
    showSuccessCreate(state) {
      return state.showSuccessCreate
    }
  }
}
