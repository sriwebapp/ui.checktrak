<template>
  <v-dialog v-model="show" persistent max-width="1600">
    <v-card>
      <div>
        <v-card-title>
          <span class="title">
            Failed Checks
          </span>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = false" small>
            <v-icon color="error">mdi-close-box</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="checks"
            :footer-props="{ itemsPerPageOptions: [10] }"
            :loading="loading"
            :options.sync="pagination"
          >
          </v-data-table>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    checks() {
      return this.$store.getters['check/failedChecks']
    },
    loading() {
      return this.$store.getters['check/loading']
    },
    show: {
      get() {
        return this.$store.getters['check/showFailedCreate']
      },
      set(arg) {
        this.$store.commit('check/showFailedCreate', arg)
      }
    }
  },
  data: () => ({
    headers: [
      { text: 'Bank', align: 'left', value: 'bank' },
      { text: 'Account', align: 'left', value: 'account' },
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Payee Code', align: 'left', value: 'payee_code' },
      { text: 'Payee Name', align: 'left', value: 'payee_name' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Date', align: 'left', value: 'date' },
      { text: 'Reason', align: 'left', value: 'reason' }
    ],
    pagination: {}
  }),
  watch: {
    show(arg) {
      if (arg) {
        this.pagination = {}
      }
    }
  }
}
</script>

<style></style>
