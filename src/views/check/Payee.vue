<template>
  <v-dialog v-model="show" persistent width="600px">
    <v-card>
      <v-card-text>
        <v-layout>
          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="search"
            append-icon="mdi-account-search-outline"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-layout>
      </v-card-text>
      <v-data-table
        v-model="selectedPayees"
        :headers="payeeHeaders"
        :items="payees"
        :options.sync="pagination"
        :server-items-length="totalItems"
        :loading="loading"
        show-select
        single-select
        hide-default-footer
        hide-default-header
      >
      </v-data-table>
      <v-card-actions>
        <v-btn
          outlined
          small
          color="indigo"
          :disabled="!selectedPayees.length"
          @click="acceptPayee"
        >
          Select
        </v-btn>
        <v-btn color="deep-orange" small outlined @click="show = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    payees() {
      return this.$store.getters['tools/payees'].data
    },
    show: {
      get() {
        return this.$store.getters['check/showPayees']
      },
      set(arg) {
        this.$store.commit('check/showPayees', arg)
      }
    },
    totalItems() {
      return this.$store.getters['tools/payees'].total
    }
  },
  data: () => ({
    loading: false,
    payeeHeaders: [
      { text: 'Code', align: 'left', value: 'code' },
      { text: 'Name', align: 'left', value: 'name' }
    ],
    pagination: {},
    selectedPayees: [],
    search: ''
  }),
  created() {
    this.searchPayees = this._.debounce(this.getPayees, 500)
  },
  methods: {
    acceptPayee() {
      this.$store.commit('check/payee', this.selectedPayees[0])
      this.$store.getters['check/newCheck'].payee_id = this.selectedPayees[0].id
      this.show = false
    },
    async getPayees() {
      this.loading = true
      this.selectedPayees = []
      try {
        let options = Object.assign({}, this.pagination)
        options.search = this.search
        await this.$store.dispatch('tools/getPayees', options)
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    pagination: {
      deep: true,
      handler() {
        this.getPayees()
      }
    },
    search() {
      this.searchPayees()
    },
    show(arg) {
      if (arg) {
        this.search = ''
        this.selectedPayees = []
      }
    }
  }
}
</script>

<style></style>
