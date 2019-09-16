export default {
  check(state, payload) {
    state.check = payload
  },
  checks(state, payload) {
    state.checks = payload
  },
  transmittals(state, payload) {
    state.transmittals = payload
  },
  cancelling(state, payload) {
    state.cancelling = payload
  },
  claiming(state, payload) {
    state.claiming = payload
  },
  clearing(state, payload) {
    state.clearing = payload
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
  receiving(state, payload) {
    state.receiving = payload
  },
  returning(state, payload) {
    state.returning = payload
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
  showClaim(state, payload) {
    state.showClaim = payload
  },
  showClear(state, payload) {
    state.showClear = payload
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
  showReceive(state, payload) {
    state.showReceive = payload
  },
  showReturn(state, payload) {
    state.showReturn = payload
  },
  showTransmit(state, payload) {
    state.showTransmit = payload
  },
  waiting(state, payload) {
    state.waiting = payload
  }
}
