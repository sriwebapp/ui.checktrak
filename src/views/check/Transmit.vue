<template>
  <div>
    <v-dialog v-model="show" persistent max-width="1200">
      <v-card :loading="transmitting">
        <form
          @submit.prevent="transmit"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-text>
            <v-layout row wrap class="px-5">
              <v-flex xs3 pr-2>
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

              <v-flex xs3 px-2>
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

              <v-flex xs3 px-2>
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

              <v-flex xs3 pl-2>
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

              <v-flex xs3 pr-2>
                <v-switch
                  inset
                  color="indigo"
                  hide-details
                  label="Select Checks"
                  v-model="selectChecks"
                  :disabled="!checks.length"
                >
                </v-switch>
              </v-flex>

              <v-flex xs3 px-2>
                <v-text-field
                  :value="ref"
                  :error-messages="error.get('ref')"
                  name="ref"
                  label="Transmittal Reference"
                  prepend-icon="mdi-barcode-scan"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs3 px-2>
                <v-text-field
                  :value="selectedChecks.length"
                  label="No of Checks"
                  prepend-icon="mdi-checkbook"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs3 pl-2>
                <v-text-field
                  :value="amount"
                  label="Total Amount"
                  prepend-icon="mdi-currency-php"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-data-table
              :headers="headers"
              :items="checks"
              :footer-props="{ itemsPerPageOptions: [10] }"
              :show-select="selectChecks"
              v-model="selectedChecks"
              :options.sync="pagination"
              dense
            >
              <template v-slot:item.payee_id="{ item }">
                {{ item.payee.name }}
              </template>
              <template v-slot:item.amount="{ item }">
                {{
                  Number(item.amount).toLocaleString('en', {
                    style: 'currency',
                    currency: 'Php'
                  })
                }}
              </template>

              <template
                v-if="checks.length && !selectChecks"
                v-slot:body="{ items }"
              >
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="item.id"
                    :class="
                      item.status.color + ' lighten-' + (item.received ? 5 : 4)
                    "
                  >
                    <td>{{ item.number }}</td>
                    <td>{{ item.payee.name }}</td>
                    <td>
                      {{
                        Number(item.amount).toLocaleString('en', {
                          style: 'currency',
                          currency: 'Php'
                        })
                      }}
                    </td>
                    <td>{{ item.details }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
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
      const total = this.selectedChecks.reduce((total, check) => {
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
    appChecks() {
      return this.$store.getters['check/selectedChecks']
    },
    transmitting() {
      return this.$store.getters['check/transmitting']
    }
  },
  data: () => ({
    branch_id: 0,
    checks: [],
    date: null,
    date2: null,
    headers: [
      { text: 'Check #', align: 'left', value: 'number' },
      { text: 'Payee Name', align: 'left', value: 'payee_id' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Details', align: 'left', value: 'details' }
    ],
    group_id: 0,
    groups: [],
    incharge: 0,
    gettingRef: false,
    gettingGroup: false,
    gettingIncharge: false,
    pagination: {},
    ref: '',
    series: '',
    selectChecks: false,
    selectedChecks: [],
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
        checks: this.selectedChecks.map(check => check.id)
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
        this.group_id = 0
        this.incharge = 0
        this.pagination = { page: 1 }
        this.ref = ''
        this.checks = this.appChecks
        this.selectedChecks = this.appChecks
        this.selectChecks = false
      }
    },
    selectChecks() {
      this.selectedChecks = this.checks
    },
    selectedChecks() {
      this.$store.commit('check/selectedChecks', this.selectedChecks)
    },
    date(arg) {
      this.formatDate(arg)
    }
  }
}
</script>

<style></style>
