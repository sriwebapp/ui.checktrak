<template>
  <v-container fluid v-if="!waiting">
    <message />
    <router-view></router-view>
    <import-create />
    <import-clear />
    <cancel-form />
    <claim-form />
    <stale-form />
    <clear-form />
    <create-form />
    <undo-form />
    <delete-form />
    <edit-form />
    <receive-form />
    <return-form />
    <transmit-form />
    <show-check />
    <failed-create />
    <success-create />
    <failed-clear />
    <success-clear />
    <show-history />
    <show-selected />
    <show-state />
    <select-filter />
  </v-container>
</template>

<script>
import store from './../../store/store'
export default {
  components: {
    message: () => import('./Message.vue'),
    importCreate: () => import('./ImportCreate.vue'),
    importClear: () => import('./ImportClear.vue'),
    cancelForm: () => import('./Cancel.vue'),
    claimForm: () => import('./Claim.vue'),
    staleForm: () => import('./Stale.vue'),
    clearForm: () => import('./Clear.vue'),
    createForm: () => import('./Create.vue'),
    undoForm: () => import('./Undo.vue'),
    deleteForm: () => import('./Delete.vue'),
    editForm: () => import('./Edit.vue'),
    receiveForm: () => import('./Receive.vue'),
    returnForm: () => import('./Return.vue'),
    transmitForm: () => import('./Transmit.vue'),
    showCheck: () => import('./Show.vue'),
    failedCreate: () => import('./FailedCreate.vue'),
    successCreate: () => import('./SuccessCreate.vue'),
    failedClear: () => import('./FailedClear.vue'),
    successClear: () => import('./SuccessClear.vue'),
    showHistory: () => import('./History.vue'),
    showSelected: () => import('./Selected.vue'),
    showState: () => import('./State.vue'),
    selectFilter: () => import('./SelectFilter.vue')
  },
  computed: {
    waiting() {
      return this.$store.getters['check/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('check/waiting', true)
    this.$store.commit('check/checks', [])
    setTimeout(() => {
      this.$store.commit('loader', false)
      this.$store.commit('check/waiting', false)
      this.$store.commit('check/selectedChecks', [])
      this.$store.commit('check/selecting', false)
      this.$store.commit('check/filter', [])
      this.$store.commit('check/filterContent', {})
      this.$store.commit('footer', true)
    }, 500)
  },
  beforeRouteLeave(to, from, next) {
    store.commit('footer', false)
    next()
  }
}
</script>

<style></style>
