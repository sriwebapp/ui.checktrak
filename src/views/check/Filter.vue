<template>
  <v-container fluid class="pb-0">
    <v-layout v-if="!filter.length" class="mb-5">
      <v-flex xs6 md8>
        <span style="font-size: 17.5px"> {{ title }} </span>
      </v-flex>
    </v-layout>

    <v-layout justify-end v-if="filter.includes(1)" class="mb-n4">
      <v-flex xs6 md8>
        <span style="font-size: 17.5px" v-if="filter[0] === 1">
          {{ title }}
        </span>
      </v-flex>

      <v-flex xs6 md4>
        <v-select
          v-model="account"
          label="Select Account"
          :items="accounts"
          item-text="number"
          item-value="id"
          append-outer-icon="mdi-bank"
          autocomplete="off"
          return-object
          dense
          outlined
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout justify-end v-if="filter.includes(2)" class="mb-n4">
      <v-flex xs6>
        <span style="font-size: 17.5px" v-if="filter[0] === 2">
          {{ title }}
        </span>
      </v-flex>

      <v-flex xs2 class="pr-2">
        <v-autocomplete
          label="Payee Code"
          v-model="payee"
          :search-input.sync="searchPayeeCode"
          :items="payees"
          item-text="code"
          item-value="id"
          return-object
          autocomplete="off"
          outlined
          dense
        ></v-autocomplete>
      </v-flex>

      <v-flex xs4>
        <v-autocomplete
          label="Payee Name"
          v-model="payee"
          :search-input.sync="searchPayeeName"
          :items="payees"
          item-text="name"
          item-value="id"
          return-object
          clearable
          append-outer-icon="mdi-account-cash-outline"
          autocomplete="off"
          outlined
          dense
        ></v-autocomplete>
      </v-flex>
    </v-layout>

    <v-layout justify-end v-if="filter.includes(3)" class="mb-n4">
      <v-flex xs6 md8>
        <span style="font-size: 17.5px" v-if="filter[0] === 3">
          {{ title }}
        </span>
      </v-flex>

      <v-flex xs6 md4>
        <v-autocomplete
          label="Select Transmittal"
          v-model="transmittal"
          :search-input.sync="searchTransmittalRef"
          :items="transmittals"
          item-text="ref"
          item-value="id"
          append-outer-icon="mdi-bank-transfer-out"
          return-object
          autocomplete="off"
          outlined
          dense
        ></v-autocomplete>
      </v-flex>
    </v-layout>

    <v-layout justify-end v-if="filter.includes(4)" class="mb-n4">
      <v-flex xs6 md8>
        <span style="font-size: 17.5px" v-if="filter[0] === 4">
          {{ title }}
        </span>
      </v-flex>

      <v-flex xs3 md2>
        <v-text-field
          :value="formatDate(dateFrom)"
          label="From Date"
          autocomplete="off"
          @click="showCalendarFrom = true"
          readonly
          outlined
          dense
        ></v-text-field>
      </v-flex>

      <v-flex xs3 md2 class="pl-2">
        <v-text-field
          :value="formatDate(dateTo)"
          label="To Date"
          autocomplete="off"
          @click="showCalendarTo = true"
          append-outer-icon="mdi-calendar"
          outlined
          dense
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout justify-end v-if="filter.includes(5)" class="mb-n4">
      <v-flex xs6 md8>
        <span style="font-size: 17.5px" v-if="filter[0] === 5">
          {{ title }}
        </span>
      </v-flex>

      <v-flex xs3 md2>
        <v-text-field
          v-model="numberFrom"
          label="From #"
          autocomplete="off"
          outlined
          dense
        ></v-text-field>
      </v-flex>

      <v-flex xs3 md2 class="pl-2">
        <v-text-field
          v-model="numberTo"
          label="To #"
          autocomplete="off"
          append-outer-icon="mdi-tag-text-outline"
          outlined
          dense
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout justify-end v-if="filter.includes(6)" class="mb-n4">
      <v-flex xs6 md8>
        <span style="font-size: 17.5px" v-if="filter[0] === 6">
          {{ title }}
        </span>
      </v-flex>

      <v-flex xs6 md4>
        <v-text-field
          v-model="searchDetail"
          label="Search Details"
          append-outer-icon="mdi-clipboard-list-outline"
          autocomplete="off"
          outlined
          dense
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout justify-end class="mb-5 mt-n3" v-if="filter.includes(7)">
      <v-flex xs4 class="mt-3">
        <span style="font-size: 17.5px" v-if="filter[0] === 7">
          {{ title }}
        </span>
      </v-flex>

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
      >
      </v-date-picker>
    </v-dialog>

    <v-dialog v-model="showCalendarTo" width="290px" persistent>
      <v-date-picker
        no-title
        v-model="dateTo"
        @change="showCalendarTo = false"
        :min="dateFrom"
      >
      </v-date-picker>
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
        ? 'Checks: ' + this.selectedChecks.length + ', ' + this.amount
        : 'Check Masterlist '
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
      if (!arg) return

      this.content.account_id = arg.id

      this.resetContent()
    },
    payee(arg) {
      if (!arg) return

      this.content.payee_id = arg.id

      this.resetContent()
    },
    transmittal(arg) {
      if (!arg) return

      this.content.transmittal_id = arg.id

      this.resetContent()
    },
    dateFrom(arg) {
      if (!arg || !this.dateTo) return

      this.content.date = { from: arg, to: this.dateTo }
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

<style></style>
