<template>
  <div>
    <v-dialog v-model="show" persistent max-width="600">
      <v-card>
        <v-card-title>Create Check</v-card-title>
        <form @submit.prevent="create">
          <v-card-text>
            <v-container grid-list-md>
              <v-flex xs12>
                <v-text-field
                  v-model="check.check_number"
                  :error-messages="error.get('check_number')"
                  name="check_number"
                  label="Check Number"
                  prepend-icon="mdi-tag-text-outline"
                ></v-text-field>
              </v-flex>

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
                  :value="payee.name"
                  :error-messages="error.get('payee_id')"
                  name="payee_id"
                  label="Payee"
                  prepend-icon="mdi-account-cash-outline"
                  @click="showPayees = true"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="check.amount"
                  :error-messages="error.get('amount')"
                  name="amount"
                  label="Amount"
                  prepend-icon="mdi-currency-php"
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
                  v-model="check.date"
                  :error-messages="error.get('date')"
                  name="date"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  @click="showCalendar = true"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" outlined color="indigo" :loading="creating">
              Save
            </v-btn>
            <v-btn
              color="deep-orange"
              outlined
              @click="show = false"
              :disabled="creating"
            >
              Return
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showCalendar" width="290px">
      <v-date-picker
        no-title
        v-model="check.date"
        @change="showCalendar = false"
      >
      </v-date-picker>
    </v-dialog>

    <v-dialog v-model="showPayees" width="800px">
      <v-card>
        <v-card-title>
          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="payeeSearch"
            append-icon="mdi-account-search-outline"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table
            v-model="selectedPayees"
            :headers="payeeHeaders"
            :items="payees"
            :search="payeeSearch"
            show-select
            single-select
            hide-default-footer
          >
            <template v-slot:item.payee_group_id="{ item }">
              {{ item.group ? item.group.name : '' }}
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn
            outlined
            color="indigo"
            :disabled="!selectedPayees.length"
            @click="acceptPayee"
          >
            Select
          </v-btn>
          <v-btn color="deep-orange" outlined @click="showPayees = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    accounts() {
      return this.$store.getters['tools/accounts'].map(account => {
        return {
          id: account.id,
          number: account.bank + ' ' + account.number
        }
      })
    },
    check() {
      return this.$store.getters['check/newCheck']
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
    }
  },
  data: () => ({
    payeeHeaders: [
      { text: 'Code', align: 'left', value: 'code', sortable: false },
      { text: 'Name', align: 'left', value: 'name', sortable: false },
      { text: 'Group', align: 'left', value: 'payee_group_id', sortable: false }
    ],
    selectedPayees: [],
    payee: {},
    payeeSearch: '',
    showPayees: false,
    showCalendar: false
  }),
  methods: {
    create() {
      this.$store.dispatch('check/create', this.check).then(() => {
        this.payee = {}
      })
    },
    acceptPayee() {
      this.payee = this.selectedPayees[0]
      this.check.payee_id = this.selectedPayees[0].id
      this.showPayees = false
    }
  }
}
</script>

<style></style>
