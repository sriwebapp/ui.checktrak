<template>
  <v-card outlined :loading="loading">
    <v-card-title>
      <span style="font-size: 17.5px">
        Bank Account Management
      </span>
      <v-spacer></v-spacer>
      <v-btn
        class="indigo white--text"
        small
        router
        :to="{ name: 'create-account' }"
      >
        New Account
      </v-btn></v-card-title
    >
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="accounts"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
        :search="search"
      >
        <template v-slot:item.last_check="{ item }">
          {{ item.last_check ? item.last_check.number : '' }}
        </template>

        <template v-slot:item.need_reorder="{ item }">
          <v-icon
            small
            :class="item.need_reorder ? 'green--text' : 'red--text'"
            >{{
              item.need_reorder
                ? 'mdi-check-circle-outline'
                : 'mdi-close-circle-outline'
            }}</v-icon
          >
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
            :disabled="loading"
            router
            :to="{ name: 'show-account', params: { id: item.id } }"
          >
            Manage
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    accounts() {
      return this.$store.getters['account/accounts']
    },
    loading() {
      return this.$store.getters['account/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Code', align: 'left', value: 'code', width: '12%' },
      { text: 'Number', align: 'left', value: 'number', width: '12%' },
      {
        text: 'Checkbooks',
        align: 'center',
        value: 'available_checkbook',
        width: '8%'
      },
      {
        text: 'Last Check',
        align: 'center',
        value: 'last_check',
        width: '12%',
        sortable: false
      },
      {
        text: 'Reorder Point',
        align: 'center',
        value: 'reorder_point',
        width: '8%'
      },
      {
        text: 'Need Reorder',
        align: 'center',
        value: 'need_reorder',
        width: '8%'
      },
      { text: 'Purpose', align: 'left', value: 'purpose', width: '20%' },
      { text: 'Active', align: 'center', value: 'active', width: '8%' },
      {
        text: 'Actions',
        align: 'center',
        value: 'action',
        sortable: false,
        width: '12%'
      }
    ],
    search: ''
  }),
  mounted() {
    this.$store.dispatch('account/getAccounts')
  }
}
</script>

<style></style>
