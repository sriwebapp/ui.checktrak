<template>
  <v-footer app inset dark color="grey lighten-2" v-if="show">
    <v-row>
      <v-col>
        <v-btn
          light
          block
          rounded
          color="indigo white--text"
          @click="showCreateForm"
          :disabled="!creatable"
        >
          Create
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          light
          block
          rounded
          color="orange  white--text"
          @click="showEditForm"
          :disabled="!editable"
        >
          Edit
          <v-icon right>mdi-update</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          light
          block
          rounded
          color="red white--text"
          @click="showDeleteForm"
          :disabled="!deletable"
        >
          Delete
          <v-icon right>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          light
          block
          rounded
          color="blue white--text"
          @click="showTransmitForm"
          :disabled="!transmittable"
        >
          Transmit
          <v-icon right>mdi-bank-transfer-out</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="green">
          Receive
          <v-icon right>mdi-bank-transfer-in</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          light
          block
          rounded
          color="purple white--text"
          @click="showClaimForm"
          :disabled="!claimable"
        >
          Claim
          <v-icon right>mdi-download</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="teal">
          Return
          <v-icon right>mdi-keyboard-return</v-icon>
        </v-btn>
      </v-col>

      <v-col>
        <v-btn
          light
          block
          rounded
          color="red white--text"
          @click="showCancelForm"
          :disabled="!cancelable"
        >
          Cancel
          <v-icon right>mdi-cancel</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          light
          block
          rounded
          color="teal white--text"
          @click="showClearForm"
          :disabled="!clearable"
        >
          Clear
          <v-icon right>mdi-check-bold</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="primary">
          Preview
          <v-icon right>mdi-open-in-app</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  computed: {
    cancelable() {
      return (
        this.selectedChecks.length &&
        this.selectedChecks.every(check => {
          return (
            ![5, 6, 7].includes(check.status_id) &&
            check.received &&
            this.branches.includes(check.branch.code)
          )
        }) &&
        this.actions.includes('cnl')
      )
    },
    claimable() {
      return (
        this.selectedChecks.length > 0 &&
        this.selectedChecks.every(check => {
          return (
            [1, 2, 4].includes(check.status_id) &&
            check.received &&
            check.branch_id === this.user.branch_id
          )
        }) &&
        this.actions.includes('clm')
      )
    },
    clearable() {
      return (
        this.selectedChecks.length > 0 &&
        this.selectedChecks.every(check => {
          return (
            check.status_id === 3 /* claimed */ &&
            check.received &&
            this.branches.includes(check.branch.code)
          )
        }) &&
        this.actions.includes('clr')
      )
    },
    creatable() {
      return !this.selectedChecks.length && this.actions.includes('crt')
    },
    editable() {
      return (
        this.selectedChecks.length === 1 &&
        this.selectedChecks[0].status_id !== 6 /* cleared */ &&
        this.actions.includes('edt')
      )
    },
    deletable() {
      return (
        this.selectedChecks.length === 1 &&
        this.selectedChecks[0].status_id === 1 /* created */ &&
        this.actions.includes('dlt')
      )
    },
    transmittable() {
      return (
        this.selectedChecks.length > 0 &&
        this.selectedChecks.every(check => {
          return [1, 4].includes(check.status_id) // created || returned
        }) &&
        this.actions.includes('trm')
      )
    },
    show() {
      return this.$store.getters.footer
    },
    selectedChecks() {
      return this.$store.getters['check/selectedChecks']
    },
    user() {
      return this.$store.getters['auth/user']
    },
    actions() {
      return this.user.actionAccess
    },
    branches() {
      return this.user.branchAccess
    }
  },
  methods: {
    showCancelForm() {
      this.$store.commit('check/showCancel', true)
    },
    showClaimForm() {
      this.$store.commit('check/showClaim', true)
    },
    showClearForm() {
      this.$store.commit('check/showClear', true)
    },
    showCreateForm() {
      this.$store.commit('check/showCreate', true)
    },
    showEditForm() {
      this.$store.commit('check/check', this.selectedChecks[0])
      this.$store.commit('check/showEdit', true)
    },
    showDeleteForm() {
      this.$store.commit('check/check', this.selectedChecks[0])
      this.$store.commit('check/showDelete', true)
    },
    showTransmitForm() {
      this.$store.commit('check/showTransmit', true)
    }
  }
}
</script>

<style></style>
