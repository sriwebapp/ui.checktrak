<template>
  <v-card outlined :loading="loading">
    <v-card-title>
      <span style="font-size: 17.5px">
        Branch Management
      </span>
      <v-spacer></v-spacer>
      <v-btn
        class="indigo white--text"
        small
        router
        :to="{ name: 'create-branch' }"
      >
        New Branch
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="branches"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
        <template v-slot:item.users="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-chip
                :class="item.users.length ? 'primary' : ''"
                v-on="on"
                x-small
                outlined
              >
                {{ item.users.length }}
              </v-chip>
            </template>
            <span>
              {{
                '[ ' + item.users.map(user => user.username).join(', ') + ' ]'
              }}
            </span>
          </v-tooltip>
        </template>
        <template v-slot:item.groups="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-chip
                :class="item.groups.length ? 'primary' : ''"
                v-on="on"
                x-small
                outlined
              >
                {{ item.groups.length }}
              </v-chip>
            </template>
            <span>
              {{
                '[ ' + item.groups.map(group => group.name).join(', ') + ' ]'
              }}
            </span>
          </v-tooltip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            x-small
            class="info"
            :disabled="loading"
            router
            :to="{ name: 'edit-branch', params: { id: item.id } }"
          >
            Update
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    branches() {
      return this.$store.getters['branch/branches']
    },
    loading() {
      return this.$store.getters['branch/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Code', align: 'left', value: 'code' },
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Users', align: 'center', value: 'users', sortable: false },
      { text: 'Groups', align: 'center', value: 'groups', sortable: false },
      { text: 'Actions', align: 'center', value: 'action', sortable: false }
    ]
  }),
  mounted() {
    this.$store.dispatch('branch/getBranches')
  }
}
</script>

<style></style>
