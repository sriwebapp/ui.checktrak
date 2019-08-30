import axios from 'axios'
import store from './../store/store'

axios.defaults.baseURL = process.env.VUE_APP_API + '/api'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + store.getters['auth/token']

// global success and error handler
axios.interceptors.response.use(
  function(response) {
    if (response.data.message) {
      store.commit('alert', { message: response.data.message, color: 'blue' })
    }
    store.getters.error.reset()
    return response
  },
  function(error) {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch('auth/clearToken')
      } else if (error.response.status === 422) {
        store.state.error.record(error.response.data.errors)
      } else {
        // store.commit('alert', { message: error.message, color: 'red' })
      }
      console.log(error.response)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    // console.log(error.config)
    return Promise.reject(error)
  }
)
