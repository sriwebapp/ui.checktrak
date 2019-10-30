<template>
  <v-card outlined :loading="loading">
    <v-card-title>
      <span style="font-size: 17.5px">
        Group Management
      </span>
      <v-spacer></v-spacer>
      <v-btn
        class="indigo white--text"
        small
        router
        :to="{ name: 'create-group' }"
      >
        New Group
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="groups"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
        <template v-slot:item.branch_id="{ item }">
          {{ item.branch.name }}
        </template>
        <template v-slot:item.active="{ item }">
          <v-icon small :class="item.active ? 'green--text' : 'red--text'">{{
            item.active
              ? 'mdi-check-circle-outline'
              : 'mdi-close-circle-outline'
          }}</v-icon>
        </template>

        <template v-slot:item.incharge="{ item }">
          <v-tooltip top v-for="i in item.incharge" :key="i.id">
            <template v-slot:activator="{ on }">
              <v-avatar size="30" class="mr-1" v-on="on">
                <v-img :src="avatar(i)"></v-img>
              </v-avatar>
            </template>
            <span> {{ i.name }} </span>
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
    ]
  }),
  methods: {
    avatar(incharge) {
      return process.env.VUE_APP_API + '/images/avatar/' + incharge.avatar
    }
  },
  mounted() {
    this.$store.dispatch('group/getGroups')
  }
}
</script>

<style></style>
