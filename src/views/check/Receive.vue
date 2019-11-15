<template>
  <div>
    <v-dialog v-model="show" persistent max-width="1000">
      <v-card :loading="receiving">
        <form
          @submit.prevent="receiveChecks"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4 class="px-5">
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
                  label="Remarks"
                  prepend-icon="mdi-clipboard-list-outline"
                ></v-text-field>
              </v-flex>

              <v-flex xs4 class="px-5">
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

              <v-flex xs4>
                <v-text-field
                  :value="selectedChecks.length + '/' + receivableChecks.length"
                  label="No of Checks to be Received"
                  prepend-icon="mdi-checkbook"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs4 class="px-5">
                <v-text-field
                  :value="amount"
                  label="Total Amount to be Received"
                  prepend-icon="mdi-currency-php"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table
              :headers="headers"
              :items="selectChecks ? receivableChecks : checks"
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
                    :class="
                      item.status.color + ' lighten-' + (item.received ? 5 : 4)
                    "
                  >
                    <td>{{ item.number }}</td>
                    <td>{{ item.payee.name }}</td>
                    <td class="text-right">
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
              color="green white--text"
              :loading="receiving"
              :disabled="loading"
            >
              Receive
            </v-btn>
            <v-btn
              color="deep-orange"
              small
              outlined
              @click="show = false"
              :disabled="receiving || loading"
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
    error() {
      return this.$store.getters.error
    },
    receiving() {
      return this.$store.getters['check/receiving']
    },
    receivableChecks() {
      return this.checks.filter(check => check.received === 0)
    },
    show: {
      get() {
        return this.$store.getters['check/showReceive']
      },
      set(arg) {
        this.$store.commit('check/showReceive', arg)
      }
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
      { text: 'Check #', align: 'left', value: 'number', width: '20%' },
      { text: 'Payee Name', align: 'left', value: 'payee_id', width: '40%' },
      { text: 'Amount', align: 'right', value: 'amount', width: '20%' },
      { text: 'Claimed', align: 'left', value: 'status_id', width: '20%' }
    ],
    loading: false,
    remarks: '',
    showCalendar: false,
    transmittal_id: null,
    selectChecks: false,
    selectedChecks: [],
    today: moment().format('Y-MM-DD'),
    pagination: {}
  }),
  methods: {
    receiveChecks() {
      this.formatDate(this.date2)
      this.$store.dispatch('check/receive', {
        date: this.date,
        remarks: this.remarks,
        transmittal_id: this.transmittal_id,
        selectChecks: this.selectChecks,
        selectedChecks: this.selectedChecks.map(i => i.id)
      })
    },
    formatDate(date) {
      this.date = Helper.formatDate(date, 'Y-MM-DD')
      this.date2 = Helper.formatDate(date, 'MM/DD/Y')
    },
    showClaimedDate(history) {
      let claimed = history.find(h => h.action_id === 4 && h.active === 1)
      if (!claimed) return
      return moment(new Date(claimed.date)).format('MM/DD/Y')
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.transmittal_id = null
        this.remarks = 'Received complete'
        this.selectChecks = false
        this.selectedChecks = []
        this.pagination = { page: 1 }
        this.checks = []
        this.formatDate(Date())
      }
    },
    transmittal_id(arg) {
      if (arg) {
        this.loading = true
        this.$store
          .dispatch('tools/getChecks', arg)
          .then(res => {
            this.checks = res.data
            this.selectedChecks = this.receivableChecks
            this.pagination = { page: 1 }
            this.selectChecks = false
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    selectChecks() {
      this.pagination = { page: 1 }
      this.selectedChecks = this.receivableChecks
    },
    date(arg) {
      this.formatDate(arg)
    }
  }
}
</script>

<style></style>
