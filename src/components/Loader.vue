<template>
  <v-overlay :value="show" color="black">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    show() {
      return this.$store.getters.loader
    }
  }
}
</script>

<style></style>
