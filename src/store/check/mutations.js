export default {
  check(state, payload) {
    state.check = payload
  },
  checks(state, payload) {
    state.checks = payload
  },
  creating(state, payload) {
    state.creating = payload
  },
  editing(state, payload) {
    state.editing = payload
  },
  loading(state, payload) {
    state.loading = payload
  },
  newCheck(state, payload) {
    state.newCheck = payload
  },
  selectedChecks(state, payload) {
    state.selectedChecks = payload
  },
  showCreate(state, payload) {
    state.showCreate = payload
  },
  showEdit(state, payload) {
    state.showEdit = payload
  },
  showCheck(state, payload) {
    state.showCheck = payload
  },
  waiting(state, payload) {
    state.waiting = payload
  }
}
