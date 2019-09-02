<template>
  <v-container>
    <v-card>
      <v-card-title>
        User Management
        <div class="flex-grow-1"></div>
        <v-btn class="indigo white--text" router :to="{ name: 'create-user' }">
          New User
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="users" :loading="loading">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.branch.name }}</td>
                <td>{{ item.group.name }}</td>
                <td class="text-center">
                  <v-btn
                    small
                    class="info mr-2"
                    router
                    :to="{ name: 'edit-user', params: { id: item.id } }"
                  >
                    Update
                  </v-btn>
                  <v-btn
                    small
                    class="warning"
                    router
                    :to="{ name: 'user-access', params: { id: item.id } }"
                  >
                    Access
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template></v-data-table
        >
      </v-card-text>
    </v-card>
  </v-container>
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
      { text: 'Email', align: 'left', value: 'email' },
      { text: 'Branch', align: 'left', value: 'branch_id' },
      { text: 'Group', align: 'left', value: 'group_id' },
      { text: 'Actions', align: 'center', value: 'action', sortable: false }
    ],
    selected: []
  }),
  methods: {
    getUser() {
      this.$store.dispatch('user/getUsers')
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style></style>
