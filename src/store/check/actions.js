import Axios from 'axios'
import router from './../../router'

export default {
  async getChecks(context, options) {
    context.commit('loading', true)
    try {
      const url = '/' + context.rootGetters['tools/company'].code + '/check'
      const res = await Axios.post(url, options)
      context.commit('checks', res.data)
      // context.commit('selectedChecks', [])
    } catch (e) {
      return
    } finally {
      context.commit('loading', false)
    }
  },
  async getCheck(context, id) {
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/' + id
      const res = await Axios.get(url)
      context.commit('check', res.data)
    } catch (e) {
      return
    }
  },
  async showCheck(context, id) {
    context.commit('loading', true)
    try {
      await context.dispatch('getCheck', id)
      context.commit('showCheck', true)
    } catch (error) {
      return
    } finally {
      context.commit('loading', false)
    }
  },
  async cancel(context, data) {
    context.commit('cancelling', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/cancel'
      await Axios.post(url, data)
      context.commit('showCancel', false)
      context.commit('selectedChecks', [])
      context.dispatch('getChecks', context.getters.pagination)
    } catch (e) {
      return
    } finally {
      context.commit('cancelling', false)
    }
  },
  async claim(context, data) {
    context.commit('claiming', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/claim'
      await Axios.post(url, data)
      context.commit('showClaim', false)
      context.commit('selectedChecks', [])
      context.dispatch('getChecks', context.getters.pagination)
    } catch (e) {
      return
    } finally {
      context.commit('claiming', false)
    }
  },
  async clear(context, data) {
    context.commit('clearing', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/clear'
      await Axios.post(url, data)
      context.commit('showClear', false)
      context.commit('selectedChecks', [])
      context.dispatch('getChecks', context.getters.pagination)
    } catch (e) {
      return
    } finally {
      context.commit('clearing', false)
    }
  },
  async create(context, check) {
    context.commit('creating', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/create'
      await Axios.post(url, check)
      context.commit('showCreate', false)
      context.commit('newCheck', {
        date: new Date().toISOString().substr(0, 10)
      })
      context.commit('selectedChecks', [])
      context.dispatch('getChecks', context.getters.pagination)
    } catch (e) {
      return
    } finally {
      context.commit('creating', false)
    }
  },
  async delete(context, data) {
    context.commit('deleting', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/' + data.id
      await Axios.delete(url, { data })
      context.commit('showDelete', false)
      context.commit('selectedChecks', [])
      context.dispatch('getChecks', context.getters.pagination)
    } catch (e) {
      return
    } finally {
      context.commit('deleting', false)
    }
  },
  async edit(context, check) {
    context.commit('editing', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/' + check.id
      await Axios.patch(url, check)
      context.commit('showEdit', false)
      context.dispatch('getChecks', context.getters.pagination)
    } catch (e) {
      return
    } finally {
      context.commit('editing', false)
    }
  },
  async importCreateChecks(context, file) {
    context.commit('importing', true)
    try {
      let data = new FormData()
      data.append('checks_file', file)
      const url =
        '/' + context.rootGetters['tools/company'].code + '/import/check'
      const res = await Axios.post(url, data)
      context.commit('showImportCreate', false)
      await context.dispatch('getChecks', context.getters.pagination)

      if (res.data.successMessage) {
        context.commit('successMessage', res.data.successMessage)
      }
      if (res.data.failedMessage) {
        context.commit('failedMessage', res.data.failedMessage)
      }
      context.commit('selectedChecks', [])
      context.commit('import', res.data.import)
    } catch (error) {
      return
    } finally {
      context.commit('importing', false)
    }
  },
  async importClearChecks(context, arg) {
    context.commit('importing', true)
    try {
      let data = new FormData()
      data.append('clear_checks_file', arg.file)
      data.append('account_id', arg.account)

      const url =
        '/' + context.rootGetters['tools/company'].code + '/import/clear-check'
      const res = await Axios.post(url, data)

      context.commit('showImportClear', false)
      await context.dispatch('getChecks', context.getters.pagination)

      if (res.data.successMessage) {
        context.commit('successMessage', res.data.successMessage)
      }
      if (res.data.failedMessage) {
        context.commit('failedMessage', res.data.failedMessage)
      }
      context.commit('selectedChecks', [])
      context.commit('import', res.data.import)
    } catch (error) {
      return
    } finally {
      context.commit('importing', false)
    }
  },
  async receive(context, data) {
    context.commit('receiving', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/receive'
      await Axios.post(url, data)
      context.commit('showReceive', false)
      context.commit('selectedChecks', [])
      context.dispatch('getChecks', context.getters.pagination)
    } catch (e) {
      return
    } finally {
      context.commit('receiving', false)
    }
  },
  async returnChecks(context, data) {
    context.commit('returning', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/return'
      await Axios.post(url, data)
      context.commit('showReturn', false)
      router.push({
        name: 'show-transmittal',
        params: { id: data.transmittal_id }
      })
    } catch (e) {
      return
    } finally {
      context.commit('returning', false)
    }
  },
  async transmit(context, data) {
    context.commit('transmitting', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/transmit'
      const res = await Axios.post(url, data)
      context.commit('showTransmit', false)
      router.push({
        name: 'show-transmittal',
        params: { id: res.data.transmittal }
      })
    } catch (e) {
      return
    } finally {
      context.commit('transmitting', false)
    }
  }
}
