export default {
  check(state, payload) {
    state.check = payload
  },
  newCheck(state, payload) {
    state.newCheck = payload
  },
  pagination(state, payload) {
    state.pagination = payload
  },
  checks(state, payload) {
    state.checks = payload
  },
  filter(state, payload) {
    state.filter = payload
  },
  transmittals(state, payload) {
    state.transmittals = payload
  },
  selectedChecks(state, payload) {
    state.selectedChecks = payload
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
  importing(state, payload) {
    state.importing = payload
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
  waiting(state, payload) {
    state.waiting = payload
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
  showHistory(state, payload) {
    state.showHistory = payload
  },
  showReceive(state, payload) {
    state.showReceive = payload
  },
  showReturn(state, payload) {
    state.showReturn = payload
  },
  showSelected(state, payload) {
    state.showSelected = payload
  },
  showTransmit(state, payload) {
    state.showTransmit = payload
  },
  import(state, payload) {
    state.import = payload
  },
  showImportCreate(state, payload) {
    state.showImportCreate = payload
  },
  showImportClear(state, payload) {
    state.showImportClear = payload
  },
  showSuccessMessage(state, payload) {
    state.showSuccessMessage = payload
  },
  showFailedMessage(state, payload) {
    state.showFailedMessage = payload
  },
  successMessage(state, payload) {
    state.successMessage = payload
    state.showSuccessMessage = true
  },
  failedMessage(state, payload) {
    state.failedMessage = payload
    state.showFailedMessage = true
  },
  failedChecks(state, payload) {
    state.failedChecks = payload
  },
  successChecks(state, payload) {
    state.successChecks = payload
  },
  showFailedClear(state, payload) {
    state.showFailedClear = payload
  },
  showSuccessClear(state, payload) {
    state.showSuccessClear = payload
  },
  showFailedCreate(state, payload) {
    state.showFailedCreate = payload
  },
  showSuccessCreate(state, payload) {
    state.showSuccessCreate = payload
  }
}
