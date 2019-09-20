<template>
  <v-card>
    <v-card-title>
      Bank Management
      <v-spacer></v-spacer>
      <v-btn class="indigo white--text" router :to="{ name: 'create-account' }">
        New Account
      </v-btn></v-card-title
    >
    <v-card-text>
      <v-layout class="mb-5">
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          append-icon="mdi-account-search-outline"
          label="Search"
          single-line
          hide-details
          autofocus
        ></v-text-field>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="accounts"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            small
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
      { text: 'Contact', align: 'left', value: 'contact_person' },
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
