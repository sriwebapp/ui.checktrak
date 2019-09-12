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
  deleting(state, payload) {
    state.deleting = payload
  },
  editing(state, payload) {
    state.editing = payload
  },
  loading(state, payload) {
    state.loading = payload
  },
  transmitting(state, payload) {
    state.transmitting = payload
  },
  newCheck(state, payload) {
    state.newCheck = payload
  },
  selectedChecks(state, payload) {
    state.selectedChecks = payload
  },
  showCheck(state, payload) {
    state.showCheck = payload
  },
  showCreate(state, payload) {
    state.showCreate = payload
  },
  showDelete(state, payload) {
    state.showDelete = payload
  },
  showEdit(state, payload) {
    state.showEdit = payload
  },
  showTransmit(state, payload) {
    state.showTransmit = payload
  },
  waiting(state, payload) {
    state.waiting = payload
  }
}
