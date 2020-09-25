<template>
  <v-row justify="center">
    <v-card width="800" outlined :loading="loading">
      <v-card-title>
        <span style="font-size: 17.5px">
          Masterlist Report
        </span>

        <v-spacer></v-spacer>
        <v-btn
          class="deep-orange white--text"
          small
          :loading="loading"
          router
          :to="{ name: 'reports' }"
        >
          Return
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-card outlined class="mb-1 mt-n3">
          <v-card-text>
            <v-row class="mt-n2 mb-n6">
              <v-col cols="12" xs="12">
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
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card outlined class="mb-1">
          <v-card-text>
            <v-row class="mt-n2 mb-n6">
              <v-col cols="12" sm="6" xs="12">
                <v-text-field
                  v-model="numberFrom"
                  label="From #"
                  prepend-icon="mdi-tag-text-outline"
                  autocomplete="off"
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" xs="12">
                <v-text-field
                  v-model="numberTo"
                  prepend-icon="mdi-tag-text-outline"
                  label="To #"
                  autocomplete="off"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card outlined class="mb-1">
          <v-card-text>
            <v-row class="mt-n2 mb-n6">
              <v-col cols="12" sm="6" xs="12">
                <v-text-field
                  :value="formatDate(dateFrom)"
                  label="From Date"
                  autocomplete="off"
                  @click="showCalendarFrom = true"
                  prepend-icon="mdi-calendar"
                  readonly
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" xs="12">
                <v-text-field
                  :value="formatDate(dateTo)"
                  label="To Date"
                  autocomplete="off"
                  @click="showCalendarTo = true"
                  prepend-icon="mdi-calendar"
                  readonly
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card outlined class="mb-1">
          <v-card-text>
            <v-row class="mt-n2 mb-n6">
              <v-col cols="12" xs="12">
                <v-select
                  v-model="branch"
                  label="Select Branch"
                  :items="branches"
                  item-text="name"
                  item-value="id"
                  prepend-icon="mdi-bank"
                  autocomplete="off"
                  return-object
                  clearable
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card outlined class="mb-1">
          <v-card-text>
            <v-row class="mt-n2 mb-n6">
              <v-col cols="12" xs="12">
                <v-autocomplete
                  v-model="group"
                  label="Select Group"
                  :items="groups"
                  item-text="name"
                  item-value="id"
                  prepend-icon="mdi-bank"
                  autocomplete="off"
                  return-object
                  clearable
                  dense
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card outlined class="mb-1">
          <v-card-text>
            <v-row class="mt-n2 mb-n6">
              <v-col cols="12" xs="12">
                <v-autocomplete
                  v-model="incharge"
                  label="Select Incharge"
                  :items="users"
                  item-text="name"
                  item-value="id"
                  prepend-icon="mdi-bank"
                  autocomplete="off"
                  return-object
                  clearable
                  dense
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card outlined class="mb-1">
          <v-card-text>
            <v-row class="mt-n2 mb-n6">
              <v-col cols="12" xs="12">
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
                  clearable
                  dense
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card outlined class="mb-1">
          <v-card-text>
            <v-row class="mt-n2 mb-n6">
              <v-col cols="12" sm="6" xs="12">
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
                  dense
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="6" xs="12">
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
                  dense
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card outlined class="mb-n3">
          <v-card-text>
            <v-layout class="mb-1 mt-n3" wrap v-if="status.length">
              <v-flex md3 sm6 xs12 v-for="stat in status" :key="stat.id">
                <v-checkbox
                  :value="stat.id"
                  :color="stat.color"
                  v-model="statuses"
                  hide-details
                >
                  <template v-slot:label>
                    <span class="ml-n2" style="font-size: 11px">{{
                      stat.name
                    }}</span>
                  </template>
                </v-checkbox>
              </v-flex>
            </v-layout>

            <v-layout class="mb-1 mt-n3" wrap v-else>
              <v-flex md3 sm6 xs12 v-for="n in 8" :key="n">
                <v-checkbox hide-details>
                  <template v-slot:label>
                    <span class="ml-n2" style="font-size: 11px"> </span>
                  </template>
                </v-checkbox>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-row class="my-n3" v-if="!batch">
          <v-col cols="12" sm="6" md="4">
            <v-btn
              block
              class="orange white--text"
              :loading="loading"
              @click="inquire"
            >
              Inquire
            </v-btn>
          </v-col>
        </v-row>

        <v-row v-if="batch" no-gutters>
          <v-col v-for="n in batch" :key="n" xs="6" sm="4" md="3" class="pa-1">
            <form :action="exportLink" method="post">
              <input type="hidden" name="filter" :value="filters" />
              <input type="hidden" name="user" :value="user.id" />
              <input type="hidden" name="batch" :value="n" />
              <v-btn
                block
                :class="success.includes(n) ? '' : 'white--text'"
                color="purple"
                type="submit"
                @click="download(n)"
                :loading="loadings.includes(n)"
                :outlined="success.includes(n)"
              >
                {{ makeLabel(n) }}
              </v-btn>
            </form>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="showCalendarFrom" width="290px">
      <v-date-picker
        no-title
        v-model="dateFrom"
        @change="showCalendarFrom = false"
        :max="dateTo"
      ></v-date-picker>
    </v-dialog>

    <v-dialog v-model="showCalendarTo" width="290px">
      <v-date-picker
        no-title
        v-model="dateTo"
        @change="showCalendarTo = false"
        :min="dateFrom"
      ></v-date-picker>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from 'moment'

export default {
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    company() {
      return this.$store.getters['tools/company']
    },
    exportLink() {
      return (
        process.env.VUE_APP_API + '/' + this.company.code + '/report/masterlist'
      )
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
    transmittals() {
      return this.$store.getters['tools/allTransmittals']
    },
    status() {
      return this.$store.getters['tools/status']
    },
    branches() {
      return this.$store.getters['tools/branches']
    },
    groups() {
      return this.$store.getters['tools/groups']
    },
    users() {
      return this.$store.getters['tools/users']
    }
  },
  data: () => ({
    loading: false,
    content: {},
    account: null,
    branch: null,
    group: null,
    incharge: null,
    payee: null,
    transmittal: null,
    dateFrom: '',
    dateTo: '',
    searchPayeeCode: '',
    searchPayeeName: '',
    searchTransmittalRef: '',
    showCalendarFrom: false,
    showCalendarTo: false,
    numberFrom: '',
    numberTo: '',
    statuses: [],
    filters: '{}',
    checks: 0,
    limit: 0,
    batch: 0,
    loadings: [],
    success: []
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
    },
    resetContent() {
      this.content = Object.assign({}, this.content)

      this.batch = 0
      this.loadings = []
      this.success = []
    },
    async inquire() {
      this.loading = true
      try {
        const res = await this.$store.dispatch('report/countMasterlist', {
          filter: this.content
        })

        this.filters = JSON.stringify(this.content)

        this.checks = res.checks
        this.limit = res.limit

        this.batch = Math.ceil(res.checks / res.limit)
      } catch {
        return
      } finally {
        this.loading = false
      }
    },
    makeLabel(batch) {
      let start = (batch - 1) * this.limit + 1
      let last =
        batch * this.limit < this.checks ? batch * this.limit : this.checks

      return `${start} - ${last}`
    },
    download(batch) {
      this.loadings.push(batch)
      this.success.push(batch)

      setTimeout(() => {
        this.loadings = this.loadings.filter(n => n !== batch)
      }, 10000)
    }
  },
  created() {
    this.searchPayees = this._.debounce(this.getPayees, 500)
    this.searchTransmittals = this._.debounce(this.getTransmittals, 500)
  },
  async mounted() {
    this.loading = true
    try {
      await this.$store.dispatch('tools/getMasterlistReportTools')
      this.loading = false
      this.statuses = this.status.map(s => s.id)
    } catch {
      return
    }
  },
  watch: {
    searchPayeeCode(arg) {
      this.searchPayees(arg)

      this.resetContent()
    },
    searchPayeeName(arg) {
      this.searchPayees(arg)

      this.resetContent()
    },
    searchTransmittalRef(arg) {
      this.searchTransmittals(arg)

      this.resetContent()
    },
    account(arg) {
      this.content.account_id = arg ? arg.id : ''

      this.resetContent()
    },
    branch(arg) {
      this.content.branch_id = arg ? arg.id : ''

      this.resetContent()
    },
    group(arg) {
      this.content.group_id = arg ? arg.id : ''

      this.resetContent()
    },
    incharge(arg) {
      this.content.incharge_id = arg ? arg.id : ''

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
      this.content.status = { statuses: arg }

      this.resetContent()
    }
  }
}
</script>

<style></style>
