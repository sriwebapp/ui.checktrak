<template>
  <v-dialog persistent v-model="show" width="400px">
    <v-card>
      <v-card-title>You are going to delete this user</v-card-title>
      <v-card-text>Do you want to continue? </v-card-text>
      <v-card-actions>
        <v-btn outlined color="indigo" @click="deleteUser" :loading="loading">
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
      return this.$store.getters['user/loading']
    },
    show: {
      get() {
        return this.$store.getters['user/showDelete']
      },
      set(arg) {
        this.$store.commit('user/showDelete', arg)
      }
    }
  },
  methods: {
    deleteUser() {
      this.$store.dispatch('user/delete', this.$route.params.id)
    }
  }
}
</script>

<style></style>
