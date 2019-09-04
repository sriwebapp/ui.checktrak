import Axios from 'axios'
import router from './../../router'

export default {
  namespaced: true,
  state: {
    branch: {},
    branches: [],
    editedBranch: {},
    loading: false,
    newBranch: {}
  },
  mutations: {
    branch(state, payload) {
      state.branch = payload
      state.editedBranch = Object.assign({}, payload)
    },
    branches(state, payload) {
      state.branches = payload
    },
    editedBranch(state, payload) {
      state.editedBranch = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
    newBranch(state, payload) {
      state.newBranch = payload
    }
  },
  actions: {
    async getBranch(context, id) {
      context.commit('loading', true)
      context.commit('branch', {})
      try {
        const res = await Axios.get('/branch/' + id)
        context.commit('branch', res.data)
      } finally {
        context.commit('loading', false)
      }
    },
    async getBranches(context) {
      context.commit('loading', true)
      try {
        const res = await Axios.get('/branch')
        context.commit('branches', res.data)
      } finally {
        context.commit('loading', false)
      }
    },
    async create(context, branch) {
      context.commit('loading', true)
      try {
        await Axios.post('/branch', branch)
        context.commit('newBranch', {})
        router.push({ name: 'branches' })
      } finally {
        context.commit('loading', false)
      }
    },
    async edit(context, branch) {
      context.commit('loading', true)
      try {
        await Axios.patch('/branch/' + branch.id, branch)
        router.push({ name: 'branches' })
      } finally {
        context.commit('loading', false)
      }
    }
  },
  getters: {
    branch(state) {
      return state.branch
    },
    branches(state) {
      return state.branches
    },
    editedBranch(state) {
      return state.editedBranch
    },
    loading(state) {
      return state.loading
    },
    newBranch(state) {
      return state.newBranch
    }
  }
}
