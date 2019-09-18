<template>
  <div>
    <v-dialog v-model="show" persistent max-width="800">
      <v-card>
        <form
          @submit.prevent="returnChecks"
          @keydown="error.clear($event.target.name)"
        >
          <v-card-title>Return Checks </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-select
                    v-model="transmittal_id"
                    :error-messages="error.get('transmittal_id')"
                    name="transmittal_id"
                    label="Select Transmittal"
                    prepend-icon="mdi-bank"
                    :items="transmittals"
                    item-text="ref"
                    item-value="id"
                  ></v-select>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    v-model="date"
                    :error-messages="error.get('date')"
                    name="date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    @click="showCalendar = true"
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-data-table
                :headers="headers"
                :items="checks"
                :loading="loading"
                :footer-props="{ itemsPerPageOptions: [10] }"
                dense
              >
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr
                      v-for="item in items"
                      :key="item.id"
                      :class="item.status.color + ' lighten-4'"
                    >
                      <td>{{ item.account.code }}</td>
                      <td>{{ item.number }}</td>
                      <td>{{ item.amount }}</td>
                      <td>{{ item.status.name }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
              <v-layout row wrap class="mt-5">
                <v-flex xs6>
                  <v-text-field
                    :value="returnableChecks.length + '/' + checks.length"
                    label="No of Checks to be Returned"
                    prepend-icon="mdi-checkbook"
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    :value="amount"
                    label="Total Amount to be Returned"
                    prepend-icon="mdi-currency-php"
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              color="teal white--text"
              :loading="returning"
              :disabled="loading"
            >
              Return
            </v-btn>
            <v-btn
              color="deep-orange"
              outlined
              @click="show = false"
              :disabled="returning || loading"
            >
              Close
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showCalendar" width="290px">
      <v-date-picker no-title v-model="date" @change="showCalendar = false">
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    amount() {
      const total = this.returnableChecks.reduce((total, check) => {
        return total + parseFloat(check.amount)
      }, 0)

      return Number(total).toLocaleString('en', {
        style: 'currency',
        currency: 'Php'
      })
    },
    error() {
      return this.$store.getters.error
    },
    returning() {
      return this.$store.getters['check/returning']
    },
    returnableChecks() {
      return this.checks.filter(check => check.status_id === 2)
    },
    show: {
      get() {
        return this.$store.getters['check/showReturn']
      },
      set(arg) {
        this.$store.commit('check/showReturn', arg)
      }
    },
    transmittals() {
      return this.$store.getters['check/transmittals']
    }
  },
  data: () => ({
    checks: [],
    date: new Date().toISOString().substr(0, 10),
    headers: [
      { text: 'Account', align: 'left', value: 'account_id' },
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Status', align: 'left', value: 'status_id' }
    ],
    loading: false,
    showCalendar: false,
    transmittal_id: null
  }),
  methods: {
    returnChecks() {
      this.$store.dispatch('check/returnChecks', {
        date: this.date,
        transmittal_id: this.transmittal_id
      })
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.transmittal_id = null
        this.checks = []
      }
    },
    transmittal_id(arg) {
      if (arg) {
        this.loading = true
        this.$store
          .dispatch('tools/getChecks', arg)
          .then(res => {
            this.checks = res.data
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style></style>
