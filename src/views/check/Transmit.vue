<template>
  <div>
    <v-dialog v-model="show" persistent max-width="600">
      <v-card>
        <form
          @submit.prevent="transmit"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-title>Transmit Checks</v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    :value="ref"
                    :error-messages="error.get('ref')"
                    name="ref"
                    label="Transmittal Reference"
                    prepend-icon="mdi-barcode-scan"
                    :loading="loading"
                    placeholder=" "
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-select
                    v-model="branch_id"
                    :error-messages="error.get('branch_id')"
                    name="branch_id"
                    label="Branch"
                    prepend-icon="mdi-map-marker"
                    :items="branches"
                    item-text="name"
                    item-value="id"
                  ></v-select>
                </v-flex>

                <v-flex xs12>
                  <v-select
                    v-model="incharge"
                    :error-messages="error.get('incharge')"
                    name="incharge"
                    label="Incharge"
                    prepend-icon="mdi-account"
                    :items="users"
                    item-text="name"
                    item-value="id"
                  ></v-select>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    v-model="date"
                    :error-messages="error.get('date')"
                    name="date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    @click="showCalendar = true"
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    :value="checks.length"
                    label="No of Checks"
                    prepend-icon="mdi-checkbook"
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    :value="amount"
                    label="Total Amount"
                    prepend-icon="mdi-currency-php"
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-btn
              type="submit"
              color="blue white--text"
              :loading="transmitting"
              :disabled="loading"
            >
              Transmit
            </v-btn>
            <v-btn
              color="deep-orange"
              outlined
              @click="show = false"
              :disabled="transmitting || loading"
            >
              Return
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showCalendar" width="290px">
      <v-date-picker no-title v-model="date" @change="showCalendar = false">
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    amount() {
      return this.checks
        .reduce((total, check) => {
          return total + parseFloat(check.amount)
        }, 0)
        .toFixed(2)
    },
    branches() {
      return this.$store.getters['tools/branches']
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showTransmit']
      },
      set(arg) {
        this.$store.commit('check/showTransmit', arg)
      }
    },
    checks() {
      return this.$store.getters['check/selectedChecks']
    },
    transmitting() {
      return this.$store.getters['check/transmitting']
    },
    users() {
      return this.$store.getters['tools/users']
    }
  },
  data: () => ({
    branch_id: 0,
    date: new Date().toISOString().substr(0, 10),
    incharge: 0,
    loading: false,
    ref: '',
    showCalendar: false
  }),
  methods: {
    transmit() {
      this.$store.dispatch('check/transmit', {
        branch_id: this.branch_id,
        date: this.date,
        ref: this.ref,
        incharge: this.incharge,
        checks: this.checks.map(check => check.id)
      })
    }
  },
  watch: {
    branch_id(arg) {
      if (arg) {
        this.loading = true
        this.$store
          .dispatch('tools/getSeries', this.branch_id)
          .then(res => {
            this.ref = res.data.ref
            this.incharge = res.data.incharge
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    show(arg) {
      if (arg) {
        this.branch_id = 0
        this.date = new Date().toISOString().substr(0, 10)
        this.incharge = 0
        this.ref = ''
      }
    }
  }
}
</script>

<style></style>
