<template>
  <v-container v-if="!waiting">
    <message></message>
    <router-view></router-view>
    <delete-form></delete-form>
    <import-create></import-create>
    <success-create></success-create>
    <failed-create></failed-create>
  </v-container>
</template>

<script>
export default {
  components: {
    deleteForm: () => import('./Delete.vue'),
    importCreate: () => import('./ImportCreate.vue'),
    message: () => import('./Message.vue'),
    successCreate: () => import('./SuccessCreate.vue'),
    failedCreate: () => import('./FailedCreate.vue')
  },
  computed: {
    waiting() {
      return this.$store.getters['payee/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('payee/waiting', true)
    this.$store.commit('payee/payees', [])
    try {
      await this.$store.dispatch('tools/getPayeeGroup')
      this.$store.commit('loader', false)
      this.$store.commit('payee/waiting', false)
    } catch (error) {
      return
    }
  }
}
</script>

<style></style>
