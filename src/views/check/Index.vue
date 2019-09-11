<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="checks"
    :loading="loading"
    class="elevation-1"
    show-select
  >
    <template v-slot:item.account_id="{ item }">
      {{ item.account.code }}
    </template>
    <template v-slot:item.payee_id="{ item }">
      {{ item.payee.name }}
    </template>
    <template v-slot:item.status_id="{ item }">
      {{ item.status.name }}
    </template>
    <template v-slot:item.detail="{ item }">
      <v-btn icon color="indigo" :disabled="loading" @click="show(item.id)">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  computed: {
    checks() {
      return this.$store.getters['check/checks']
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
    }
  },
  data: () => ({
    headers: [
      { text: 'Account', align: 'left', value: 'account_id' },
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Created', align: 'left', value: 'date' },
      { text: 'Payee', align: 'left', value: 'payee_id' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Status', align: 'left', value: 'status_id' },
      { text: 'Details', align: 'center', value: 'detail', sortable: false }
    ]
  }),
  methods: {
    show(id) {
      this.$store.dispatch('check/getCheck', id)
    }
  },
  mounted() {
    this.$store.dispatch('check/getChecks')
  }
}
</script>

<style></style>
