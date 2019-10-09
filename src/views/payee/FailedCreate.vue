<template>
  <v-dialog v-model="show" persistent max-width="1000">
    <v-card>
      <v-card-title>
        <span class="title">
          Failed Payees
        </span>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = false" small>
          <v-icon color="error">mdi-close-box</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="payees"
          :footer-props="{ itemsPerPageOptions: [10] }"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    payees() {
      return this.$store.getters['payee/failedImports']
    },
    show: {
      get() {
        return this.$store.getters['payee/showFailedCreate']
      },
      set(arg) {
        this.$store.commit('payee/showFailedCreate', arg)
      }
    }
  },
  data: () => ({
    headers: [
      { text: 'Code', align: 'left', value: 'code' },
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Group', align: 'left', value: 'group' },
      { text: 'Reason', align: 'left', value: 'reason' }
    ]
  })
}
</script>

<style></style>
