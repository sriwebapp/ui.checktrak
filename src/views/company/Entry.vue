<template>
  <v-container v-if="!waiting">
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  computed: {
    waiting() {
      return this.$store.getters['company/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('company/waiting', true)
    this.$store.commit('company/companies', [])
    setTimeout(() => {
      this.$store.commit('loader', false)
      this.$store.commit('company/waiting', false)
    }, 500)
  }
}
</script>

<style></style>
