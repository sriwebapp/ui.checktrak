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
      return this.$store.getters['group/waiting']
    }
  },
  async created() {
    this.$store.commit('loader', true)
    this.$store.commit('group/waiting', true)
    this.$store.commit('group/groups', [])
    try {
      await this.$store.dispatch('tools/getBranches')
    } catch (error) {
      return
    } finally {
      this.$store.commit('loader', false)
      this.$store.commit('group/waiting', false)
    }
  }
}
</script>

<style></style>
