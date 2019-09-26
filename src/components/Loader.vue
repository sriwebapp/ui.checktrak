<template>
  <v-overlay :value="logging || waiting" color="brown">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    logging() {
      return this.$store.getters['auth/logging']
    },
    waiting() {
      return this.$store.getters['check/waiting']
    }
  }
}
</script>

<style></style>
