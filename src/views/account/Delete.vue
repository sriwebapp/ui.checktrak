<template>
  <v-dialog persistent v-model="show" width="400px">
    <v-card>
      <v-card-title>You are going to delete this account</v-card-title>
      <v-card-text>Do you want to continue? </v-card-text>
      <v-card-actions>
        <v-btn
          outlined
          small
          color="indigo"
          @click="deleteAccount"
          :loading="loading"
        >
          Continue
        </v-btn>
        <v-btn
          color="deep-orange"
          small
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
      return this.$store.getters['account/loading']
    },
    show: {
      get() {
        return this.$store.getters['account/showDelete']
      },
      set(arg) {
        this.$store.commit('account/showDelete', arg)
      }
    }
  },
  methods: {
    deleteAccount() {
      this.$store.dispatch('account/delete', this.$route.params.id)
    }
  }
}
</script>

<style></style>
