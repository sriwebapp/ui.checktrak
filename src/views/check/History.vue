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
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-avatar size="30" v-on="on">
                  <v-img :src="avatar(item.user)"></v-img>
                </v-avatar>
              </template>
              <span> {{ item.user.name }} </span>
            </v-tooltip>
          </template>
          <template v-slot:item.date="{ item }">
            {{ formatDate(item.date) }}
          </template>
          <template v-slot:item.created_at="{ item }">
            <span class="overline grey--text">
              {{ timestamp(item.created_at) }}
            </span>
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
      { text: 'Timestamp', align: 'center', value: 'created_at', width: '14%' },
      { text: 'Action Date', align: 'center', value: 'date', width: '12%' },
      { text: 'Action', align: 'center', value: 'action_id', width: '12%' },
      { text: 'User', align: 'center', value: 'user_id', width: '10%' },
      { text: 'Remarks', align: 'left', value: 'remarks', width: '40%' },
      { text: 'View', align: 'center', value: 'view', width: '12%' }
    ]
  }),
  methods: {
    avatar(incharge) {
      return process.env.VUE_APP_API + '/images/avatar/' + incharge.avatar
    },
    formatDate(arg) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format('MM/DD/Y')
      }
    },
    timestamp(arg) {
      if (Date.parse(arg)) {
        return moment(new Date(arg)).format('MM/DD/Y HH:mm:ss')
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
