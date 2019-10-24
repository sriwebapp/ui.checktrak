<template>
  <v-dialog v-model="show" persistent max-width="500">
    <v-card>
      <div>
        <v-card-title>Some checks exceeded 80 days period</v-card-title>
        <v-card-text>Do you want to view checks? </v-card-text>
        <v-card-actions>
          <v-btn outlined small color="indigo" @click="showStale">
            View
          </v-btn>
          <v-btn color="deep-orange" small outlined @click="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    show: {
      get() {
        return this.$store.getters.staledNotification
      },
      set(arg) {
        this.$store.commit('staledNotification', arg)
      }
    }
  },
  methods: {
    showStale() {
      if (this.$route.name !== 'checks') this.$router.push({ name: 'checks' })
      this.show = false
      this.$store.commit('check/showStale', true)
    }
  }
}
</script>

<style></style>
