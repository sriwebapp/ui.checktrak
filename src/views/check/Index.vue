<template>
  <div>
    <v-data-table :headers="headers" :items="checks" :loading="loading">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.account.code }}</td>
            <td>{{ item.number }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.payee.name }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.status.name }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  computed: {
    checks() {
      return this.$store.getters['check/checks']
    },
    loading() {
      return this.$store.getters['check/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Account', align: 'left', value: 'account_id' },
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Date', align: 'left', value: 'date' },
      { text: 'Payee', align: 'left', value: 'payee_id' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Status', align: 'left', value: 'status_id' }
    ]
  }),
  mounted() {
    this.$store.dispatch('check/getChecks')
  }
}
</script>

<style></style>
