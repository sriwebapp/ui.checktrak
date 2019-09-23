<template>
  <div>
    <v-dialog v-model="show" persistent max-width="600">
      <v-card>
        <form
          @submit.prevent="receive"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-title>Receive Checks</v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
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

                <v-flex xs12>
                  <v-text-field
                    v-model="remarks"
                    :error-messages="error.get('remarks')"
                    name="remarks"
                    label="Remarks"
                    prepend-icon="mdi-clipboard-list-outline"
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
            <v-btn type="submit" color="green white--text" :loading="receiving">
              Receive
            </v-btn>
            <v-btn
              color="deep-orange"
              outlined
              @click="show = false"
              :disabled="receiving"
            >
              Close
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
      const total = this.checks.reduce((total, check) => {
        return total + parseFloat(check.amount)
      }, 0)

      return Number(total).toLocaleString('en', {
        style: 'currency',
        currency: 'Php'
      })
    },
    receiving() {
      return this.$store.getters['check/receiving']
    },
    checks() {
      return this.$store.getters['check/selectedChecks']
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showReceive']
      },
      set(arg) {
        this.$store.commit('check/showReceive', arg)
      }
    }
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    remarks: '',
    showCalendar: false
  }),
  methods: {
    receive() {
      this.$store.dispatch('check/receive', {
        date: this.date,
        remarks: this.remarks,
        checks: this.checks.map(check => check.id)
      })
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.date = new Date().toISOString().substr(0, 10)
        this.remarks = ''
      }
    }
  }
}
</script>

<style></style>