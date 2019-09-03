<template>
  <v-app>
    <alert />
    <navbar />
    <loader />
    <v-content v-if="!logging">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {
    alert: () => import('./../components/Alert.vue'),
    // drawer: () => import('./../components/Drawer.vue'),
    loader: () => import('./../components/Loader.vue'),
    navbar: () => import('./../components/Navbar.vue')
  },
  computed: {
    logging() {
      return this.$store.getters['auth/logging']
    }
  },
  mounted() {
    this.$store.dispatch('loadData')
  }
}
</script>
