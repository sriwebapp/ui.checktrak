<template>
  <v-dialog v-model="show" max-width="1000">
    <v-card>
      <div>
        <v-card-title style="font-size: 17.5px">
          Imported Checks
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="checks"
            :footer-props="{ itemsPerPageOptions: [10] }"
            :loading="loading"
          >
            <template v-slot:item.account_id="{ item }">
              {{ item.account.code }}
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
            <template v-slot:item.action="{ item }">
              <v-btn
                icon
                color="indigo"
                :disabled="loading"
                @click="showCheck(item.id)"
              >
                <v-icon>mdi-open-in-app</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    checks() {
      return this.$store.getters['check/successChecks']
    },
    loading() {
      return this.$store.getters['check/loading']
    },
    show: {
      get() {
        return this.$store.getters['check/showSuccessCreateCheck']
      },
      set(arg) {
        this.$store.commit('check/showSuccessCreateCheck', arg)
      }
    }
  },
  data: () => ({
    headers: [
      { text: 'Account', align: 'left', value: 'account_id' },
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Payee', align: 'left', value: 'payee_id' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Details', align: 'center', value: 'action', sortable: false }
    ]
  }),
  methods: {
    async showCheck(id) {
      await this.$store.dispatch('tools/getStatus')
      this.$store.dispatch('check/showCheck', id)
    }
  }
}
</script>

<style></style>
