<template>
  <v-card>
    <v-card-title class="title">Check Transmittal</v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="transmittals" :loading="loading">
        <template v-slot:item.branch_id="{ item }">
          {{ item.branch.name }}
        </template>
        <template v-slot:item.group_id="{ item }">
          {{ item.group.name }}
        </template>
        <template v-slot:item.date="{ item }">
          {{ formatDate(item.date) }}
        </template>
        <template v-slot:item.due="{ item }">
          {{ formatDate(item.due) }}
        </template>
        <template v-slot:item.returned="{ item }">
          {{ formatDate(item.returned) }}
        </template>
        <template v-slot:item.view="{ item }">
          <v-btn
            icon
            color="indigo"
            small
            :disabled="loading"
            router
            :to="{ name: 'show-transmittal', params: { id: item.id } }"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
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
      { text: 'View', align: 'center', value: 'view', sortable: false }
    ]
  }),
  methods: {
    formatDate(arg) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format('MM/DD/Y')
      }
    }
  },
  mounted() {
    this.$store.dispatch('transmittal/getTransmittals')
  }
}
</script>

<style></style>
