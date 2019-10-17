<template>
  <v-dialog v-model="show" max-width="500" persistent>
    <v-card v-if="state">
      <form @submit.prevent="undo" @keydown="error.clear($event.target.name)">
        <v-card-text>
          <v-layout row wrap class="px-5">
            <v-flex xs12>
              <v-text-field
                :value="status"
                label="Status"
                prepend-icon="mdi-tag-text-outline"
                hide-details
                class="mb-3"
                disabled
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                :value="received"
                label="Received"
                prepend-icon="mdi-email-receive-outline"
                hide-details
                class="mb-3"
                disabled
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                :value="deleted"
                label="Deleted"
                prepend-icon="mdi-trash-can-outline"
                hide-details
                class="mb-3"
                placeholder=" "
                disabled
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                :value="state.details"
                label="Details"
                prepend-icon="mdi-clipboard-list-outline"
                hide-details
                class="mb-3"
                placeholder=" "
                disabled
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="remarks"
                :error-messages="error.get('remarks')"
                name="remarks"
                label="Reason"
                prepend-icon="mdi-clipboard-list-outline"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" small :loading="undoing" color="red white--text">
            Restore
          </v-btn>
          <v-btn
            color="deep-orange"
            small
            :disabled="undoing"
            outlined
            @click="show = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    check() {
      return this.$store.getters['check/check']
    },
    undoing() {
      return this.$store.getters['check/undoing']
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showUndo']
      },
      set(arg) {
        this.$store.commit('check/showUndo', arg)
      }
    },
    statuses() {
      return this.$store.getters['tools/status']
    },
    state() {
      return this.$store.getters['check/checkState']
    },
    status() {
      return this.statuses.find(i => i.id === this.state.status_id).name
    },
    received() {
      return this.state.received ? 'Yes' : 'No'
    },
    deleted() {
      if (!this.state.deleted_at) return

      return moment(this.state.deleted_at).format('MMMM D, Y')
    }
  },
  data: () => ({
    remarks: ''
  }),
  methods: {
    undo() {
      this.$store.dispatch('check/undo', {
        check: this.check.id,
        remarks: this.remarks
      })
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.remarks = ''
      }
    }
  }
}
</script>

<style></style>
