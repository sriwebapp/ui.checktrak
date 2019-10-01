<template>
  <v-container v-if="!waiting">
    <router-view></router-view>
    <delete-form></delete-form>
  </v-container>
</template>

<script>
export default {
  components: {
    deleteForm: () => import('./Delete.vue')
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
    } catch (error) {
      return
    } finally {
      this.$store.commit('loader', false)
      this.$store.commit('payee/waiting', false)
    }
  }
}
</script>

<style></style>
