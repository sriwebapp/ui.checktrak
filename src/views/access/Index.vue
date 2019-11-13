<template>
  <v-card outlined :loading="loading">
    <v-card-title style="font-size: 17.5px">
      Accessibility Management
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="access"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
      >
        <template v-slot:body="{ items }" v-if="access.length">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.name }}</td>
              <td class="text-center" :class="'ct-status-'+decrypt(item.action).color">
                {{ decrypt(item.action).text }}
              </td>
              <td class="text-center" :class="'ct-status-'+decrypt(item.group).color">
                {{ decrypt(item.group).text }}
              </td>
              <td class="text-center" :class="'ct-status-'+decrypt(item.module).color">
                {{ decrypt(item.module).text }}
              </td>
              <td class="text-center">
                <v-btn
                  x-small
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
