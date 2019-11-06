<template>
  <v-card outlined>
    <v-card-title style="font-size: 17.5px">Check Transmittal</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="transmittals"
        :loading="loading"
        :options.sync="pagination"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
        :server-items-length="totalItems"
      >
        <template
          v-slot:body="{ items }"
          v-if="transmittals && transmittals.length"
        >
          <tbody>
            <tr v-for="item in items" :key="item.id" :class="overDue(item)">
              <td>{{ item.ref }}</td>
              <td>{{ item.branch.name }}</td>
              <td>{{ item.group.name }}</td>
              <td class="text-center">{{ formatDate(item.date) }}</td>
              <td class="text-center">{{ formatDate(item.due) }}</td>
              <td class="text-center">{{ formatDate(item.returned) }}</td>
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
      return this.$store.getters['transmittal/transmittals'].data
    },
    totalItems() {
      return this.$store.getters['transmittal/transmittals'].total
    }
  },
  created() {
    this.debounceGetTransmittals = this._.debounce(this.getTransmittals, 500)
  },
  data: () => ({
    headers: [
      { text: 'Reference No.', align: 'left', value: 'ref', width: '18%' },
      { text: 'Branch', align: 'left', value: 'branch_id', width: '12%' },
      { text: 'Group', align: 'left', value: 'group_id', width: '12%' },
      { text: 'Date', align: 'center', value: 'date', width: '10%' },
      { text: 'Due', align: 'center', value: 'due', width: '10%' },
      { text: 'Returned', align: 'center', value: 'returned', width: '10%' },
      {
        text: 'Checks',
        align: 'center',
        value: 'checks',
        sortable: false,
        width: '7%'
      },
      {
        text: 'Claimed',
        align: 'center',
        value: 'claimed',
        sortable: false,
        width: '7%'
      },
      {
        text: 'N Y R',
        align: 'center',
        value: 'nyr',
        sortable: false,
        width: '7%'
      },
      {
        text: 'View',
        align: 'center',
        value: 'view',
        sortable: false,
        width: '7%'
      }
    ],
    pagination: {}
  }),
  methods: {
    formatDate(arg) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format('MM/DD/Y')
      }
    },
    claimedChecks(checks) {
      return checks.filter(check => {
        return check.history.find(h => h.action_id === 4 && h.active === 1)
      }).length
    },
    overDue(transmittal) {
      if (transmittal.returned_all) return

      if (moment(transmittal.due).diff(moment(), 'days') < 0) {
        return 'red lighten-5'
      }
      return
    },
    getTransmittals() {
      this.$store.dispatch('transmittal/getTransmittals', this.pagination)
    }
  },
  mounted() {
    this.pagination = {
      groupBy: [],
      groupDesc: [],
      itemsPerPage: 10,
      multiSort: false,
      mustSort: false,
      page: 1,
      sortBy: [],
      sortDesc: []
    }
  },
  watch: {
    pagination: {
      deep: true,
      handler() {
        this.debounceGetTransmittals()
      }
    }
  }
}
</script>

<style></style>
