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
        <v-btn small outlined :disabled="loading" @click="showSuccessImports">
          View
        </v-btn>
      </v-layout>
    </v-alert>

    <v-alert v-model="showFailed" border="left" type="error" dismissible>
      <v-layout>
        {{ failedMessage }}
        <v-spacer></v-spacer>
        <v-btn small outlined :disabled="loading" @click="showFailedImports">
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
      return this.$store.getters['payee/loading']
    },
    import() {
      return this.$store.getters['payee/import']
    },
    successMessage() {
      return this.$store.getters['payee/successMessage']
    },
    failedMessage() {
      return this.$store.getters['payee/failedMessage']
    },
    showSuccess: {
      get() {
        return this.$store.getters['payee/showSuccessMessage']
      },
      set(arg) {
        this.$store.commit('payee/showSuccessMessage', arg)
      }
    },
    showFailed: {
      get() {
        return this.$store.getters['payee/showFailedMessage']
      },
      set(arg) {
        this.$store.commit('payee/showFailedMessage', arg)
      }
    }
  },
  methods: {
    showSuccessImports() {
      this.$store.commit('payee/successImports', this.import.successPayees)
      this.$store.commit('payee/showSuccessCreate', true)
      this.showSuccess = false
    },
    showFailedImports() {
      this.$store.commit('payee/failedImports', this.import.failedPayees)
      this.$store.commit('payee/showFailedCreate', true)
      this.showFailed = false
    }
  }
}
</script>

<style></style>
