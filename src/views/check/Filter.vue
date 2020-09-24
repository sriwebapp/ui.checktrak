<template>
  <v-container fluid class="pb-0 ct-check-filter">
    <v-layout class="mb-4 ct-check-filter-title">
      <v-flex class="col-sm-12">
        <span v-if="!title.forChecks" style="font-size: 17.5px">
          {{ title.text }}
        </span>
        <div
          v-if="title.forChecks"
          style="font-size: 17.5px"
          class="justify-space-between d-flex"
        >
          <span> Checks: {{ title.checks }}</span>
          <span class="right-align"> Amount: {{ title.amount }} </span>
        </div>
      </v-flex>
    </v-layout>

    <v-layout v-if="filter.includes(1)">
      <v-flex xs6 md4>
        <v-select
          v-model="account"
          label="Select Account"
          :items="accounts"
          item-text="number"
          item-value="id"
          prepend-icon="mdi-bank"
          autocomplete="off"
          return-object
          clearable
          dense
          outlined
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout v-if="filter.includes(2)">
      <v-flex xs2>
        <v-autocomplete
          label="Payee Code"
          v-model="payee"
          :search-input.sync="searchPayeeCode"
          :items="payees"
          item-text="code"
          item-value="id"
          return-object
          autocomplete="off"
          prepend-icon="mdi-account-cash-outline"
          outlined
          dense
        ></v-autocomplete>
      </v-flex>

      <v-flex xs3>
        <v-autocomplete
          label="Payee Name"
          v-model="payee"
          :search-input.sync="searchPayeeName"
          :items="payees"
          item-text="name"
          item-value="id"
          prepend-icon="mdi-account-cash-outline"
          return-object
          clearable
          autocomplete="off"
          outlined
          dense
        ></v-autocomplete>
      </v-flex>
    </v-layout>

    <v-layout v-if="filter.includes(3)">
      <v-flex xs6 md4>
        <v-autocomplete
          label="Select Transmittal"
          v-model="transmittal"
          :search-input.sync="searchTransmittalRef"
          :items="transmittals"
          item-text="ref"
          item-value="id"
          prepend-icon="mdi-bank-transfer-out"
          return-object
          autocomplete="off"
          outlined
          clearable
          dense
        ></v-autocomplete>
      </v-flex>
    </v-layout>

    <v-layout v-if="filter.includes(4)">
      <v-flex xs3 md2>
        <v-text-field
          :value="formatDate(dateFrom)"
          label="From Date"
          autocomplete="off"
          @click="showCalendarFrom = true"
          prepend-icon="mdi-calendar"
          readonly
          outlined
          dense
        ></v-text-field>
      </v-flex>

      <v-flex xs3 md2>
        <v-text-field
          :value="formatDate(dateTo)"
          label="To Date"
          autocomplete="off"
          @click="showCalendarTo = true"
          prepend-icon="mdi-calendar"
          readonly
          outlined
          dense
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout v-if="filter.includes(5)">
      <v-flex xs3 md2>
        <v-text-field
          v-model="numberFrom"
          label="From #"
          prepend-icon="mdi-tag-text-outline"
          autocomplete="off"
          outlined
          dense
        ></v-text-field>
      </v-flex>

      <v-flex xs3 md2>
        <v-text-field
          v-model="numberTo"
          prepend-icon="mdi-tag-text-outline"
          label="To #"
          autocomplete="off"
          outlined
          dense
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout v-if="filter.includes(6)">
      <v-flex xs6 md4>
        <v-text-field
          v-model="searchDetail"
          label="Search Details"
          prepend-icon="mdi-clipboard-list-outline"
          autocomplete="off"
          outlined
          dense
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout class="mb-1 mt-n3" v-if="filter.includes(7)">
      <v-flex xs1 v-for="stat in status" :key="stat.id">
        <v-checkbox
          :value="stat.id"
          :color="stat.color"
          v-model="statuses"
          hide-details
        >
          <template v-slot:label>
            <span class="ml-n2" style="font-size: 11px">{{ stat.name }}</span>
          </template>
        </v-checkbox>
      </v-flex>

      <v-flex xs1>
        <v-switch color="red" hide-details v-model="received">
          <template v-slot:label>
            <span class="ml-n1" style="font-size: 11px">Received</span>
          </template>
        </v-switch>
      </v-flex>
    </v-layout>

    <v-dialog v-model="showCalendarFrom" width="290px" persistent>
      <v-date-picker
        no-title
        v-model="dateFrom"
        @change="showCalendarFrom = false"
        :max="dateTo"
      ></v-date-picker>
    </v-dialog>

    <v-dialog v-model="showCalendarTo" width="290px" persistent>
      <v-date-picker
        no-title
        v-model="dateTo"
        @change="showCalendarTo = false"
        :min="dateFrom"
      ></v-date-picker>
    </v-dialog>
  </v-container>
</template>

<script>
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
    title() {
      return this.selecting
        ? {
            forChecks: 1,
            checks: this.selectedChecks.length,
            amount: this.amount
          }
        : { forChecks: 0, text: 'Check Masterlist ' }
    },
    selecting() {
      return this.$store.getters['check/selecting']
    },
    selectedChecks() {
      return this.$store.getters['check/selectedChecks']
    },
    content: {
      get() {
        return this.$store.getters['check/filterContent']
      },
      set(arg) {
        this.$store.commit('check/filterContent', arg)
      }
    },
    filter() {
      return this.$store.getters['check/filter']
    },
    accounts() {
      return this.$store.getters['tools/accounts'].map(account => {
        return {
          id: account.id,
          number: account.code + ' ' + account.number
        }
      })
    },
    payees() {
      return this.$store.getters['tools/payees']
    },
    status() {
      return this.$store.getters['tools/status']
    },
    transmittals() {
      return this.$store.getters['tools/allTransmittals']
    }
  },
  created() {
    this.searchPayees = this._.debounce(this.getPayees, 500)
    this.searchTransmittals = this._.debounce(this.getTransmittals, 500)
  },
  data: () => ({
    account: null,
    payee: null,
    searchPayeeCode: '',
    searchPayeeName: '',
    transmittal: null,
    searchTransmittalRef: '',
    dateFrom: '',
    dateTo: '',
    showCalendarFrom: false,
    showCalendarTo: false,
    numberFrom: '',
    numberTo: '',
    searchDetail: '',
    statuses: [],
    received: true
  }),
  methods: {
    formatDate(date) {
      if (!Date.parse(date)) return

      return moment(date).format('MMM DD, Y')
    },
    resetContent() {
      this.content = Object.assign({}, this.content)
    },
    async getPayees(search) {
      await this.$store.dispatch('tools/getPayees', { search })
    },
    async getTransmittals(search) {
      await this.$store.dispatch('tools/getTransmittals', { search })
    }
  },
  watch: {
    filter(changed, old) {
      if (!changed.length) this.content = {}

      let added = changed.filter(x => !old.includes(x))
      let removed = old.filter(x => !changed.includes(x))

      if (removed.length) {
        switch (removed[0]) {
          case 1:
            delete this.content.account_id
            break
          case 2:
            delete this.content.payee_id
            break
          case 3:
            delete this.content.transmittal_id
            break
          case 4:
            delete this.content.date
            break
          case 5:
            delete this.content.number
            break
          case 6:
            delete this.content.detail
            break
          case 7: {
            delete this.content.status
            break
          }
          default:
            break
        }
      }

      if (added.length) {
        switch (added[0]) {
          case 1:
            this.account = null
            this.content.account_id = null
            break
          case 2:
            this.payee = null
            this.content.payee_id = null
            break
          case 3:
            this.transmittal = null
            this.content.transmittal_id = null
            break
          case 4:
            this.dateFrom = ''
            this.dateTo = ''
            this.content.date = null
            break
          case 5:
            this.numberFrom = ''
            this.numberTo = ''
            this.content.number = null
            break
          case 6:
            this.searchDetail = ''
            this.content.detail = null
            break
          case 7: {
            this.statuses = this.status.map(s => s.id)
            this.received = true
            this.content.status = null
            break
          }
          default:
            break
        }
      }

      this.resetContent()
    },
    searchTransmittalRef(arg) {
      this.searchTransmittals(arg)
    },
    searchPayeeCode(arg) {
      this.searchPayees(arg)
    },
    searchPayeeName(arg) {
      this.searchPayees(arg)
    },
    account(arg) {
      this.content.account_id = arg ? arg.id : ''

      this.resetContent()
    },
    payee(arg) {
      this.content.payee_id = arg ? arg.id : ''

      this.resetContent()
    },
    transmittal(arg) {
      this.content.transmittal_id = arg ? arg.id : ''

      this.resetContent()
    },
    dateFrom(arg) {
      if (!arg || !this.dateTo) return

      this.content.date = { from: arg, to: this.dateTo }

      this.resetContent()
    },
    dateTo(arg) {
      if (!arg || !this.dateFrom) return

      this.content.date = { from: this.dateFrom, to: arg }

      this.resetContent()
    },
    numberFrom(arg) {
      if (!arg || !this.numberTo) return

      this.content.number = { from: arg, to: this.numberTo }

      this.resetContent()
    },
    numberTo(arg) {
      if (!arg || !this.numberFrom) return

      this.content.number = { from: this.numberFrom, to: arg }

      this.resetContent()
    },
    searchDetail(arg) {
      this.content.detail = arg

      this.resetContent()
    },
    statuses(arg) {
      this.content.status = { statuses: arg, received: this.received }

      this.resetContent()
    },
    received(arg) {
      this.content.status = { statuses: this.statuses, received: arg }

      this.resetContent()
    }
  }
}
</script>

<style scoped></style>
