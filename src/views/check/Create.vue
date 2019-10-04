<template>
  <div>
    <v-dialog v-model="show" persistent max-width="600">
      <v-card>
        <form
          @submit.prevent="create"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-title>Create Check</v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
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

                <v-flex xs12>
                  <v-text-field
                    :value="payee.name"
                    :error-messages="error.get('payee_id')"
                    name="payee_id"
                    label="Payee"
                    prepend-icon="mdi-account-cash-outline"
                    @click="showPayees"
                    readonly
                  ></v-text-field>
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
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" color="indigo white--text" :loading="creating">
              Create
            </v-btn>
            <v-btn
              color="deep-orange"
              outlined
              @click="show = false"
              :disabled="creating"
            >
              Return
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon large @click="showImport" :disabled="!importable">
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
    payee: {
      get() {
        return this.$store.getters['check/payee']
      },
      set(arg) {
        this.$store.commit('check/payee', arg)
      }
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
  data: () => ({
    date: null,
    date2: null,
    showCalendar: false
  }),
  methods: {
    create() {
      this.formatAmount()
      this.formatDate(this.date2)
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
    showPayees() {
      this.$store.commit('check/showPayees', true)
    },
    showImport() {
      this.show = false
      this.$store.commit('check/showImportCreate', true)
    }
  },
  watch: {
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
