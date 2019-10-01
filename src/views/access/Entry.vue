<template>
  <v-container v-if="!waiting">
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  computed: {
    waiting() {
      return this.$store.getters['access/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('access/waiting', true)
    try {
      await this.$store.dispatch('tools/getActions')
      await this.$store.dispatch('tools/getGroups')
      await this.$store.dispatch('tools/getModules')
    } catch (error) {
      return
    } finally {
      this.$store.commit('loader', false)
      this.$store.commit('access/waiting', false)
    }
  }
}
</script>

<style></style>
