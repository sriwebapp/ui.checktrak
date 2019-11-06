<template>
  <v-card :loading="loading" outlined>
    <v-card-title style="font-size: 17.5px">Manage Check Book</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout row wrap class="mb-5">
        <v-flex xs6>
          <v-list-item two-line class="my-n4">
            <v-list-item-content>
              <v-list-item-title>{{
                checkbook.account_id ? checkbook.account.code : ''
              }}</v-list-item-title>
              <v-list-item-subtitle>Account</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line class="my-n4">
            <v-list-item-content>
              <v-list-item-title>{{
                checkbook.start_series
              }}</v-list-item-title>
              <v-list-item-subtitle>Series Start</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line class="my-n4">
            <v-list-item-content>
              <v-list-item-title>{{ checkbook.end_series }}</v-list-item-title>
              <v-list-item-subtitle>Series End</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-flex>

        <v-flex xs6>
          <v-list-item two-line class="my-n4">
            <v-list-item-content class="text-right">
              <v-list-item-title>
                {{ checkbook.totalChecks }} pc/s
              </v-list-item-title>
              <v-list-item-subtitle>Total Checks</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line class="my-n4">
            <v-list-item-content class="text-right">
              <v-list-item-title>
                {{ checkbook.postedChecks }} pc/s
              </v-list-item-title>
              <v-list-item-subtitle>Posted Checks</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line class="my-n4">
            <v-list-item-content class="text-right">
              <v-list-item-title>
                {{ checkbook.availableChecks }} pc/s
              </v-list-item-title>
              <v-list-item-subtitle>Available Checks</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-flex>
      </v-layout>

      <v-data-table
        :headers="headers"
        :items="checkbook.checks"
        :footer-props="{ itemsPerPageOptions: [10, 50, -1] }"
      >
        <template
          v-if="checkbook.checks && checkbook.checks.length"
          v-slot:body="{ items }"
        >
          <tbody>
            <tr
              v-for="(item, key) in items"
              :key="key"
              :class="(item.date ? 'green' : 'red') + ' lighten-5'"
            >
              <td>{{ item.number }}</td>
              <td>{{ item.date ? formatDate(item.date) : '' }}</td>
              <td>{{ item.payee_id ? item.payee.name : '' }}</td>
              <td class="text-right">
                {{
                  item.amount
                    ? Number(item.amount).toLocaleString('en', {
                        style: 'currency',
                        currency: 'Php'
                      })
                    : ''
                }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        class="deep-orange white--text"
        small
        router
        :to="{ name: 'checkbooks' }"
        :disabled="loading"
      >
        Return
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon small @click="showDelete" :disabled="loading">
        <v-icon color="red">mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    checkbook() {
      return this.$store.getters['checkbook/checkbook']
    },
    loading() {
      return this.$store.getters['checkbook/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Check #', align: 'left', value: 'number', width: '20%' },
      { text: 'Posted', align: 'left', value: 'date', width: '20%' },
      { text: 'Payee Name', align: 'left', value: 'payee_id', width: '40%' },
      { text: 'Amount', align: 'right', value: 'amount', width: '20%' }
    ]
  }),
  methods: {
    showDelete() {
      this.$store.commit('checkbook/showDelete', true)
    },
    formatDate(arg) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format('MM/DD/Y')
      }
    }
  },
  mounted() {
    this.$store.dispatch('checkbook/getCheckbook', this.$route.params.id)
  }
}
</script>

<style></style>
