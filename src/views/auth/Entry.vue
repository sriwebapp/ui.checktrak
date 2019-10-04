<template>
  <v-app>
    <alert />
    <v-overlay color="grey darken-4" opacity="0.6" z-index="0"> </v-overlay>
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
  async mounted() {
    this.$store.commit('auth/loading', true)
    try {
      await this.$store.dispatch('tools/getCompanies', {}, { root: true })
      this.$store.commit('auth/loading', false)
    } catch (error) {
      return
    }
  }
}
</script>

<style>
.background {
  background: url('./../../assets/Fingerprint.jpg') no-repeat center;
  background-size: cover;
}
</style>
