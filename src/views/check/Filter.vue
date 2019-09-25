<template>
  <v-bottom-sheet v-model="show">
    <v-sheet class="text-center" height="200px">
      Filter Goes Here...
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  computed: {
    show: {
      get() {
        return this.$store.getters.filter
      },
      set(arg) {
        this.$store.commit('filter', arg)
      }
    }
  }
}
</script>

<style></style>
