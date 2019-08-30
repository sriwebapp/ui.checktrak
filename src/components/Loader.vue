<template>
  <v-overlay :value="logging" color="black">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    logging() {
      return this.$store.getters['auth/logging']
    }
  }
}
</script>

<style></style>
