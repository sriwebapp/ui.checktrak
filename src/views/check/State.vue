<template>
  <v-dialog v-model="show" max-width="400">
    <v-card v-if="state">
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon :color="status.color">mdi-tag-text-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ status.name }}</v-list-item-title>
          <v-list-item-subtitle>Status</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="green darken-2">mdi-email-receive-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ received }}</v-list-item-title>
          <v-list-item-subtitle>Received</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="red lighten-2">mdi-trash-can-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ deleted }}</v-list-item-title>
          <v-list-item-subtitle>Deleted</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar size="20">
          <v-icon color="blue">mdi-clipboard-list-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title> {{ state.details }} </v-list-item-title>
          <v-list-item-subtitle>Details</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    show: {
      get() {
        return this.$store.getters['check/showState']
      },
      set(arg) {
        this.$store.commit('check/showState', arg)
      }
    },
    statuses() {
      return this.$store.getters['tools/status']
    },
    state() {
      return this.$store.getters['check/checkState']
    },
    status() {
      return this.statuses.find(i => i.id === this.state.status_id)
    },
    received() {
      return this.state.received ? 'Yes' : 'No'
    },
    deleted() {
      if (!this.state.deleted_at) return

      return moment(this.state.deleted_at).format('MMMM D, Y')
    }
  }
}
</script>

<style></style>
