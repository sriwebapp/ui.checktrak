<template>
  <v-card :loading="loading" outlined>
    <v-card-title style="font-size: 17.5px">Manage Account </v-card-title>
    <v-card-text>
      <v-container>
        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-tag</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.code }}</v-list-item-title>
            <v-list-item-subtitle>Code</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-bank</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.bank }}</v-list-item-title>
            <v-list-item-subtitle>Bank</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-barcode-scan</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.number }}</v-list-item-title>
            <v-list-item-subtitle>Account Number</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-clipboard-list</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.purpose }}</v-list-item-title>
            <v-list-item-subtitle>Purpose</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-account-badge-horizontal</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.address }}</v-list-item-title>
            <v-list-item-subtitle>Address</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-phone</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.tel }}</v-list-item-title>
            <v-list-item-subtitle>Telephone</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-email</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.email }}</v-list-item-title>
            <v-list-item-subtitle>Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.contact_person }}</v-list-item-title>
            <v-list-item-subtitle>Contact Person</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-account-badge-horizontal</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.designation }}</v-list-item-title>
            <v-list-item-subtitle>Designation</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-fax</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ account.fax }}</v-list-item-title>
            <v-list-item-subtitle>Fax</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-toggle-switch-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ account.active ? 'Active' : 'Inactive' }}
            </v-list-item-title>
            <v-list-item-subtitle>Status</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-bell-ring-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ account.reorder_point }}
            </v-list-item-title>
            <v-list-item-subtitle>Reorder Point</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="indigo white--text"
        small
        router
        :to="{ name: 'edit-account' }"
        :disabled="loading"
      >
        Edit
      </v-btn>

      <v-btn
        class="deep-orange white--text"
        small
        router
        :to="{ name: 'accounts' }"
        :disabled="loading"
      >
        Return
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon small @click="showDelete" :disabled="loading">
        <v-icon color="red">mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.getters['account/account']
    },
    loading() {
      return this.$store.getters['account/loading']
    }
  },
  methods: {
    showDelete() {
      this.$store.commit('account/showDelete', true)
    }
  },
  mounted() {
    this.$store.dispatch('account/getAccount', this.$route.params.id)
  }
}
</script>

<style></style>
