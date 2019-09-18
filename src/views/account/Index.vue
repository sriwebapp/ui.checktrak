<template>
  <v-card>
    <v-card-title>
      Account Management
      <v-spacer></v-spacer>
      <v-btn class="indigo white--text" router :to="{ name: 'create-account' }">
        New Account
      </v-btn></v-card-title
    >
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="accounts"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
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
    ]
  }),
  mounted() {
    this.$store.dispatch('account/getAccounts')
  }
}
</script>

<style></style>
