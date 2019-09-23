<template>
  <v-card>
    <v-card-title>Accessibility Management</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="access"
        :loading="loading"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
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
                <v-chip small outlined :class="decrypt(item.group).color">
                  {{ decrypt(item.group).text }}
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
                  :to="{ name: 'edit-access', params: { id: item.id } }"
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
    access() {
      return this.$store.getters['access/accesses']
    },
    loading() {
      return this.$store.getters['access/loading']
    }
  },
  data: () => ({
    headers: [
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Actions', align: 'center', value: 'action', sortable: false },
      { text: 'Group', align: 'center', value: 'group', sortable: false },
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
    this.$store.dispatch('access/getAccesses')
  }
}
</script>

<style></style>
