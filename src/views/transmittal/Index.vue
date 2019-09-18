<template>
  <v-data-table
    :headers="headers"
    :items="transmittals"
    :loading="loading"
    class="elevation-1"
  >
    <template v-slot:item.branch_id="{ item }">
      {{ item.branch.name }}
    </template>
    <template v-slot:item.view="{ item }">
      <v-btn icon color="indigo" :disabled="loading">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
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
      { text: 'Date', align: 'left', value: 'date' },
      { text: 'Due', align: 'left', value: 'due' },
      { text: 'Returned', align: 'left', value: 'returned' },
      { text: 'View', align: 'center', value: 'view', sortable: false }
    ]
  }),
  mounted() {
    this.$store.dispatch('transmittal/getTransmittals')
  }
}
</script>

<style></style>
