<template>
  <v-card>
    <v-card-title>
      Group Management
      <v-spacer></v-spacer>
      <v-btn class="indigo white--text" router :to="{ name: 'create-group' }">
        New Group
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-layout class="mb-5">
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          append-icon="mdi-account-search-outline"
          label="Search"
          single-line
          hide-details
          autofocus
        ></v-text-field>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="groups"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
        :search="search"
      >
        <template v-slot:item.branch_id="{ item }">
          {{ item.branch.name }}
        </template>
        <template v-slot:item.active="{ item }">
          <v-icon :class="item.active ? 'green--text' : 'red--text'">{{
            item.active
              ? 'mdi-check-circle-outline'
              : 'mdi-close-circle-outline'
          }}</v-icon>
        </template>

        <template v-slot:item.incharge="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-chip
                :class="item.incharge.length ? 'primary' : ''"
                v-on="on"
                small
                outlined
              >
                {{ item.incharge.length }}
              </v-chip>
            </template>
            <span>
              {{ '[ ' + item.incharge.map(i => i.username).join(', ') + ' ]' }}
            </span>
          </v-tooltip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            x-small
            class="info"
            :disabled="loading"
            router
            :to="{ name: 'edit-group', params: { id: item.id } }"
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
    groups() {
      return this.$store.getters['group/groups']
    },
    loading() {
      return this.$store.getters['group/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Branch', align: 'left', value: 'branch_id' },
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Active', align: 'center', value: 'active' },
      { text: 'Incharge', align: 'center', value: 'incharge', sortable: false },
      { text: 'Actions', align: 'center', value: 'action', sortable: false }
    ],
    search: ''
  }),
  mounted() {
    this.$store.dispatch('group/getGroups')
  }
}
</script>

<style></style>
