import Axios from 'axios'

export default {
  async getChecks(context, options) {
    context.commit('loading', true)
    try {
      const url = '/' + context.rootGetters['tools/company'].code + '/check'
      const res = await Axios.post(url, options)
      context.commit('checks', res.data)
      context.commit('selectedChecks', [])
    } catch (e) {
      return
    } finally {
      context.commit('loading', false)
    }
  },
  async getCheck(context, id) {
    context.commit('loading', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/' + id
      const res = await Axios.get(url)
      context.commit('check', res.data)
      context.commit('showCheck', true)
    } catch (e) {
      return
    } finally {
      context.commit('loading', false)
    }
  },
  async getReceivedTransmittals(context) {
    context.commit('loading', true)
    try {
      const url =
        '/tools/transmittals/received/' +
        context.rootGetters['tools/company'].code
      const res = await Axios.get(url)
      context.commit('transmittals', res.data)
      context.commit('showReturn', true)
    } catch (e) {
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
  async importChecks(context, file) {
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
      context.dispatch('getChecks', context.getters.pagination)
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
      await Axios.post(url, data)
      context.commit('showTransmit', false)
      context.dispatch('getChecks', context.getters.pagination)
    } catch (e) {
      return
    } finally {
      context.commit('transmitting', false)
    }
  }
}
