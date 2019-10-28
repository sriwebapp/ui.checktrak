<template>
  <v-navigation-drawer
    v-model="visible"
    color="indigo lighten-4"
    right
    temporary
    fixed
  >
    <v-list dense shaped color="transparent">
      <v-list-item>
        <v-list-item-content class="mb-n4" style="font-size: 21px">
          <p class="text-center">
            Select Filter
          </p>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-3"></v-divider>

      <v-list-item
        :class="filter === item.value ? 'indigo darken-2' : ''"
        v-for="item in filters"
        :key="item.value"
        :dark="filter === item.value"
        @click="selectFilter(item.value)"
        loading
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    filter: {
      get() {
        return this.$store.getters['check/filter']
      },
      set(arg) {
        this.$store.commit('check/filter', arg)
      }
    },
    visible: {
      get() {
        return this.$store.getters.filter
      },
      set(arg) {
        this.$store.commit('filter', arg)
      }
    }
  },
  data: () => ({
    filters: [
      { value: 1, text: 'Bank Account', icon: 'mdi-bank' },
      { value: 2, text: 'Payee', icon: 'mdi-account-cash-outline' },
      {
        value: 3,
        text: 'Transmittal Reference',
        icon: 'mdi-bank-transfer-out'
      },
      {
        value: 4,
        text: 'Date Posted',
        icon: 'mdi-calendar'
      },
      {
        value: 5,
        text: 'Check Number',
        icon: 'mdi-tag-text-outline'
      },
      {
        value: 6,
        text: 'Check Details',
        icon: 'mdi-clipboard-list-outline'
      },
      {
        value: 7,
        text: 'Check Status',
        icon: 'mdi-tag-text-outline'
      },
      {
        value: 0,
        text: 'Clear Filter',
        icon: 'mdi-close-box-outline'
      }
    ]
  }),
  methods: {
    async selectFilter(arg) {
      switch (arg) {
        case 1:
          await this.$store.dispatch('tools/getAccounts')
          break
        case 7:
          await this.$store.dispatch('tools/getStatus')
          break
        case 0:
          this.visible = false
          break
      }
      this.filter = arg
    }
  }
}
</script>

<style></style>
