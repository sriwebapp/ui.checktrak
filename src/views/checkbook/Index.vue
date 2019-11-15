<template>
  <v-card outlined>
    <v-card-title>
      <span style="font-size: 17.5px">Check Book Management</span>
      <v-spacer></v-spacer>
      <v-btn
        class="indigo white--text"
        :disabled="loading"
        small
        router
        :to="{ name: 'create-checkbook' }"
      >
        New Check Book
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="checkbooks"
        :loading="loading"
        :options.sync="pagination"
        :footer-props="{ itemsPerPageOptions: [10, 20, 50] }"
        :server-items-length="totalItems"
      >
        <template
          v-if="checkbooks && checkbooks.length"
          v-slot:body="{ items }"
        >
          <tbody>
            <tr
              v-for="(item, key) in items"
              :key="key"
              :class="
                item.totalChecks === item.postedChecks ? 'green lighten-5' : ''
              "
            >
              <td>{{ item.account.code }}</td>
              <td>{{ item.start_series }}</td>
              <td>{{ item.end_series }}</td>
              <td class="text-center">{{ item.totalChecks }}</td>
              <td class="text-center">{{ item.postedChecks }}</td>
              <td class="text-center">{{ item.availableChecks }}</td>
              <td class="text-center">
                <v-btn
                  icon
                  color="indigo"
                  small
                  :disabled="loading"
                  router
                  :to="{ name: 'show-checkbook', params: { id: item.id } }"
                >
                  <v-icon>mdi-open-in-app</v-icon>
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
    checkbooks() {
      return this.$store.getters['checkbook/checkbooks'].data
    },
    loading() {
      return this.$store.getters['checkbook/loading']
    },
    totalItems() {
      return this.$store.getters['checkbook/checkbooks'].total
    }
  },
  data: () => ({
    headers: [
      { text: 'Account', align: 'left', value: 'account_id', width: '19%' },
      {
        text: 'Series Start',
        align: 'left',
        value: 'start_series',
        width: '15%'
      },
      {
        text: 'Series End',
        align: 'left',
        value: 'end_series',
        width: '15%'
      },
      {
        text: 'Checks',
        align: 'center',
        value: 'totalChecks',
        width: '12%',
        sortable: false
      },
      {
        text: 'Posted',
        align: 'center',
        value: 'postedChecks',
        width: '12%',
        sortable: false
      },
      {
        text: 'Available',
        align: 'center',
        value: 'availableChecks',
        width: '12%',
        sortable: false
      },
      {
        text: 'View',
        align: 'center',
        value: 'action',
        width: '15%',
        sortable: false
      }
    ],
    pagination: {}
  }),
  created() {
    this.debouncedGetCheckbook = this._.debounce(this.getCheckbooks, 500)
  },
  methods: {
    getCheckbooks() {
      this.$store.dispatch('checkbook/getCheckbooks', this.pagination)
    }
  },
  mounted() {
    this.pagination = {
      groupBy: [],
      groupDesc: [],
      itemsPerPage: 10,
      multiSort: false,
      mustSort: false,
      page: 1,
      sortBy: [],
      sortDesc: []
    }
  },

  watch: {
    pagination: {
      deep: true,
      handler() {
        this.debouncedGetCheckbook()
      }
    }
  }
}
</script>

<style></style>
