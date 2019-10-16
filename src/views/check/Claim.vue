<template>
  <div>
    <v-dialog v-model="show" persistent max-width="500">
      <v-card>
        <form
          @submit.prevent="claim"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-text>
            <v-layout row wrap class="px-5">
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
                  :label="
                    transactToday ? 'Remarks' : 'Reason for delay on update'
                  "
                  prepend-icon="mdi-clipboard-list-outline"
                  :required="!transactToday"
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
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              small
              color="purple white--text"
              :loading="claiming"
            >
              Claim
            </v-btn>
            <v-btn
              color="deep-orange"
              small
              outlined
              @click="show = false"
              :disabled="claiming"
            >
              Close
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showCalendar" width="290px">
      <v-date-picker
        no-title
        v-model="date"
        :max="today"
        @change="showCalendar = false"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import Helper from './../../helper/Helper'
import moment from 'moment'

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
    claiming() {
      return this.$store.getters['check/claiming']
    },
    checks() {
      return this.$store.getters['check/selectedChecks']
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showClaim']
      },
      set(arg) {
        this.$store.commit('check/showClaim', arg)
      }
    },
    transactToday() {
      return this.today <= this.date
    }
  },
  data: () => ({
    date: null,
    date2: null,
    remarks: '',
    showCalendar: false,
    today: moment().format('Y-MM-DD')
  }),
  methods: {
    claim() {
      this.formatDate(this.date2)
      this.$store.dispatch('check/claim', {
        date: this.date,
        remarks: this.remarks,
        checks: this.checks.map(check => check.id)
      })
    },
    formatDate(date) {
      this.date = Helper.formatDate(date, 'Y-MM-DD')
      this.date2 = Helper.formatDate(date, 'MM/DD/Y')
      this.remarks = this.transactToday ? 'Claimed' : ''
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.formatDate(Date())
        this.error.reset()
        this.remarks = 'Claimed'
      }
    },
    date(arg) {
      this.formatDate(arg)
    }
  }
}
</script>

<style></style>
