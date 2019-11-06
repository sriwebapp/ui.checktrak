<template>
  <v-card outlined :loading="loading">
    <v-card-title>
      <span style="font-size: 17.5px">Check Book Management</span>
      <v-spacer></v-spacer>
      <v-btn
        class="indigo white--text"
        small
        router
        :to="{ name: 'create-checkbook' }"
      >
        New Check Book
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="checkbooks"
        :footer-props="{ itemsPerPageOptions: [10, 50, 100] }"
      >
        <template v-if="checkbooks.length" v-slot:body="{ items }">
          <tbody>
            <tr
              v-for="(item, key) in items"
              :key="key"
              :class="
                item.totalChecks === item.postedChecks ? 'green lighten-5' : ''
              "
            >
              <td>{{ item.account.code }}</td>
              <td>{{ item.start_series }}</td>
              <td>{{ item.end_series }}</td>
              <td class="text-center">{{ item.totalChecks }}</td>
              <td class="text-center">{{ item.postedChecks }}</td>
              <td class="text-center">{{ item.availableChecks }}</td>
              <td class="text-center">
                <v-btn
                  icon
                  color="indigo"
                  small
                  :disabled="loading"
                  router
                  :to="{ name: 'show-checkbook', params: { id: item.id } }"
                >
                  <v-icon>mdi-open-in-app</v-icon>
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
export default {
  computed: {
    checkbooks() {
      return this.$store.getters['checkbook/checkbooks']
    },
    loading() {
      return this.$store.getters['checkbook/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Account', align: 'left', value: 'account_id', width: '1%' },
      {
        text: 'Series Start',
        align: 'left',
        value: 'start_series',
        width: '1%'
      },
      {
        text: 'Series End',
        align: 'left',
        value: 'end_series',
        width: '1%'
      },
      { text: 'Checks', align: 'center', value: 'totalChecks', width: '1%' },
      { text: 'Posted', align: 'center', value: 'postedChecks', width: '1%' },
      {
        text: 'Available',
        align: 'center',
        value: 'availableChecks',
        width: '1%'
      },
      {
        text: 'View',
        align: 'center',
        value: 'action',
        width: '1%',
        sortable: false
      }
    ]
  }),
  mounted() {
    this.$store.dispatch('checkbook/getCheckbooks')
  }
}
</script>

<style></style>
