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
                    v-model="date2"
                    :error-messages="error.get('date')"
                    name="date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    @blur="formatDate(date2)"
                    @dblclick="showCalendar = true"
                    required
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
import Helper from './../../helper/Helper'

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
    date: null,
    date2: null,
    remarks: '',
    showCalendar: false
  }),
  methods: {
    receive() {
      this.formatDate(this.date2)
      this.$store.dispatch('check/receive', {
        date: this.date,
        remarks: this.remarks,
        checks: this.checks.map(check => check.id)
      })
    },
    formatDate(date) {
      this.date = Helper.formatDate(date, 'Y-MM-DD')
      this.date2 = Helper.formatDate(date, 'MM/DD/Y')
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.formatDate(Date())
        this.error.reset()
        this.remarks = ''
      }
    },
    date(arg) {
      this.formatDate(arg)
    }
  }
}
</script>

<style></style>
