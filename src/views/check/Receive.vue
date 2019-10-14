<template>
  <div>
    <v-dialog v-model="show" persistent max-width="1000">
      <v-card>
        <form
          @submit.prevent="receiveChecks"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4 class="px-4">
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

              <v-flex xs4 class="px-4">
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

              <v-flex xs4 class="px-4">
                <v-text-field
                  v-model="remarks"
                  :error-messages="error.get('remarks')"
                  name="remarks"
                  label="Remarks"
                  prepend-icon="mdi-clipboard-list-outline"
                ></v-text-field>
              </v-flex>

              <v-flex xs6 class="px-5">
                <v-text-field
                  :value="receivableChecks.length + '/' + checks.length"
                  label="No of Checks to be Received"
                  prepend-icon="mdi-checkbook"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs6 class="px-5">
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
              :items="checks"
              :loading="loading"
              :footer-props="{ itemsPerPageOptions: [10] }"
              dense
            >
              <template v-if="checks.length" v-slot:body="{ items }">
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
      const total = this.receivableChecks.reduce((total, check) => {
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
      { text: 'Check #', align: 'left', value: 'number' },
      { text: 'Payee Name', align: 'left', value: 'payee_id' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Claimed', align: 'left', value: 'claimed' }
    ],
    loading: false,
    remarks: '',
    showCalendar: false,
    transmittal_id: null
  }),
  methods: {
    receiveChecks() {
      this.formatDate(this.date2)
      this.$store.dispatch('check/receive', {
        date: this.date,
        remarks: this.remarks,
        transmittal_id: this.transmittal_id
      })
    },
    formatDate(date) {
      this.date = Helper.formatDate(date, 'Y-MM-DD')
      this.date2 = Helper.formatDate(date, 'MM/DD/Y')
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
        this.transmittal_id = null
        this.remarks = ''
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
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    date(arg) {
      this.formatDate(arg)
    }
  }
}
</script>

<style></style>
