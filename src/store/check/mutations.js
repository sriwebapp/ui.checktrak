export default {
  check(state, payload) {
    state.check = payload
  },
  checks(state, payload) {
    state.checks = payload
  },
  cancelling(state, payload) {
    state.cancelling = payload
  },
  creating(state, payload) {
    state.creating = payload
  },
  claiming(state, payload) {
    state.claiming = payload
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
  showCancel(state, payload) {
    state.showCancel = payload
  },
  showCheck(state, payload) {
    state.showCheck = payload
  },
  showCreate(state, payload) {
    state.showCreate = payload
  },
  showClaim(state, payload) {
    state.showClaim = payload
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
