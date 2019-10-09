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
      return this.$store.getters['user/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('user/waiting', true)
    this.$store.commit('user/users', [])
    try {
      await this.$store.dispatch('tools/getBranches')
      await this.$store.dispatch('tools/getAccess')
      await this.$store.dispatch('tools/getActions')
      await this.$store.dispatch('tools/getGroups')
      await this.$store.dispatch('tools/getModules')
      this.$store.commit('loader', false)
      this.$store.commit('user/waiting', false)
    } catch (error) {
      return
    }
  }
}
</script>

<style></style>
