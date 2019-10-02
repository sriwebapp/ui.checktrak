<template>
  <v-container v-if="!waiting">
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  computed: {
    waiting() {
      return this.$store.getters['transmittal/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('transmittal/waiting', true)
    this.$store.commit('transmittal/transmittals', [])
    setTimeout(() => {
      this.$store.commit('loader', false)
      this.$store.commit('transmittal/waiting', false)
    }, 500)
  }
}
</script>

<style></style>
