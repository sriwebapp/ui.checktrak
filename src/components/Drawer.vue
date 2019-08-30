<template>
  <v-navigation-drawer
    fixed
    dark
    clipped
    app
    v-model="visible"
  ></v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    visible: {
      get() {
        return this.$store.getters.drawer
      },
      set(arg) {
        this.$store.commit('drawer', arg)
      }
    }
  }
}
</script>
