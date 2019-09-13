<template>
  <v-dialog v-model="show" persistent max-width="600">
    <v-card>
      <v-card-title>CheckTrak</v-card-title>
      <v-card-text>
        <v-container>
          <p class="headline">
            <v-icon color="teal">mdi-frequently-asked-questions</v-icon>
            Clear Selected Checks?
          </p>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="teal white--text" @click="clear" :loading="clearing">
          Clear
        </v-btn>
        <v-btn
          color="deep-orange"
          outlined
          @click="show = false"
          :disabled="clearing"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    clearing() {
      return this.$store.getters['check/clearing']
    },
    checks() {
      return this.$store.getters['check/selectedChecks']
    },
    show: {
      get() {
        return this.$store.getters['check/showClear']
      },
      set(arg) {
        this.$store.commit('check/showClear', arg)
      }
    }
  },
  methods: {
    clear() {
      this.$store.dispatch('check/clear', {
        checks: this.checks.map(check => check.id)
      })
    }
  }
}
</script>

<style></style>
