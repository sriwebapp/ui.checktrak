export default {
  check: {},
  checks: [],
  creating: false,
  deleting: false,
  editing: false,
  loading: false,
  transmitting: false,
  newCheck: { date: new Date().toISOString().substr(0, 10) },
  selectedChecks: [],
  showCheck: false,
  showCreate: false,
  showDelete: false,
  showEdit: false,
  showTransmit: false,
  waiting: false
}
