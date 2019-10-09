<template>
  <div>
    <v-dialog v-model="show" persistent max-width="500">
      <v-card>
        <form
          @submit.prevent="transmit"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-text>
            <v-layout row wrap class="px-5">
              <v-flex xs12>
                <v-text-field
                  :value="ref"
                  :error-messages="error.get('ref')"
                  name="ref"
                  label="Transmittal Reference"
                  prepend-icon="mdi-barcode-scan"
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
                  prepend-icon="mdi-source-branch"
                  :loading="gettingGroup"
                  :items="branches"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-flex>

              <v-flex xs12>
                <v-select
                  v-model="group_id"
                  :error-messages="error.get('group_id')"
                  name="group_id"
                  label="Group"
                  prepend-icon="mdi-account-group"
                  :disabled="gettingGroup"
                  :loading="gettingIncharge"
                  :items="groups"
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
                  :disabled="gettingIncharge"
                  :items="users"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-flex>

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
              color="blue white--text"
              :loading="transmitting"
              :disabled="gettingGroup || gettingIncharge"
            >
              Transmit
            </v-btn>
            <v-btn
              color="deep-orange"
              small
              outlined
              @click="show = false"
              :disabled="transmitting || gettingGroup || gettingIncharge"
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
    }
  },
  data: () => ({
    branch_id: 0,
    date: null,
    date2: null,
    group_id: 0,
    groups: [],
    incharge: 0,
    gettingRef: false,
    gettingGroup: false,
    gettingIncharge: false,
    ref: '',
    series: '',
    showCalendar: false,
    users: []
  }),
  methods: {
    transmit() {
      this.formatDate(this.date2)
      this.$store.dispatch('check/transmit', {
        group_id: this.group_id,
        date: this.date,
        ref: this.ref,
        series: this.series,
        incharge: this.incharge,
        checks: this.checks.map(check => check.id)
      })
    },
    formatDate(date) {
      this.date = Helper.formatDate(date, 'Y-MM-DD')
      this.date2 = Helper.formatDate(date, 'MM/DD/Y')
    }
  },
  watch: {
    branch_id(arg) {
      if (arg) {
        this.gettingRef = true
        this.gettingGroup = true
        this.group_id = 0
        this.incharge = 0
        this.groups = []
        this.$store
          .dispatch('tools/getTransmittalRef', this.branch_id)
          .then(res => {
            this.series = res.data.series
            this.ref = res.data.ref
            this.groups = res.data.groups
          })
          .finally(() => {
            this.gettingRef = false
            this.gettingGroup = false
          })
      }
    },
    group_id(arg) {
      if (arg) {
        this.gettingIncharge = true
        this.incharge = 0
        this.users = []
        this.$store
          .dispatch('tools/getGroupIncharge', arg)
          .then(res => (this.users = res.data))
          .finally(() => (this.gettingIncharge = false))
      }
    },
    show(arg) {
      if (arg) {
        this.formatDate(Date())
        this.error.reset()
        this.branch_id = 0
        this.incharge = 0
        this.ref = ''
      }
    },
    date(arg) {
      this.formatDate(arg)
    }
  }
}
</script>

<style></style>
