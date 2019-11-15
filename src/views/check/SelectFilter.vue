<template>
  <v-navigation-drawer
    v-model="visible"
    color="deep-orange lighten-5"
    right
    temporary
    fixed
  >
    <v-list dense shaped color="transparent">
      <v-list-item>
        <v-list-item-content class="mb-n2" style="font-size: 21px">
          <p class="text-center">Select Filter</p>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        class="my-2"
        :class="filter.includes(item.value) ? 'indigo darken-2' : ''"
        v-for="item in filters"
        :key="item.value"
        :dark="filter.includes(item.value)"
        @click="selectFilter(item.value)"
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

      if (!arg) {
        this.filter = []
        return
      }

      let filter = Array.from(this.filter)

      !filter.includes(arg)
        ? filter.push(arg)
        : filter.splice(filter.indexOf(arg), 1)

      this.filter = filter.sort()
    }
  }
}
</script>

<style></style>
