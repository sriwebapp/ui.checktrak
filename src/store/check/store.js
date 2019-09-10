import Axios from 'axios'
import { create } from 'domain'

export default {
  namespaced: true,
  state: {
    checks: [],
    creating: false,
    loading: false,
    newCheck: { date: new Date().toISOString().substr(0, 10) },
    showCreate: false,
    waiting: false
  },
  mutations: {
    checks(state, payload) {
      state.checks = payload
    },
    creating(state, payload) {
      state.creating = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    newCheck(state, payload) {
      state.newCheck = payload
    },
    showCreate(state, payload) {
      state.showCreate = payload
    },
    waiting(state, payload) {
      state.waiting = payload
    }
  },
  actions: {
    async getChecks(context) {
      context.commit('loading', true)
      try {
        const url = '/' + context.rootGetters['tools/company'].code + '/check'
        const res = await Axios.get(url)
        context.commit('checks', res.data)
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, payload) {
      context.commit('creating', true)
      try {
        const url =
          '/' + context.rootGetters['tools/company'].code + '/check/create'
        await Axios.post(url, payload)
        context.commit('showCreate', false)
        context.commit('newCheck', {
          date: new Date().toISOString().substr(0, 10)
        })
        context.dispatch('getChecks')
      } finally {
        context.commit('creating', false)
      }
    }
  },
  getters: {
    checks(state) {
      return state.checks
    },
    creating(state) {
      return state.creating
    },
    loading(state) {
      return state.loading
    },
    newCheck(state) {
      return state.newCheck
    },
    showCreate(state) {
      return state.showCreate
    },
    waiting(state) {
      return state.waiting
    }
  }
}
