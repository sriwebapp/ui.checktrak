<template>
  <v-app>
    <alert />
    <drawer />
    <navbar />
    <loader />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {
    alert: () => import('./../components/Alert.vue'),
    drawer: () => import('./../components/Drawer.vue'),
    loader: () => import('./../components/Loader.vue'),
    navbar: () => import('./../components/Navbar.vue')
  },
  mounted() {
    // this.$store.commit('auth/logging', true)
  }
}
</script>
