<template>
  <v-dialog v-model="show" max-width="1000">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="checks"
        :footer-props="{ itemsPerPageOptions: [10] }"
        :loading="loading"
        :options.sync="pagination"
      >
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
        <template v-slot:item.status_id="{ item }">
          <v-chip
            small
            :text-color="item.received ? 'white' : 'black'"
            :outlined="!item.received"
            :class="item.status.color"
          >
            {{ item.status.name }}
          </v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            icon
            color="indigo"
            :disabled="loading"
            @click="showCheck(item.id)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    checks() {
      return this.$store.getters['check/selectedChecks']
    },
    loading() {
      return this.$store.getters['check/loading']
    },
    show: {
      get() {
        return this.$store.getters['check/showSelected']
      },
      set(arg) {
        this.$store.commit('check/showSelected', arg)
      }
    }
  },
  data: () => ({
    headers: [
      { text: 'Number', align: 'left', value: 'number' },
      { text: 'Payee', align: 'left', value: 'payee_id' },
      { text: 'Amount', align: 'left', value: 'amount' },
      { text: 'Status', align: 'center', value: 'status_id' },
      { text: 'Details', align: 'center', value: 'action', sortable: false }
    ],
    pagination: {}
  }),
  methods: {
    showCheck(id) {
      this.$store.dispatch('check/getCheck', id)
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.pagination = {}
      }
    }
  }
}
</script>

<style></style>