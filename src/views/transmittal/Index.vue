<template>
  <v-card>
    <v-card-title class="title">Check Transmittal</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="transmittals"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
        <template v-slot:body="{ items }" v-if="transmittals.length">
          <tbody>
            <tr v-for="item in items" :key="item.id" :class="overDue(item)">
              <td>{{ item.ref }}</td>
              <td>{{ item.branch.name }}</td>
              <td>{{ item.group.name }}</td>
              <td>{{ formatDate(item.date) }}</td>
              <td>{{ formatDate(item.due) }}</td>
              <td>{{ formatDate(item.returned) }}</td>
              <td class="text-center">{{ item.checks.length }}</td>
              <td class="text-center">{{ claimedChecks(item.checks) }}</td>
              <td class="text-center">
                {{ item.sent_checks - item.received_checks }}
              </td>
              <td class="text-center">
                <v-btn
                  icon
                  color="indigo"
                  small
                  :disabled="loading"
                  router
                  :to="{ name: 'show-transmittal', params: { id: item.id } }"
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
import moment from 'moment'
export default {
  computed: {
    loading() {
      return this.$store.getters['transmittal/loading']
    },
    transmittals() {
      return this.$store.getters['transmittal/transmittals']
    }
  },
  data: () => ({
    headers: [
      { text: 'Reference No.', align: 'left', value: 'ref' },
      { text: 'Branch', align: 'left', value: 'branch_id' },
      { text: 'Group', align: 'left', value: 'group_id' },
      { text: 'Date', align: 'left', value: 'date' },
      { text: 'Due', align: 'left', value: 'due' },
      { text: 'Returned', align: 'left', value: 'returned' },
      {
        text: 'Checks',
        align: 'center',
        value: 'checks',
        sortable: false
      },
      {
        text: 'Claimed',
        align: 'center',
        value: 'claimed',
        sortable: false
      },
      {
        text: 'Not Yet Received',
        align: 'center',
        value: 'nyr',
        sortable: false
      },
      { text: 'View', align: 'center', value: 'view', sortable: false }
    ]
  }),
  methods: {
    formatDate(arg) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format('MM/DD/Y')
      }
    },
    claimedChecks(checks) {
      return checks.filter(check => {
        return check.history.find(h => h.action_id === 4)
      }).length
    },
    overDue(transmittal) {
      if (transmittal.returned_all) return

      if (moment(transmittal.due).diff(moment(), 'days') < 0) {
        return 'red lighten-5'
      }
      return
    }
  },
  mounted() {
    this.$store.dispatch('transmittal/getTransmittals')
  }
}
</script>

<style></style>
