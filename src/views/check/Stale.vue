<template>
  <div>
    <v-dialog v-model="show" persistent max-width="1000">
      <v-card>
        <form
          @submit.prevent="stale"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-text>
            <v-layout row wrap class="px-5">
              <v-flex xs6 pr-2>
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

              <v-flex xs6 pl-2>
                <v-text-field
                  v-model="remarks"
                  :error-messages="error.get('remarks')"
                  name="remarks"
                  label="Remarks"
                  prepend-icon="mdi-clipboard-list-outline"
                ></v-text-field>
              </v-flex>

              <v-flex xs4 pr-2>
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

              <v-flex xs4 px-2>
                <v-text-field
                  :value="selectedChecks.length"
                  label="No of Checks"
                  prepend-icon="mdi-checkbook"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs4 pl-2>
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
              :loading="staling"
              :footer-props="{ itemsPerPageOptions: [10] }"
              :show-select="selectChecks"
              v-model="selectedChecks"
              :options.sync="pagination"
              dense
            >
              <template v-slot:item.date="{ item }">
                {{ showDate(item.date) }}
              </template>
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
              <template v-slot:item.status_id="{ item }">
                <v-chip
                  x-small
                  :text-color="item.received ? 'white' : 'black'"
                  :outlined="!item.received"
                  :class="item.status.color"
                >
                  {{ item.status.name }}
                </v-chip>
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
                      item.status.color + ' lighten-' + (item.received ? 5 : 3)
                    "
                  >
                    <td>{{ showDate(item.date) }}</td>
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
                    <td class="text-center">
                      <v-chip
                        x-small
                        :text-color="item.received ? 'white' : 'black'"
                        :outlined="!item.received"
                        :class="item.status.color"
                      >
                        {{ item.status.name }}
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              small
              color="orange white--text"
              :loading="staling"
            >
              Stale
            </v-btn>
            <v-btn
              color="deep-orange"
              small
              outlined
              @click="show = false"
              :disabled="staling"
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
      const total = this.selectedChecks.reduce((total, check) => {
        return total + parseFloat(check.amount)
      }, 0)

      return Number(total).toLocaleString('en', {
        style: 'currency',
        currency: 'Php'
      })
    },
    checks() {
      return this.$store.getters['tools/staledChecks']
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showStale']
      },
      set(arg) {
        this.$store.commit('check/showStale', arg)
      }
    },
    staling() {
      return this.$store.getters['check/staling']
    }
  },
  data: () => ({
    date: null,
    date2: null,
    headers: [
      { text: 'Date', align: 'left', value: 'date' },
      { text: 'Check #', align: 'left', value: 'number' },
      { text: 'Payee Name', align: 'left', value: 'payee_id' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Status', align: 'left', value: 'status_id', align: 'center' }
    ],
    pagination: {},
    remarks: '',
    selectChecks: false,
    selectedChecks: [],
    showCalendar: false,
    today: moment().format('Y-MM-DD')
  }),
  methods: {
    stale() {
      this.formatDate(this.date2)
      this.$store.dispatch('check/stale', {
        date: this.date,
        remarks: this.remarks,
        checks: this.selectedChecks.map(check => check.id)
      })
    },
    formatDate(date) {
      this.date = Helper.formatDate(date, 'Y-MM-DD')
      this.date2 = Helper.formatDate(date, 'MM/DD/Y')
      this.remarks = this.transactToday ? 'Claimed' : ''
    },
    showDate(arg) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format('MM/DD/Y')
      }
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.formatDate(Date())
        this.error.reset()
        this.pagination = { page: 1 }
        this.selectChecks = false
        this.selectedChecks = this.checks
      }
    },
    selectChecks() {
      this.selectedChecks = this.checks
    },
    date(arg) {
      this.formatDate(arg)
    }
  }
}
</script>

<style></style>
