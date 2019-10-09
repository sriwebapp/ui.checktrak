<template>
  <v-bottom-sheet v-model="show" inset>
    <v-sheet class="pt-3">
      <v-container>
        <v-layout row wrap>
          <v-flex xs6 class="px-5">
            <v-flex xs12>
              <v-select
                v-model="filter"
                label="Select Filter"
                prepend-icon="mdi-filter-variant"
                :items="filters"
                dense
              ></v-select>
            </v-flex>

            <v-flex xs12>
              <v-btn small class="mr-2" color="primary" @click="startFilter">
                Apply
              </v-btn>

              <v-btn small color="error" @click="clear">Clear</v-btn>
            </v-flex>
          </v-flex>

          <v-flex xs6 class="px-5">
            <v-flex xs12 v-if="filter === 'account'">
              <v-select
                v-model="account"
                label="Account"
                prepend-icon="mdi-bank"
                :items="accounts"
                item-text="number"
                item-value="id"
                dense
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete></v-autocomplete>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
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
    show: {
      get() {
        return this.$store.getters.filter
      },
      set(arg) {
        this.$store.commit('filter', arg)
      }
    }
  },
  data: () => ({
    account: 0,
    filters: [
      { value: 'account', text: 'Bank Account' },
      { value: 'payee_id', text: 'Payee' },
      { value: 'transmittal_id', text: 'Transmittal Reference' }
    ],
    filter: ''
  }),
  methods: {
    clear() {
      this.filter = ''
    },
    startFilter() {
      if (this.filter === 'account') {
        this.$store.commit('check/filter', 'Account: ')
      }
    }
  },
  watch: {
    filter(arg) {
      if (arg) {
        if (arg === 'account') {
          this.$store.dispatch('tools/getAccounts')
        }
        this.account = 0
      }
    }
  }
}
</script>

<style></style>
