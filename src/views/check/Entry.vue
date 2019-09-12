<template>
  <v-container v-if="!waiting">
    <router-view></router-view>
    <create-form />
    <delete-form />
    <edit-form />
    <transmit-form />
    <show-check />
  </v-container>
</template>

<script>
import store from './../../store/store'
export default {
  components: {
    createForm: () => import('./Create.vue'),
    deleteForm: () => import('./Delete.vue'),
    editForm: () => import('./Edit.vue'),
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
