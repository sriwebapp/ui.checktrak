<template>
  <v-container v-if="!waiting">
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  computed: {
    waiting() {
      return this.$store.getters['branch/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('branch/waiting', true)
    setTimeout(() => {
      this.$store.commit('loader', false)
      this.$store.commit('branch/waiting', false)
    }, 500)
  }
}
</script>

<style></style>
