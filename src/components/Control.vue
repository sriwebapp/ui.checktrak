<template>
  <v-footer app inset dark color="grey lighten-2" v-if="show">
    <v-row>
      <v-col class="my-n2" v-for="(control, index) in controls" :key="index">
        <v-btn
          light
          block
          rounded
          :color="control.color + ' white--text'"
          @click="control.action"
          :disabled="control.access"
        >
          {{ control.label }}
          <v-icon right>{{ control.icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  computed: {
    controls() {
      return [
        {
          label: 'Create',
          color: 'indigo',
          icon: 'mdi-plus',
          action: this.showCreateForm,
          access: !this.creatable
        },
        {
          label: 'Edit',
          color: 'orange',
          icon: 'mdi-update',
          action: this.showEditForm,
          access: !this.editable
        },
        {
          label: 'Delete',
          color: 'red',
          icon: 'mdi-trash-can-outline',
          action: this.showDeleteForm,
          access: !this.deletable
        },
        {
          label: 'Transmit',
          color: 'blue',
          icon: 'mdi-bank-transfer-out',
          action: this.showTransmitForm,
          access: !this.transmittable
        },
        {
          label: 'Receive',
          color: 'green',
          icon: 'mdi-bank-transfer-in',
          action: this.showReceiveForm,
          access: !this.receivable
        },
        {
          label: 'Claim',
          color: 'purple',
          icon: 'mdi-download',
          action: this.showClaimForm,
          access: !this.claimable
        },
        {
          label: 'Return',
          color: 'blue-grey',
          icon: 'mdi-keyboard-return',
          action: this.showReturnForm,
          access: !this.returnable
        },
        {
          label: 'Cancel',
          color: 'red',
          icon: 'mdi-cancel',
          action: this.showCancelForm,
          access: !this.cancelable
        },
        {
          label: 'Clear',
          color: 'teal',
          icon: 'mdi-check-bold',
          action: this.showClearForm,
          access: !this.clearable
        },
        {
          label: 'Preview',
          color: 'primary',
          icon: 'mdi-open-in-app',
          action: this.showCheck,
          access: !this.viewable
        },
        {
          label: 'Refresh',
          color: 'green',
          icon: 'mdi-refresh',
          action: this.refresh,
          access: false
        }
      ]
    },
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
      return this.actions.includes('crt')
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
    receivable() {
      return (
        this.selectedChecks.length > 0 &&
        this.selectedChecks.every(check => {
          return !check.received && check.branch_id === this.user.branch_id
        }) &&
        this.actions.includes('rcv')
      )
    },
    returnable() {
      return this.actions.includes('rtn')
    },
    viewable() {
      return this.selectedChecks.length
    },
    transmittable() {
      return (
        this.selectedChecks.length > 0 &&
        this.selectedChecks.every(check => {
          return check.received && [1, 4].includes(check.status_id) // created || returned
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
    refresh() {
      this.$store.dispatch('check/getChecks', {})
    },
    showCheck() {
      if (this.selectedChecks.length === 1) {
        this.$store.dispatch('check/getCheck', this.selectedChecks[0].id)
      } else if (this.selectedChecks.length > 1) {
        this.$store.commit('check/showSelected', true)
      }
    },
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
      this.$store.commit(
        'check/check',
        Object.assign({}, this.selectedChecks[0])
      )
      this.$store.commit('check/showEdit', true)
    },
    showDeleteForm() {
      this.$store.commit('check/check', this.selectedChecks[0])
      this.$store.commit('check/showDelete', true)
    },
    showReceiveForm() {
      this.$store.commit('check/showReceive', true)
    },
    showReturnForm() {
      this.$store.dispatch('check/getReceivedTransmittals')
    },
    showTransmitForm() {
      this.$store.commit('check/showTransmit', true)
    }
  }
}
</script>

<style></style>
