<template>
  <v-container fluid class="pb-0" style="padding-right: 70px">
    <v-layout v-if="filter === 0" class="mb-5">
      <v-flex xs6 md8>
        <span class="title"> {{ title }} </span>
      </v-flex>
    </v-layout>

    <v-layout justify-end v-if="filter === 1" class="mb-n4">
      <v-flex xs6 md8>
        <span class="title"> {{ title }} </span>
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

    <v-layout justify-end v-if="filter === 2" class="mb-n4">
      <v-flex xs6>
        <span class="title"> {{ title }} </span>
      </v-flex>

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
          outlined
          dense
        ></v-autocomplete>
      </v-flex>

      <v-flex xs4 class="pl-2">
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

    <v-layout justify-end v-if="filter === 3" class="mb-n4">
      <v-flex xs6 md8>
        <span class="title"> {{ title }} </span>
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

    <v-layout justify-end v-if="filter === 4" class="mb-n4">
      <v-flex xs6 md8>
        <span class="title"> {{ title }} </span>
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

    <v-layout justify-end v-if="filter === 5" class="mb-n4">
      <v-flex xs6 md8>
        <span class="title"> {{ title }} </span>
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

    <v-layout justify-end v-if="filter === 6" class="mb-n4">
      <v-flex xs6 md8>
        <span class="title"> {{ title }} </span>
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

    <v-layout justify-end class=" mb-5 mt-n3" v-if="filter === 7">
      <v-flex xs4 class="mt-3">
        <span class="title"> {{ title }} </span>
      </v-flex>

      <v-flex xs1 v-for="stat in status" :key="stat.id">
        <v-checkbox
          :value="stat.id"
          :color="stat.color"
          v-model="statuses"
          hide-details
        >
          <template v-slot:label>
            <span class="body-2 ml-n1">{{ stat.name }}</span>
          </template>
        </v-checkbox>
      </v-flex>

      <v-flex xs1>
        <v-switch color="red" hide-details v-model="received">
          <template v-slot:label>
            <span class="body-2 ml-n1">Received</span>
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
    title() {
      return this.selectedChecks.length
        ? 'Selected Checks: ' + this.selectedChecks.length
        : 'Check Masterlist '
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
    async getPayees(search) {
      await this.$store.dispatch('tools/getPayees', { search })
    },
    async getTransmittals(search) {
      await this.$store.dispatch('tools/getTransmittals', { search })
    }
  },
  watch: {
    filter(arg) {
      switch (arg) {
        case 1:
          this.account = null
          break
        case 2:
          this.payee = null
          break
        case 3:
          this.transmittal = null
          break
        case 4:
          this.dateFrom = ''
          this.dateTo = ''
          break
        case 5:
          this.numberFrom = ''
          this.numberTo = ''
          break
        case 6:
          this.searchDetail = ''
          break
        case 7: {
          this.statuses = this.status.map(s => s.id)
          this.received = true
          break
        }
        default:
          break
      }
      this.content = null
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

      this.content = { column: 'account_id', id: arg.id }
    },
    payee(arg) {
      if (!arg) return

      this.content = { column: 'payee_id', id: arg.id }
    },
    transmittal(arg) {
      if (!arg) return

      this.content = { id: arg.id }
    },
    dateFrom(arg) {
      if (!arg || !this.dateTo) return

      this.content = { column: 'date', from: arg, to: this.dateTo }
    },
    dateTo(arg) {
      if (!arg || !this.dateFrom) return

      this.content = { column: 'date', from: this.dateFrom, to: arg }
    },
    numberFrom(arg) {
      if (!arg || !this.numberTo) return

      this.content = { column: 'number', from: arg, to: this.numberTo }
    },
    numberTo(arg) {
      if (!arg || !this.numberFrom) return

      this.content = { column: 'number', from: this.numberFrom, to: arg }
    },
    searchDetail(arg) {
      this.content = { searchDetail: arg }
    },
    statuses(arg) {
      this.content = { statuses: arg, received: this.received }
    },
    received(arg) {
      this.content = { statuses: this.statuses, received: arg }
    }
  }
}
</script>

<style></style>
