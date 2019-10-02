<template>
  <v-container v-if="!waiting">
    <router-view></router-view>
    <delete-form></delete-form>
  </v-container>
</template>

<script>
export default {
  components: {
    deleteForm: () => import('./Delete.vue')
  },
  computed: {
    waiting() {
      return this.$store.getters['account/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('account/waiting', true)
    this.$store.commit('account/accounts', [])
    setTimeout(() => {
      this.$store.commit('loader', false)
      this.$store.commit('account/waiting', false)
    }, 500)
  }
}
</script>

<style></style>
