<template>
  <v-card>
    <v-card-title>User Group Management</v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="groups" :loading="loading">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.name }}</td>
              <td class="text-center">
                <v-chip small outlined :class="decrypt(item.action).color">
                  {{ decrypt(item.action).text }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip small outlined :class="decrypt(item.branch).color">
                  {{ decrypt(item.branch).text }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip small outlined :class="decrypt(item.module).color">
                  {{ decrypt(item.module).text }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-btn
                  small
                  class="info"
                  :disabled="loading"
                  router
                  :to="{ name: 'group-access', params: { id: item.id } }"
                >
                  Manage
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
    groups() {
      return this.$store.getters['group/groups']
    },
    loading() {
      return this.$store.getters['group/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Actions', align: 'center', value: 'action', sortable: false },
      { text: 'Branch', align: 'center', value: 'branch', sortable: false },
      { text: 'Module', align: 'center', value: 'module', sortable: false },
      { text: 'Manage', align: 'center', value: 'manage', sortable: false }
    ]
  }),
  methods: {
    decrypt(code) {
      if (code === 2) {
        return { text: 'All', color: 'primary' }
      } else if (code === 1) {
        return { text: 'Selected', color: 'success' }
      } else {
        return { text: 'Custom', color: 'warning' }
      }
    }
  },
  mounted() {
    this.$store.dispatch('group/getGroups')
  }
}
</script>

<style></style>
