<template>
  <v-snackbar v-model="show" :color="color" top :timeout="6000">
    {{ message }}
    <v-btn icon text small @click="show = false">
      <v-icon>mdi-window-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters.alert.message
    },
    color() {
      return this.$store.getters.alert.color
    },
    show: {
      get() {
        return this.$store.getters.showAlert
      },
      set(arg) {
        this.$store.commit('showAlert', arg)
      }
    }
  }
}
</script>
