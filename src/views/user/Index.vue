<template>
  <v-card>
    <v-card-title>
      <span class="title">
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
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
        <template v-slot:body="{ items }">
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
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Username', align: 'left', value: 'username' },
      { text: 'Branch', align: 'left', value: 'branch_id' },
      { text: 'Access', align: 'left', value: 'access_id' },
      { text: 'Active', align: 'center', value: 'active' },
      { text: 'Actions', align: 'center', value: 'action', sortable: false }
    ]
  }),
  mounted() {
    this.$store.dispatch('user/getUsers')
  }
}
</script>

<style></style>
