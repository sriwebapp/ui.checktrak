<template>
  <v-app>
    <alert />
    <drawer />
    <navbar />
    <loader />
    <v-content v-if="!loading" class="brown lighten-4">
      <router-view></router-view>
    </v-content>
    <control v-if="!loading" />
  </v-app>
</template>

<script>
export default {
  components: {
    alert: () => import('./../components/Alert.vue'),
    drawer: () => import('./../components/Drawer.vue'),
    loader: () => import('./../components/Loader.vue'),
    navbar: () => import('./../components/Navbar.vue'),
    control: () => import('./../components/Control.vue')
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  mounted() {
    this.$store.dispatch('loadData')
  }
}
</script>
