<template>
  <v-navigation-drawer
    fixed
    dark
    clipped
    app
    v-model="visible"
    v-if="!loading"
    :mini-variant-width="60"
    :mini-variant="visible === 2"
    width="240"
  >
    <template v-slot:prepend>
      <v-list-item class="my-3" @click="uploadAvatar">
        <v-list-item-avatar size="35">
          <v-img :src="avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="font-size: 17.5px;">
            {{ user.name }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
    </template>

    <v-list dense nav color="transparent">
      <v-list-item
        active-class="deep-orange darken-4"
        v-for="item in admin"
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
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    admin() {
      if (!this.loading) {
        return [
          {
            title: 'Accessibility',
            icon: 'mdi-door-closed-lock',
            route: '/access',
            code: 'acs'
          },
          {
            title: 'Companies',
            icon: 'mdi-home-city',
            route: '/company/' + this.$store.getters['tools/company'].code,
            code: 'cmp'
          },
          {
            title: 'Branches',
            icon: 'mdi-source-branch',
            route: '/branch',
            code: 'bra'
          },
          {
            title: 'Groups',
            icon: 'mdi-account-group',
            route: '/group',
            code: 'usr'
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
            title: 'Check Books',
            icon: 'mdi-book-open-page-variant',
            route: '/check-book',
            code: 'cbk'
          },
          {
            title: 'Payees',
            icon: 'mdi-account-cash-outline',
            route: '/payee',
            code: 'pye'
          }
        ]
          .filter(item => {
            return this.modules.includes(item.code)
          })
          .concat(this.check)
          .concat(this.misc)
      } else {
        return []
      }
    },
    avatar() {
      return process.env.VUE_APP_API + '/images/avatar/' + this.user.avatar
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
          title: 'Reports',
          icon: 'mdi-file-download-outline',
          route: '/report',
          condition: this.user.reportAccess.length
        }
      ].filter(item => item.condition)
    }
  },
  data: () => ({
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
    },
    uploadAvatar() {
      this.$store.commit('showAvatar', true)
    }
  }
}
</script>
