<template>
  <v-navigation-drawer fixed dark clipped app v-model="visible">
    <template v-slot:prepend v-if="!logging">
      <v-list-item class="my-3">
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.name }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
    </template>

    <v-list v-if="!logging" dense rounded>
      <v-list-item
        active-class="indigo darken-2"
        v-for="item in adminModules"
        :key="item.title"
        link
        :to="item.route"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        active-class="indigo darken-2"
        v-for="item in check"
        :key="item.title"
        link
        :to="item.route"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-3">
        <v-btn block rounded color="deep-orange" @click="logout" elevation="10">
          Logout
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    adminModules() {
      if (!this.logging) {
        return this.admin.filter(item => {
          return this.modules.includes(item.code)
        })
      } else {
        return []
      }
    },
    logging() {
      return this.$store.getters['auth/logging']
    },
    modules() {
      return this.user.moduleAccess
    },
    user() {
      return this.$store.getters['auth/user']
    },
    visible: {
      get() {
        return this.$store.getters.drawer
      },
      set(arg) {
        this.$store.commit('drawer', arg)
      }
    }
  },
  data: () => ({
    admin: [
      {
        title: 'Companies',
        icon: 'mdi-home-city',
        route: '/company',
        code: 'cmp'
      },
      {
        title: 'Branches',
        icon: 'mdi-source-branch',
        route: '/branch',
        code: 'bra'
      },
      {
        title: 'Accessibility',
        icon: 'mdi-door-closed-lock',
        route: '/access',
        code: 'acs'
      },
      {
        title: 'Users',
        icon: 'mdi-account',
        route: '/user',
        code: 'usr'
      },
      {
        title: 'Bank Accounts',
        icon: 'mdi-bank',
        route: '/account',
        code: 'acc'
      },
      {
        title: 'Payees',
        icon: 'mdi-bank-transfer-in',
        route: '/payee',
        code: 'pye'
      }
    ],
    check: [
      {
        title: 'Check Masterlist',
        icon: 'mdi-checkbook',
        route: '/check'
      },
      {
        title: 'Check Transmittal',
        icon: 'mdi-bank-transfer-out',
        route: '/transmittal'
      }
    ]
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
