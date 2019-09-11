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
  deleting(state) {
    return state.deleting
  },
  editing(state) {
    return state.editing
  },
  loading(state) {
    return state.loading
  },
  newCheck(state) {
    return state.newCheck
  },
  selectedChecks(state) {
    return state.selectedChecks
  },
  showCreate(state) {
    return state.showCreate
  },
  showDelete(state) {
    return state.showDelete
  },
  showEdit(state) {
    return state.showEdit
  },
  showCheck(state) {
    return state.showCheck
  },
  waiting(state) {
    return state.waiting
  }
}
