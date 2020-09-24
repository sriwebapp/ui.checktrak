import Axios from 'axios'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async countMasterlist(context, filter) {
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/report/masterlist'
        const res = await Axios.post(url, filter)
        return res.data
      } catch (e) {
        return
      }
    }
  },
  getters: {}
}
