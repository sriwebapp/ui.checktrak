<template>
  <div>
    <v-dialog v-model="show" persistent max-width="1000">
      <v-card>
        <form
          @submit.prevent="returnChecks"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4 class="px-5">
                <v-select
                  v-model="transmittal"
                  :error-messages="error.get('transmittal_id')"
                  name="transmittal_id"
                  label="Select Transmittal"
                  prepend-icon="mdi-bank"
                  :items="transmittals"
                  item-text="ref"
                  item-value="id"
                  return-object
                ></v-select>
              </v-flex>

              <v-flex xs4>
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

              <v-flex xs4 class="px-5">
                <v-text-field
                  v-model="remarks"
                  :error-messages="error.get('remarks')"
                  name="remarks"
                  :label="
                    !transactLate ? 'Remarks' : 'Reason for delay on update'
                  "
                  prepend-icon="mdi-clipboard-list-outline"
                  :required="transactLate"
                ></v-text-field>
              </v-flex>

              <v-flex xs4 class="px-5">
                <v-switch
                  inset
                  color="indigo"
                  hide-details
                  label="Filter Checks"
                  v-model="selectChecks"
                  :disabled="!checks.length"
                >
                </v-switch>
              </v-flex>

              <v-flex xs4>
                <v-text-field
                  :value="selectedChecks.length + '/' + returnableChecks.length"
                  label="No of Checks to be Returned"
                  prepend-icon="mdi-checkbook"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs4 class="px-5">
                <v-text-field
                  :value="amount"
                  label="Total Amount to be Returned"
                  prepend-icon="mdi-currency-php"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table
              :headers="headers"
              :items="selectChecks ? returnableChecks : checks"
              :loading="loading"
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
              <template v-slot:item.status_id="{ item }">
                {{ showClaimedDate(item.history) }}
              </template>

              <template
                v-if="checks.length && !selectChecks"
                v-slot:body="{ items }"
              >
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="item.id"
                    :class="item.status.color + ' lighten-5'"
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
                    <td>{{ showClaimedDate(item.history) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              small
              color="blue-grey white--text"
              :loading="returning"
              :disabled="loading"
            >
              Return
            </v-btn>
            <v-btn
              color="deep-orange"
              small
              outlined
              @click="show = false"
              :disabled="returning || loading"
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
    error() {
      return this.$store.getters.error
    },
    returning() {
      return this.$store.getters['check/returning']
    },
    returnableChecks() {
      return this.checks.filter(check => check.status_id === 2)
    },
    show: {
      get() {
        return this.$store.getters['check/showReturn']
      },
      set(arg) {
        this.$store.commit('check/showReturn', arg)
      }
    },
    transactLate() {
      if (!this.transmittal || !this.date) return false

      return this.transmittal.due < this.date
    },
    transmittals() {
      return this.$store.getters['tools/transmittals']
    }
  },
  data: () => ({
    checks: [],
    date: null,
    date2: null,
    headers: [
      { text: 'Check #', align: 'left', value: 'number' },
      { text: 'Payee Name', align: 'left', value: 'payee_id' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Claimed', align: 'left', value: 'status_id' }
    ],
    loading: false,
    remarks: '',
    showCalendar: false,
    transmittal: null,
    selectChecks: false,
    selectedChecks: [],
    pagination: {}
  }),
  methods: {
    returnChecks() {
      this.formatDate(this.date2)
      this.$store.dispatch('check/returnChecks', {
        date: this.date,
        remarks: this.remarks,
        transmittal_id: this.transmittal ? this.transmittal.id : null,
        selectChecks: this.selectChecks,
        selectedChecks: this.selectedChecks.map(i => i.id)
      })
    },
    formatDate(date) {
      this.date = Helper.formatDate(date, 'Y-MM-DD')
      this.date2 = Helper.formatDate(date, 'MM/DD/Y')
      this.remarks = !this.transactLate ? 'Claimed' : ''
    },
    showClaimedDate(history) {
      let claimed = history.find(h => h.action_id === 4)
      if (!claimed) return
      return moment(new Date(claimed.date)).format('MM/DD/Y')
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.pagination = { page: 1 }
        this.transmittal = null
        this.remarks = ''
        this.selectChecks = false
        this.checks = []
        this.formatDate(Date())
        this.remarks = 'Returned'
      }
    },
    transmittal(arg) {
      if (arg) {
        this.loading = true
        this.$store
          .dispatch('tools/getChecks', arg.id)
          .then(res => {
            this.checks = res.data
            this.selectedChecks = this.returnableChecks
            this.pagination = { page: 1 }
            this.selectChecks = false
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    selectChecks() {
      this.selectedChecks = this.returnableChecks
      this.pagination = { page: 1 }
    },
    date(arg) {
      this.formatDate(arg)
    }
  }
}
</script>

<style></style>
