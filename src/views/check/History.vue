<template>
  <v-dialog v-model="show" max-width="800">
    <v-card>
      <div>
        <v-card-title>History </v-card-title>
        <v-data-table
          :headers="headers"
          :items="history"
          disable-sort
          :footer-props="{ itemsPerPageOptions: [10] }"
        >
          <template v-slot:item.user_id="{ item }">
            {{ item.user.name }}
          </template>
          <template v-slot:item.date="{ item }">
            {{ formatDate(item.date) }}
          </template>
          <template v-slot:item.action_id="{ item }">
            <v-chip
              small
              outlined
              :text-color="item.action.color"
              :class="item.action.color"
            >
              {{ item.action.name }}
            </v-chip>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    history() {
      const history = this.$store.getters['check/check'].history
      return history ? history.reverse() : []
    },
    show: {
      get() {
        return this.$store.getters['check/showHistory']
      },
      set(arg) {
        this.$store.commit('check/showHistory', arg)
      }
    }
  },
  data: () => ({
    headers: [
      { text: 'Action', align: 'center', value: 'action_id' },
      { text: 'User', align: 'left', value: 'user_id' },
      { text: 'Remarks', align: 'left', value: 'remarks' },
      { text: 'Transaction Date', align: 'center', value: 'date' }
    ]
  }),
  methods: {
    formatDate(arg) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format('MM/DD/Y')
      }
    }
  }
}
</script>

<style></style>
