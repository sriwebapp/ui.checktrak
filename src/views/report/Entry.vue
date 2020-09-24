<template>
  <v-container>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  async created() {
    this.$store.commit('loader', true)
    setTimeout(() => {
      this.$store.commit('loader', false)
    }, 500)
  }
}
</script>

<style></style>
