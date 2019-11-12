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
      return this.$store.getters['checkbook/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('checkbook/waiting', true)
    this.$store.commit('checkbook/checkbooks', [])
    try {
      await this.$store.dispatch('tools/getAccounts')
      this.$store.commit('loader', false)
      this.$store.commit('checkbook/waiting', false)
    } catch (error) {
      return
    }
  }
}
</script>

<style></style>
