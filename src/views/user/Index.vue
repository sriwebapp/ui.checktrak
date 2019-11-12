<template>
  <v-card outlined :loading="loading">
    <v-card-title>
      <span style="font-size: 17.5px">
        User Management
      </span>
      <div class="flex-grow-1"></div>
      <v-btn
        class="indigo white--text"
        small
        router
        :to="{ name: 'create-user' }"
        :disabled="loading"
      >
        New User
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="users"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
        <template v-slot:body="{ items }" v-if="users.length">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.branch ? item.branch.name : '' }}</td>
              <td>{{ item.access.name }}</td>
              <td class="text-center">
                <v-icon
                  small
                  :class="item.active ? 'green--text' : 'red--text'"
                  >{{
                    item.active
                      ? 'mdi-check-circle-outline'
                      : 'mdi-close-circle-outline'
                  }}</v-icon
                >
              </td>
              <td class="text-center">
                <v-avatar size="30" class="mx-1">
                  <v-img :src="avatar(item)"></v-img>
                </v-avatar>
              </td>
              <td class="text-center">
                <v-btn
                  x-small
                  class="info mr-2"
                  router
                  :to="{ name: 'edit-user', params: { id: item.id } }"
                  :disabled="loading"
                >
                  Update
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.getters['user/users']
    },
    loading() {
      return this.$store.getters['user/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Name', align: 'left', value: 'name', width: '25%' },
      { text: 'Username', align: 'left', value: 'username', width: '15%' },
      { text: 'Branch', align: 'left', value: 'branch_id', width: '15%' },
      { text: 'Access', align: 'left', value: 'access_id', width: '15%' },
      { text: 'Active', align: 'center', value: 'active', width: '9%' },
      {
        text: 'Avatar',
        align: 'center',
        value: 'avatar',
        sortable: false,
        width: '9%'
      },
      {
        text: 'Actions',
        align: 'center',
        value: 'action',
        sortable: false,
        width: '12%'
      }
    ]
  }),
  methods: {
    avatar(user) {
      return process.env.VUE_APP_API + '/images/avatar/' + user.avatar
    }
  },
  mounted() {
    this.$store.dispatch('user/getUsers')
  }
}
</script>

<style></style>
