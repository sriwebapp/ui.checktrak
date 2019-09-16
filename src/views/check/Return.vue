<template>
  <v-dialog v-model="show" persistent max-width="800">
    <v-card>
      <form
        @submit.prevent="returnChecks"
        @keydown="error.clear($event.target.name)"
      >
        <v-card-title>Return Checks </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex>
                <v-select
                  v-model="transmittal_id"
                  :error-messages="error.get('transmittal_id')"
                  name="transmittal_id"
                  label="Select Transmittal"
                  prepend-icon="mdi-bank"
                  :items="transmittals"
                  item-text="ref"
                  item-value="id"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-data-table :headers="headers" :items="checks"></v-data-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" color="teal white--text" :loading="returning">
            Return
          </v-btn>
          <v-btn
            color="deep-orange"
            outlined
            @click="show = false"
            :disabled="returning"
          >
            Close
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error
    },
    returning() {
      return this.$store.getters['check/returning']
    },
    show: {
      get() {
        return this.$store.getters['check/showReturn']
      },
      set(arg) {
        this.$store.commit('check/showReturn', arg)
      }
    },
    transmittals() {
      return this.$store.getters['check/transmittals']
    }
  },
  data: () => ({
    checks: [],
    headers: [
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Amount', align: 'left', value: 'amount' }
    ],
    transmittal_id: null
  }),
  methods: {
    returnChecks() {
      this.$store.dispatch('check/returnChecks', {
        transmittal_id: this.transmittal_id
      })
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.transmittal_id = null
        this.checks = []
      }
    },
    transmittal_id(arg) {
      if (arg) {
        const transmittal = this.transmittals.find(
          transmittal => transmittal.id === arg
        )

        this.checks = transmittal.checks.filter(check => check.status_id === 2)
      }
    }
  }
}
</script>

<style></style>
