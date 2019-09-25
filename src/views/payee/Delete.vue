<template>
  <v-dialog persistent v-model="show" width="400px">
    <v-card>
      <v-card-title>You are going to delete this payee</v-card-title>
      <v-card-text>Do you want to continue? </v-card-text>
      <v-card-actions>
        <v-btn outlined color="indigo" @click="deletePayee" :loading="loading">
          Continue
        </v-btn>
        <v-btn
          color="deep-orange"
          outlined
          @click="show = false"
          :disabled="loading"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters['payee/loading']
    },
    show: {
      get() {
        return this.$store.getters['payee/showDelete']
      },
      set(arg) {
        this.$store.commit('payee/showDelete', arg)
      }
    }
  },
  methods: {
    deletePayee() {
      this.$store.dispatch('payee/delete', this.$route.params.id)
    }
  }
}
</script>

<style></style>
