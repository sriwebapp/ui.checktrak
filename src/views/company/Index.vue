<template>
  <v-card>
    <v-card-title>
      Company Management
      <v-spacer></v-spacer>
      <v-btn class="indigo white--text" router :to="{ name: 'create-company' }"
        >New Company</v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="companies"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            x-small
            class="info"
            router
            :to="{ name: 'show-company', params: { code: item.code } }"
            :disabled="loading"
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
    companies() {
      return this.$store.getters['company/companies']
    },
    loading() {
      return this.$store.getters['company/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Code', align: 'left', value: 'code' },
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Address', align: 'left', value: 'address' },
      { text: 'Actions', align: 'center', value: 'action', sortable: false }
    ]
  }),
  mounted() {
    this.$store.dispatch('company/getCompanies')
  }
}
</script>

<style></style>
