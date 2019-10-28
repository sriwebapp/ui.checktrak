<template>
  <v-card>
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
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
        :search="search"
      >
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
      { text: 'Code', align: 'left', value: 'code' },
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Purpose', align: 'left', value: 'purpose' },
      { text: 'Active', align: 'center', value: 'active' },
      { text: 'Actions', align: 'center', value: 'action', sortable: false }
    ],
    search: ''
  }),
  mounted() {
    this.$store.dispatch('account/getAccounts')
  }
}
</script>

<style></style>
