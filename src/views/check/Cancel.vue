<template>
  <div>
    <v-dialog v-model="show" persistent max-width="1000">
      <v-card :loading="cancelling">
        <form
          @submit.prevent="cancel"
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
                  required
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
                    <td class="text-right">
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
              color="red white--text"
              :loading="cancelling"
            >
              Cancel
            </v-btn>
            <v-btn
              color="deep-orange"
              small
              outlined
              @click="show = false"
              :disabled="cancelling"
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
      const total = this.selectedChecks.reduce((total, check) => {
        return total + parseFloat(check.amount)
      }, 0)

      return Number(total).toLocaleString('en', {
        style: 'currency',
        currency: 'Php'
      })
    },
    cancelling() {
      return this.$store.getters['check/cancelling']
    },
    appChecks() {
      return this.$store.getters['check/selectedChecks']
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showCancel']
      },
      set(arg) {
        this.$store.commit('check/showCancel', arg)
      }
    }
  },
  data: () => ({
    checks: [],
    date: null,
    date2: null,
    headers: [
      { text: 'Check #', align: 'left', value: 'number', width: '15%' },
      { text: 'Payee Name', align: 'left', value: 'payee_id', width: '35%' },
      { text: 'Amount', align: 'right', value: 'amount', width: '15%' },
      { text: 'Details', align: 'left', value: 'details', width: '35%' }
    ],
    pagination: {},
    remarks: '',
    selectChecks: false,
    selectedChecks: [],
    showCalendar: false
  }),
  methods: {
    cancel() {
      this.formatDate(this.date2)
      this.$store.dispatch('check/cancel', {
        date: this.date,
        remarks: this.remarks,
        checks: this.selectedChecks.map(check => check.id)
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
        this.pagination = { page: 1 }
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
