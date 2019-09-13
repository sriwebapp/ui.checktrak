export default {
  check(state) {
    return state.check
  },
  checks(state) {
    return state.checks
  },
  creating(state) {
    return state.creating
  },
  claiming(state) {
    return state.claiming
  },
  deleting(state) {
    return state.deleting
  },
  editing(state) {
    return state.editing
  },
  loading(state) {
    return state.loading
  },
  transmitting(state) {
    return state.transmitting
  },
  newCheck(state) {
    return state.newCheck
  },
  selectedChecks(state) {
    return state.selectedChecks
  },
  showCheck(state) {
    return state.showCheck
  },
  showCreate(state) {
    return state.showCreate
  },
  showClaim(state) {
    return state.showClaim
  },
  showDelete(state) {
    return state.showDelete
  },
  showEdit(state) {
    return state.showEdit
  },
  showTransmit(state) {
    return state.showTransmit
  },
  waiting(state) {
    return state.waiting
  }
}
