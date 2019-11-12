<template>
  <v-app>
    <alert />
    <avatar />
    <drawer />
    <navbar />
    <loader />
    <v-content v-if="!loading" class="grey lighten-5">
      <router-view></router-view>
    </v-content>
    <control v-if="!loading" />
    <staled-notification v-if="!loading" />
  </v-app>
</template>

<script>
export default {
  components: {
    alert: () => import('./../components/Alert.vue'),
    avatar: () => import('./Avatar.vue'),
    drawer: () => import('./../components/Drawer.vue'),
    loader: () => import('./../components/Loader.vue'),
    navbar: () => import('./../components/Navbar.vue'),
    control: () => import('./../components/Control.vue'),
    staledNotification: () => import('./../components/StaledNotification.vue')
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  created() {
    this.$store.dispatch('loadData')
  }
}
</script>

<style></style>
