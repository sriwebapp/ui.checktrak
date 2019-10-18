<template>
  <v-card>
    <v-card-title>
      <span class="title">
        Payee Management
      </span>
      <v-spacer></v-spacer>
      <v-btn
        class="indigo white--text"
        small
        router
        :to="{ name: 'create-payee' }"
      >
        New Payee
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-layout class="mb-5 mt-n4" justify-end>
        <v-flex xs4>
          <v-text-field
            v-model="search"
            append-icon="mdi-account-search-outline"
            label="Search"
            single-line
            hide-details
            autofocus
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="payees"
        :loading="loading"
        :options.sync="pagination"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
        :server-items-length="totalItems"
      >
        <template v-slot:item.payee_group_id="{ item }">
          {{ item.group ? item.group.name : '' }}
        </template>
        <template v-slot:item.active="{ item }">
          <v-icon small :class="item.active ? 'green--text' : 'red--text'">{{
            item.active
              ? 'mdi-check-circle-outline'
              : 'mdi-close-circle-outline'
          }}</v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            x-small
            class="info"
            router
            :to="{ name: 'edit-payee', params: { id: item.id } }"
            :disabled="loading"
          >
            Update
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters['payee/loading']
    },
    payees() {
      return this.$store.getters['payee/payees'].data
    },
    totalItems() {
      return this.$store.getters['payee/payees'].total
    }
  },
  data: () => ({
    headers: [
      { text: 'Code', align: 'left', value: 'code' },
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Group', align: 'left', value: 'payee_group_id' },
      { text: 'Active', align: 'center', value: 'active' },
      { text: 'Actions', align: 'center', value: 'action', sortable: false }
    ],
    pagination: {},
    search: ''
  }),
  created() {
    this.searchPayees = this._.debounce(this.getPayees, 500)
  },
  methods: {
    getPayees() {
      let options = Object.assign({}, this.pagination)
      options.search = this.search
      this.$store.dispatch('payee/getPayees', options)
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
      handler() {
        this.searchPayees()
      }
    },
    search() {
      this.searchPayees()
    }
  }
}
</script>

<style></style>
