<template>
  <v-dialog v-model="show" max-width="600">
    <v-card>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="indigo">mdi-bank</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{
            check.account ? check.account.code : ''
          }}</v-list-item-title>
          <v-list-item-subtitle>Account</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="indigo">mdi-calendar</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ date }}</v-list-item-title>
          <v-list-item-subtitle>Date Posted</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="indigo">mdi-tag-text-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ check.number }}</v-list-item-title>
          <v-list-item-subtitle>Check Number</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="indigo">mdi-account-cash-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{
            check.payee ? check.payee.name : ''
          }}</v-list-item-title>
          <v-list-item-subtitle>Payee</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="indigo">mdi-clipboard-list-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ check.details }}</v-list-item-title>
          <v-list-item-subtitle>Details</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="indigo">mdi-currency-php</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{
            Number(check.amount).toLocaleString('en', {
              style: 'currency',
              currency: 'Php'
            })
          }}</v-list-item-title>
          <v-list-item-subtitle>Amount</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="indigo">mdi-tag-text-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{
            check.status ? check.status.name : ''
          }}</v-list-item-title>
          <v-list-item-subtitle>Status</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="indigo">mdi-map-marker</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{
            check.branch ? check.branch.name : ''
          }}</v-list-item-title>
          <v-list-item-subtitle>Branch</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined color="indigo" small @click="showHistory">
          History
        </v-btn>
        <v-btn color="deep-orange" small outlined @click="show = false">
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon small :disabled="!editable" @click="showEditForm">
          <v-icon color="orange darken-2">mdi-file-edit</v-icon>
        </v-btn>
        <v-btn icon small :disabled="!undoable" @click="showUndoForm">
          <v-icon color="purple">mdi-update</v-icon>
        </v-btn>
        <v-btn icon small :disabled="!deletable" @click="showDeleteForm">
          <v-icon color="red">mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    check() {
      return this.$store.getters['check/check']
    },
    date() {
      return moment(new Date(this.check.date)).format('MM/DD/Y')
    },
    show: {
      get() {
        return this.$store.getters['check/showCheck']
      },
      set(arg) {
        this.$store.commit('check/showCheck', arg)
      }
    },
    editable() {
      return (
        this.check.status_id !== 6 /* cleared */ &&
        this.user.actionAccess.includes('edt')
      )
    },
    deletable() {
      return (
        this.check.status_id === 1 /* created */ &&
        this.user.actionAccess.includes('dlt')
      )
    },
    undoable() {
      if (!this.check.history) return

      return (
        this.check.history.filter(h => h.action_id !== 3).length >= 2 &&
        this.check.history[0].action_id !== 11 &&
        this.user.actionAccess.includes('und')
      )
    }
  },
  methods: {
    showHistory() {
      this.$store.commit('check/showHistory', true)
    },
    showEditForm() {
      this.$store.commit('check/showEdit', true)
    },
    showDeleteForm() {
      this.$store.commit('check/showDelete', true)
    },
    showUndoForm() {
      let history = this.check.history
      let lastAction = history[0].action_id === 3 ? history[2] : history[1]

      this.$store.commit('check/checkState', JSON.parse(lastAction.state))
      this.$store.commit('check/showUndo', true)
    }
  }
}
</script>

<style></style>
