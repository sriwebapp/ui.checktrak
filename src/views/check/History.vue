<template>
  <v-dialog v-model="show" max-width="800">
    <v-card>
      <div>
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
              x-small
              outlined
              :text-color="item.action.color"
              :class="item.action.color"
            >
              {{ item.action.name }}
            </v-chip>
          </template>
          <template v-slot:item.view="{ item }">
            <v-btn icon color="indigo" small @click="showState(item)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
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
      { text: 'Date', align: 'left', value: 'date', width: '15%' },
      { text: 'Action', align: 'left', value: 'action_id', width: '15%' },
      { text: 'User', align: 'left', value: 'user_id', width: '30%' },
      { text: 'Remarks', align: 'left', value: 'remarks', width: '30%' },
      { text: 'View', align: 'right', value: 'view', width: '10%' }
    ]
  }),
  methods: {
    formatDate(arg) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format('MM/DD/Y')
      }
    },
    showState(item) {
      this.$store.commit('check/checkState', JSON.parse(item.state))
      this.$store.commit('check/showState', true)
    }
  }
}
</script>

<style></style>
