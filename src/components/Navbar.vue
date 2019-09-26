<template>
  <v-app-bar app dark clipped-left color="brown darken-4">
    <v-app-bar-nav-icon @click.stop="drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <span>CheckTrak </span>
      <span class="grey--text">{{ company.code }}</span>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    company() {
      return this.$store.getters['tools/company']
    }
  },
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
