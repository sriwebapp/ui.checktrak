<template>
  <v-card>
    <v-card-title>Manage Account</v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-flex xs12>
          <v-text-field
            :value="account.code"
            label="Code"
            :loading="loading"
            prepend-icon="mdi-tag"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="account.bank"
            label="Bank"
            prepend-icon="mdi-bank"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="account.number"
            label="Account Number"
            prepend-icon="mdi-barcode-scan"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="account.address"
            label="Address"
            prepend-icon="mdi-account-badge-horizontal"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="account.tel"
            label="Telephone"
            prepend-icon="mdi-phone"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="account.email"
            label="Email"
            prepend-icon="mdi-email"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="account.contact_person"
            label="Contact Person"
            prepend-icon="mdi-account"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="account.designation"
            label="Designation"
            prepend-icon="mdi-account-badge-horizontal"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="account.fax"
            label="Fax"
            prepend-icon="mdi-fax"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="account.purpose"
            label="Purpose"
            prepend-icon="mdi-clipboard-list"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="indigo white--text"
        router
        :to="{ name: 'edit-account' }"
        :disabled="loading"
      >
        Edit
      </v-btn>

      <v-btn
        class="deep-orange white--text"
        router
        :to="{ name: 'accounts' }"
        :disabled="loading"
      >
        Return
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
  mounted() {
    this.$store.dispatch('account/getAccount', this.$route.params.id)
  }
}
</script>

<style></style>
