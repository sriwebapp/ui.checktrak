<template>
  <v-card>
    <v-card-title>
      Check Masterlist
      <v-spacer></v-spacer>
      <v-btn icon @click="showFilter">
        <v-icon color="indigo">mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="checks"
        :loading="loading"
        :options.sync="pagination"
        :footer-props="{ itemsPerPageOptions: [10, 50, 100] }"
        :server-items-length="totalItems"
        show-select
      >
        <template v-slot:item.account_id="{ item }">
          {{ item.account.code }}
        </template>
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
        <template v-slot:item.status_id="{ item }">
          <v-chip
            small
            :text-color="item.received ? 'white' : 'black'"
            :outlined="!item.received"
            :class="item.status.color"
          >
            {{ item.status.name }}
          </v-chip>
        </template>
        <template v-slot:item.action_date="{ item }">
          {{ getLastUpdate(item.history) }}
        </template>
        <template v-slot:item.details="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                {{ item.details ? truncate(item.details, 20) : '' }}
              </span>
            </template>
            <span>{{ item.details }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    checks() {
      return this.$store.getters['check/checks'].data
    },
    loading() {
      return this.$store.getters['check/loading']
    },
    selected: {
      get() {
        return this.$store.getters['check/selectedChecks']
      },
      set(arg) {
        this.$store.commit('check/selectedChecks', arg)
      }
    },
    pagination: {
      get() {
        return this.$store.getters['check/pagination']
      },
      set(arg) {
        this.$store.commit('check/pagination', arg)
      }
    },
    totalItems() {
      return this.$store.getters['check/checks'].total
    }
  },
  data: () => ({
    headers: [
      { text: 'Account', align: 'left', value: 'account_id' },
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Payee', align: 'left', value: 'payee_id' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Details', align: 'left', value: 'details' },
      {
        text: 'Last Update',
        align: 'left',
        value: 'action_date',
        sortable: false
      },
      { text: 'Status', align: 'center', value: 'status_id' }
    ]
  }),
  methods: {
    getLastUpdate(history) {
      if (!history.length) {
        return
      }
      return history[history.length - 1].date
    },
    showFilter() {
      this.$store.commit('filter', true)
    },
    truncate(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num - 3) + '...'
    }
  },
  mounted() {
    this.pagination = {
      groupBy: [],
      groupDesc: [],
      itemsPerPage: 10,
      multiSort: false,
      mustSort: false,
      page: 1,
      sortBy: [],
      sortDesc: []
    }
  },
  watch: {
    pagination: {
      deep: true,
      handler(arg) {
        this.$store.dispatch('check/getChecks', arg)
      }
    }
  }
}
</script>

<style></style>
