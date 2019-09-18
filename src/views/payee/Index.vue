<template>
  <v-card>
    <v-card-title>
      Payee Management
      <v-spacer></v-spacer>
      <v-btn class="indigo white--text" router :to="{ name: 'create-payee' }">
        New Payee
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="payees" :loading="loading">
        <template v-slot:item.payee_group_id="{ item }">
          {{ item.group ? item.group.name : '' }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn small class="info" router to="/" :disabled="loading">
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
      return this.$store.getters['payee/payees']
    }
  },
  data: () => ({
    headers: [
      { text: 'Code', align: 'left', value: 'code' },
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Group', align: 'left', value: 'payee_group_id' },
      { text: 'Description', align: 'left', value: 'desc' },
      { text: 'Actions', align: 'center', value: 'action', sortable: false }
    ]
  }),
  mounted() {
    this.$store.dispatch('payee/getPayees')
  }
}
</script>

<style></style>
