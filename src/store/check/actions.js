import Axios from 'axios'

export default {
  async getChecks(context) {
    context.commit('loading', true)
    try {
      const url = '/' + context.rootGetters['tools/company'].code + '/check'
      const res = await Axios.get(url)
      context.commit('checks', res.data)
      context.commit('selectedChecks', [])
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
      context.commit('selectedChecks', [])
    } finally {
      context.commit('loading', false)
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
      context.dispatch('getChecks')
    } finally {
      context.commit('creating', false)
    }
  },
  async edit(context, check) {
    context.commit('editing', true)
    try {
      const url =
        '/' + context.rootGetters['tools/company'].code + '/check/' + check.id
      await Axios.patch(url, check)
      context.commit('showEdit', false)
      context.dispatch('getChecks')
    } finally {
      context.commit('editing', false)
    }
  }
}
