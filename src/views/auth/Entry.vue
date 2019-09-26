<template>
  <v-app>
    <alert />
    <v-overlay color="brown lighten-4" z-index="0"> </v-overlay>
    <v-content class="background">
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 md8 lg6 xl4>
            <router-view> </router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {
    alert: () => import('./../../components/Alert.vue')
  },
  mounted() {
    this.$store.dispatch('tools/getCompanies')
  }
}
</script>

<style>
/* .background {
  background: url('./../../assets/brz.jpg') no-repeat center;
  background-size: cover;
} */
</style>
