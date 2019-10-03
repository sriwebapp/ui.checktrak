<template>
  <v-dialog v-model="show" max-width="800">
    <v-card>
      <div>
        <v-card-title>
          Imported Payees
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="payees"
          :footer-props="{ itemsPerPageOptions: [10] }"
        >
          <template v-slot:item.payee_group_id="{ item }">
            {{ item.group.name }}
          </template>
        </v-data-table>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    payees() {
      return this.$store.getters['payee/successImports']
    },
    show: {
      get() {
        return this.$store.getters['payee/showSuccessCreate']
      },
      set(arg) {
        this.$store.commit('payee/showSuccessCreate', arg)
      }
    }
  },
  data: () => ({
    headers: [
      { text: 'Code', align: 'left', value: 'code' },
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Group', align: 'left', value: 'payee_group_id' }
    ]
  })
}
</script>

<style></style>
