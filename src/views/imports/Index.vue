<template>
  <v-card>
    <v-card-title>Data Imports</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ formatDate(item.created_at) }}</td>
              <td>{{ item.subject }}</td>
              <td>{{ item.user ? item.user.name : '' }}</td>
              <td class="text-center">
                <v-chip small outlined class="success">
                  {{ item.success }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip small outlined class="error">
                  {{ item.failed }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip small outlined class="primary">
                  {{ item.total }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-btn
                  x-small
                  class="info mr-2"
                  router
                  :to="{ name: 'show-import', params: { id: item.id } }"
                  :disabled="loading"
                >
                  View
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    loading() {
      return this.$store.getters['imports/loading']
    },
    items() {
      return this.$store.getters['imports/items']
    }
  },
  data: () => ({
    headers: [
      { text: 'Date', align: 'left', value: 'created_at' },
      { text: 'Subject', align: 'left', value: 'subject' },
      { text: 'User', align: 'left', value: 'user_id' },
      { text: 'Success', align: 'center', value: 'success', sortable: false },
      { text: 'Failed', align: 'center', value: 'failed', sortable: false },
      { text: 'Total', align: 'center', value: 'total', sortable: false },
      { text: 'Actions', align: 'center', value: 'actions', sortable: false }
    ]
  }),
  methods: {
    formatDate(arg) {
      if (Date.parse(arg)) {
        const date = moment(new Date(arg))

        if (moment().diff(date, 'hours') > 6) {
          return date.calendar()
        } else {
          return date.fromNow()
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('imports/getItems')
  }
}
</script>

<style></style>
