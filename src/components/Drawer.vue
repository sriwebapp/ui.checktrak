<template>
  <v-navigation-drawer fixed dark clipped app v-model="visible">
    <v-list dense nav>
      <v-list-item
        v-for="item in items"
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
    items: [
      { title: 'Company Management', icon: 'mdi-home-city', route: '/company' },
      { title: 'Branch Management', icon: 'mdi-compass', route: '/branch' },
      {
        title: 'Group Management',
        icon: 'mdi-account-group',
        route: '/group'
      },
      { title: 'User Management', icon: 'mdi-account', route: '/user' }
    ]
  })
}
</script>
