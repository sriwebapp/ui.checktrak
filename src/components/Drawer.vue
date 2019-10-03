<template>
  <v-navigation-drawer fixed dark clipped app v-model="visible" v-if="!loading">
    <template v-slot:prepend>
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

    <v-list dense rounded color="transparent">
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
    </v-list>

    <v-divider></v-divider>

    <v-list dense rounded color="transparent">
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
      if (!this.loading) {
        return this.admin.filter(item => {
          return this.modules.includes(item.code)
        })
      } else {
        return []
      }
    },
    loading() {
      return this.$store.getters.loading
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
    },
    misc() {
      return [
        {
          title: 'Data Imports',
          icon: 'mdi-file-upload-outline',
          route: '/import',
          condition: this.user.actionAccess.includes('imt')
        }
      ].filter(item => item.condition)
    }
  },
  data: () => ({
    admin: [
      {
        title: 'Accessibility',
        icon: 'mdi-door-closed-lock',
        route: '/access',
        code: 'acs'
      },
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
        title: 'Users',
        icon: 'mdi-account',
        route: '/user',
        code: 'usr'
      },
      {
        title: 'Groups',
        icon: 'mdi-account-group',
        route: '/group',
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
        icon: 'mdi-account-cash-outline',
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
