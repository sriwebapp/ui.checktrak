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
      <v-layout class="mb-5 mt-n4" justify-end>
        <v-flex xs4>
          <v-text-field
            v-model="search"
            append-icon="mdi-file-document-box-search-outline"
            label="Search"
            single-line
            hide-details
            autofocus
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-data-table
        :headers="headers"
        :items="groups"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
        :search="search"
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
      { text: 'Branch', align: 'left', value: 'branch_id', width: '25%' },
      { text: 'Name', align: 'left', value: 'name', width: '25%' },
      { text: 'Active', align: 'center', value: 'active', width: '10%' },
      {
        text: 'Incharge',
        align: 'center',
        value: 'incharge',
        sortable: false,
        width: '25%'
      },
      {
        text: 'Actions',
        align: 'center',
        value: 'action',
        sortable: false,
        width: '15%'
      }
    ],
    search: ''
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
