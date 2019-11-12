<template>
  <v-dialog v-model="show" persistent max-width="500">
    <v-card>
      <div>
        <v-card-title>Some checks exceeded 180 days period</v-card-title>
        <v-card-text>Do you want to view checks? </v-card-text>
        <v-card-actions>
          <v-btn
            outlined
            small
            color="indigo"
            :loading="loading"
            @click="showStale"
          >
            View
          </v-btn>
          <v-btn
            color="deep-orange"
            small
            outlined
            :disabled="loading"
            @click="show = false"
          >
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
  data: () => ({
    loading: false
  }),
  methods: {
    async showStale() {
      this.loading = true
      await this.$store.dispatch('tools/getStaledChecks')
      this.loading = false
      if (this.$route.name !== 'checks') this.$router.push({ name: 'checks' })
      this.show = false
      this.$store.commit('check/showStale', true)
    }
  }
}
</script>

<style></style>
