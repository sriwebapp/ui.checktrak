<template>
  <v-card>
    <v-card-title class="title">Transmittal Report</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout row wrap class="mb-5">
        <v-flex xs6>
          <v-list-item two-line class="my-n4">
            <v-list-item-content>
              <v-list-item-title>{{ transmittal.ref }}</v-list-item-title>
              <v-list-item-subtitle>Transmittal Reference</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line class="my-n4">
            <v-list-item-content>
              <v-list-item-title>
                {{
                  transmittal.incharge_user
                    ? transmittal.incharge_user.name
                    : ''
                }}
              </v-list-item-title>
              <v-list-item-subtitle>Transmitted to</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line class="my-n4">
            <v-list-item-content>
              <v-list-item-title>
                {{ formatDate(transmittal.date, 'MMM DD, Y') }}
              </v-list-item-title>
              <v-list-item-subtitle>Date Transmitted</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-flex>
        <v-flex xs6>
          <v-list-item two-line class="my-n4">
            <v-list-item-content class="text-right">
              <v-list-item-title>
                {{ formatDate(transmittal.due, 'MMM DD, Y') }}
              </v-list-item-title>
              <v-list-item-subtitle>Date due for Return</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line class="my-n4">
            <v-list-item-content class="text-right">
              <v-list-item-title>
                {{ transmittal.checks ? transmittal.checks.length : '0' }} pc/s
              </v-list-item-title>
              <v-list-item-subtitle>No. of Checks</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line class="my-n4">
            <v-list-item-content class="text-right">
              <v-list-item-title>
                {{ transmittal.user ? transmittal.user.name : '' }}
              </v-list-item-title>
              <v-list-item-subtitle>Prepared by</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-flex>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="transmittal.checks"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [5] }"
      >
        <template v-slot:item.date="{ item }">
          {{ formatDate(item.date, 'MM/DD/Y') }}
        </template>
        <template v-slot:item.payee_id="{ item }">
          {{ item.payee.name }}
        </template>
        <template v-slot:item.amount="{ item }">
          {{
            Number(item.amount).toLocaleString('en', {
              style: 'currency',
              currency: 'Php'
            })
          }}
        </template>
      </v-data-table>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        small
        class="indigo white--text"
        :href="pdfPath"
        target="_blank"
        :loading="loading"
      >
        View Pdf
      </v-btn>

      <v-btn
        class="deep-orange white--text"
        small
        router
        :to="{ name: 'transmittals' }"
        :disabled="loading"
      >
        Return
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    loading() {
      return this.$store.getters['transmittal/loading']
    },
    transmittal() {
      return this.$store.getters['transmittal/transmittal']
    },
    pdfPath() {
      return (
        process.env.VUE_APP_API +
        '/pdf/transmittal/' +
        this.transmittal.ref +
        '.pdf'
      )
    }
  },
  data: () => ({
    headers: [
      { text: 'Posted', align: 'left', value: 'date' },
      { text: 'Check #', align: 'left', value: 'number' },
      { text: 'Payee Name', align: 'left', value: 'payee_id' },
      { text: 'Details', align: 'left', value: 'details' },
      { text: 'Amount', align: 'left', value: 'amount' }
    ]
  }),
  methods: {
    formatDate(arg, format) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format(format)
      }
    }
  },
  mounted() {
    this.$store.dispatch('transmittal/getTransmittal', this.$route.params.id)
  }
}
</script>

<style></style>
