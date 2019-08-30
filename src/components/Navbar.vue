<template>
  <v-app-bar app dark clipped-left>
    <v-app-bar-nav-icon @click.stop="drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>CheckTrak</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="deep-orange" text @click="logout">
      Logout
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    drawer() {
      this.$store.commit('drawer', !this.$store.getters.drawer)
    },
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
