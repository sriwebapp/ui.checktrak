<template>
  <v-container v-if="!waiting">
    <router-view></router-view>
    <cancel-form />
    <claim-form />
    <clear-form />
    <create-form />
    <delete-form />
    <edit-form />
    <receive-form />
    <return-form />
    <transmit-form />
    <show-check />
  </v-container>
</template>

<script>
import store from './../../store/store'
export default {
  components: {
    cancelForm: () => import('./Cancel.vue'),
    claimForm: () => import('./Claim.vue'),
    clearForm: () => import('./Clear.vue'),
    createForm: () => import('./Create.vue'),
    deleteForm: () => import('./Delete.vue'),
    editForm: () => import('./Edit.vue'),
    receiveForm: () => import('./Receive.vue'),
    returnForm: () => import('./Return.vue'),
    transmitForm: () => import('./Transmit.vue'),
    showCheck: () => import('./Show.vue')
  },
  computed: {
    waiting() {
      return this.$store.getters['check/waiting']
    }
  },
  mounted() {
    store.dispatch('loadData2')
  },
  beforeRouteEnter(to, from, next) {
    store.commit('footer', true)
    next()
  },
  beforeRouteLeave(to, from, next) {
    store.commit('footer', false)
    next()
  }
}
</script>

<style></style>
