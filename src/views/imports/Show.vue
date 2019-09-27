<template>
  <v-card>
    <v-card-title>
      Failed Imports
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
        <template v-slot:item.reason_id="{ item }">
          {{ item.reason.desc }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    headers() {
      if (this.item.subject === 'Checks') {
        return this.tempCheckHeaders
      }
      return []
    },
    items() {
      if (this.item.items) {
        return this.item.items
      }
      return []
    },
    loading() {
      return this.$store.getters['imports/loading']
    },
    item() {
      return this.$store.getters['imports/item']
    }
  },
  data: () => ({
    tempCheckHeaders: [
      { text: 'Bank', align: 'left', value: 'bank' },
      { text: 'Account', align: 'left', value: 'account' },
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Payee Code', align: 'left', value: 'payee_code' },
      { text: 'Payee Name', align: 'left', value: 'payee_name' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Date', align: 'left', value: 'date' },
      { text: 'Reason', align: 'left', value: 'reason_id' }
    ]
  }),
  mounted() {
    this.$store.dispatch('imports/getItem', this.$route.params.id)
  }
}
</script>

<style></style>
