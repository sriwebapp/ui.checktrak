<template>
  <v-card>
    <v-card-title>
      Branch Management
      <v-spacer></v-spacer>
      <v-btn class="indigo white--text" router :to="{ name: 'create-branch' }">
        New Branch
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="branches" :loading="loading">
        <template v-slot:item.incharge_id="{ item }">
          {{ item.incharge ? item.incharge.name : '' }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            small
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
      { text: 'In Charge', align: 'left', value: 'incharge_id' },
      { text: 'Actions', align: 'center', value: 'action', sortable: false }
    ]
  }),
  mounted() {
    this.$store.dispatch('branch/getBranches')
  }
}
</script>

<style></style>
