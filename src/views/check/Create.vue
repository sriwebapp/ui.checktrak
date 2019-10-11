<template>
  <div>
    <v-dialog v-model="show" persistent max-width="550">
      <v-card>
        <form
          @submit.prevent="create"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-text>
            <v-layout row wrap class="px-5">
              <v-flex xs12>
                <v-select
                  v-model="check.account_id"
                  :error-messages="error.get('account_id')"
                  name="account_id"
                  label="Account"
                  prepend-icon="mdi-bank"
                  :items="accounts"
                  item-text="number"
                  item-value="id"
                ></v-select>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="date2"
                  :error-messages="error.get('date')"
                  name="date"
                  label="Date Posted"
                  prepend-icon="mdi-calendar"
                  @blur="formatDate(date2)"
                  @dblclick="showCalendar = true"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="check.check_number"
                  :error-messages="error.get('check_number')"
                  name="check_number"
                  label="Check Number"
                  prepend-icon="mdi-tag-text-outline"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-autocomplete
                  label="Payee Code"
                  v-model="payee"
                  name="payee_id"
                  :items="payees"
                  :search-input.sync="searchPayeeCode"
                  item-text="code"
                  item-value="id"
                  prepend-icon="mdi-account-cash-outline"
                  return-object
                  autocomplete="off"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs8 class="pl-1">
                <v-autocomplete
                  label="Payee Name"
                  v-model="payee"
                  :error-messages="error.get('payee_id')"
                  :items="payees"
                  :search-input.sync="searchPayeeName"
                  :loading="gettingPayee"
                  item-text="name"
                  item-value="id"
                  return-object
                  clearable
                  autocomplete="off"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="check.details"
                  :error-messages="error.get('details')"
                  name="details"
                  label="Details"
                  prepend-icon="mdi-clipboard-list-outline"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="check.amount"
                  :error-messages="error.get('amount')"
                  name="amount"
                  label="Amount"
                  prepend-icon="mdi-currency-php"
                  @blur="formatAmount"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              small
              color="indigo white--text"
              :loading="creating"
              :disabled="gettingPayee"
            >
              Create
            </v-btn>
            <v-btn
              color="deep-orange"
              small
              outlined
              @click="show = false"
              :disabled="creating || gettingPayee"
            >
              Return
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon
              small
              @click="showImport"
              :disabled="!importable || creating || gettingPayee"
            >
              <v-icon color="indigo">mdi-file-upload-outline</v-icon>
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
    accounts() {
      return this.$store.getters['tools/accounts'].map(account => {
        return {
          id: account.id,
          number: account.code + ' ' + account.number
        }
      })
    },
    check: {
      get() {
        return this.$store.getters['check/newCheck']
      },
      set(arg) {
        this.$store.commit('check/newCheck', arg)
      }
    },
    creating() {
      return this.$store.getters['check/creating']
    },
    error() {
      return this.$store.getters.error
    },
    payees() {
      return this.$store.getters['tools/payees']
    },
    show: {
      get() {
        return this.$store.getters['check/showCreate']
      },
      set(arg) {
        this.$store.commit('check/showCreate', arg)
      }
    },
    importable() {
      return this.$store.getters['auth/user'].actionAccess.includes('imt')
    }
  },
  created() {
    this.searchPayees = this._.debounce(this.getPayees, 500)
  },
  data: () => ({
    date: null,
    date2: null,
    gettingPayee: false,
    payee: {},
    searchPayeeCode: '',
    searchPayeeName: '',
    showCalendar: false
  }),
  methods: {
    create() {
      this.formatAmount()
      this.formatDate(this.date2)
      this.check.payee_id = this.payee ? this.payee.id : ''
      this.$store.dispatch('check/create', this.check)
    },
    formatAmount() {
      this.check.amount = Helper.formatCurrency(this.check.amount)
    },
    formatDate(date) {
      this.date = Helper.formatDate(date, 'Y-MM-DD')
      this.check.date = Helper.formatDate(date, 'Y-MM-DD')
      this.date2 = Helper.formatDate(date, 'MM/DD/Y')
    },
    async getPayees(search) {
      this.gettingPayee = true
      await this.$store.dispatch('tools/getPayees', { search })
      this.gettingPayee = false
    },
    showImport() {
      this.show = false
      this.$store.commit('check/showImportCreate', true)
    }
  },
  watch: {
    searchPayeeCode(arg) {
      this.searchPayees(arg)
    },
    searchPayeeName(arg) {
      this.searchPayees(arg)
    },
    show(arg) {
      if (arg) {
        this.check = {}
        this.payee = {}
        this.error.reset()
        this.formatDate(Date())
      }
    },
    date(arg) {
      this.formatDate(arg)
    }
  }
}
</script>

<style></style>
