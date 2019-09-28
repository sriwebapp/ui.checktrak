<template>
  <v-container v-if="!waiting">
    <message />
    <router-view></router-view>
    <cancel-form />
    <claim-form />
    <clear-form />
    <create-form />
    <delete-form />
    <edit-form />
    <import-create />
    <receive-form />
    <return-form />
    <transmit-form />
    <show-check />
    <show-failed />
    <show-history />
    <show-selected />
    <filter-menu />
  </v-container>
</template>

<script>
import store from './../../store/store'
export default {
  components: {
    message: () => import('./Message.vue'),
    importCreate: () => import('./ImportCreate.vue'),
    cancelForm: () => import('./Cancel.vue'),
    claimForm: () => import('./Claim.vue'),
    clearForm: () => import('./Clear.vue'),
    createForm: () => import('./Create.vue'),
    deleteForm: () => import('./Delete.vue'),
    editForm: () => import('./Edit.vue'),
    receiveForm: () => import('./Receive.vue'),
    returnForm: () => import('./Return.vue'),
    transmitForm: () => import('./Transmit.vue'),
    showCheck: () => import('./Show.vue'),
    showFailed: () => import('./Failed.vue'),
    showHistory: () => import('./History.vue'),
    showSelected: () => import('./Selected.vue'),
    filterMenu: () => import('./Filter.vue')
  },
  computed: {
    waiting() {
      return this.$store.getters['check/waiting']
    }
  },
  created() {
    store.dispatch('loadData2')
  },
  beforeRouteLeave(to, from, next) {
    store.commit('footer', false)
    next()
  }
}
</script>

<style></style>
