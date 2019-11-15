<template>
  <v-footer app inset dark color="grey darken-2" v-if="show">
    <v-row>
      <v-col
        class="px-2 my-n2"
        v-for="(control, index) in controls"
        :key="index"
      >
        <v-btn
          small
          block
          :color="control.color"
          class="lighten-1"
          @click="control.action"
          :disabled="control.access || loading"
        >
          {{ control.label }}
          <v-icon small>{{ control.icon }}</v-icon>
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
          label: 'Select',
          color: 'purple',
          icon: 'mdi-hand-pointing-up',
          action: this.toogleSelection,
          access: false
        },
        {
          label: 'Create',
          color: 'indigo',
          icon: 'mdi-plus',
          action: this.showCreateForm,
          access: !this.creatable
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
          color: 'deep-orange',
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
          return [1, 4].includes(check.status_id) && check.received
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
        (this.selectedChecks.length === 1 &&
        this.selectedChecks[0].status_id === 3 /* claimed */ &&
          this.actions.includes('clr')) ||
        this.actions.includes('imt')
      )
    },
    creatable() {
      return this.actions.includes('crt')
    },
    receivable() {
      return this.actions.includes('rcv')
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
    loading: {
      get() {
        return this.$store.getters['check/loading']
      },
      set(arg) {
        this.$store.commit('check/loading', arg)
      }
    }
  },
  methods: {
    toogleSelection() {
      this.$store.commit(
        'check/selecting',
        !this.$store.getters['check/selecting']
      )
    },
    refresh() {
      this.$store.commit('check/selectedChecks', [])
      this.$store.commit('check/pagination', {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 10,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: []
      })
    },
    async showCheck() {
      this.loading = true
      if (this.selectedChecks.length === 1) {
        await this.$store.dispatch('tools/getStatus')
        this.$store.dispatch('check/showCheck', this.selectedChecks[0].id)
      } else if (this.selectedChecks.length > 1) {
        setTimeout(() => {
          this.loading = false
          this.$store.commit('check/showSelected', true)
        }, 500)
      }
    },
    showCancelForm() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$store.commit('check/showCancel', true)
      }, 500)
    },
    showClaimForm() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$store.commit('check/showClaim', true)
      }, 500)
    },
    async showClearForm() {
      this.loading = true
      await this.$store.dispatch('tools/getAccounts')
      if (
        this.selectedChecks.length === 1 &&
        this.selectedChecks[0].status_id === 3 &&
        this.actions.includes('clr')
      ) {
        try {
          await this.$store.dispatch(
            'check/getCheck',
            this.selectedChecks[0].id
          )
          this.$store.commit('check/showClear', true)
        } catch (error) {
          return
        } finally {
          this.loading = false
        }
      } else if (this.actions.includes('trm')) {
        setTimeout(() => {
          this.loading = false
          this.$store.commit('check/showImportClear', true)
        }, 500)
      }
    },
    async showCreateForm() {
      this.loading = true
      try {
        await this.$store.dispatch('tools/getAccounts')
        this.$store.commit('check/showCreate', true)
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    },
    async showReceiveForm() {
      this.loading = true
      try {
        if (this.user.access.id < 4) {
          await this.$store.dispatch('tools/getReturnedTransmittals')
        } else {
          await this.$store.dispatch('tools/getSentTransmittals')
        }
        this.$store.commit('check/showReceive', true)
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    },
    async showReturnForm() {
      this.loading = true
      try {
        await this.$store.dispatch('tools/getReceivedTransmittals')
        this.$store.commit('check/showReturn', true)
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    },
    async showTransmitForm() {
      this.loading = true
      try {
        await this.$store.dispatch('tools/getBranches')
        this.$store.commit('check/showTransmit', true)
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
