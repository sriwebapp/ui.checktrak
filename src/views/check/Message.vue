<template>
  <div>
    <v-alert
      v-model="showSuccess"
      border="left"
      type="success"
      icon="mdi-check-circle"
      dismissible
    >
      <v-layout>
        {{ successMessage }}
        <v-spacer></v-spacer>
        <v-btn small outlined :disabled="loading" @click="showImportedChecks">
          View
        </v-btn>
      </v-layout>
    </v-alert>

    <v-alert v-model="showFailed" border="left" type="error" dismissible>
      <v-layout>
        {{ failedMessage }}
        <v-spacer></v-spacer>
        <v-btn small outlined :disabled="loading" @click="showFailedChecks">
          View
        </v-btn>
      </v-layout>
    </v-alert>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters['check/loading']
    },
    import() {
      return this.$store.getters['check/import']
    },
    successMessage() {
      return this.$store.getters['check/successMessage']
    },
    failedMessage() {
      return this.$store.getters['check/failedMessage']
    },
    showSuccess: {
      get() {
        return this.$store.getters['check/showSuccessMessage']
      },
      set(arg) {
        this.$store.commit('check/showSuccessMessage', arg)
      }
    },
    showFailed: {
      get() {
        return this.$store.getters['check/showFailedMessage']
      },
      set(arg) {
        this.$store.commit('check/showFailedMessage', arg)
      }
    }
  },
  methods: {
    showImportedChecks() {
      this.$store.commit('check/successChecks', this.import.checks)
      this.$store.commit('check/showSuccess' + this.import.subject, true)
      this.showSuccess = false
    },
    showFailedChecks() {
      this.$store.commit('check/failedChecks', this.import.failedChecks)
      this.$store.commit('check/showFailed' + this.import.subject, true)
      this.showFailed = false
    }
  }
}
</script>

<style></style>
