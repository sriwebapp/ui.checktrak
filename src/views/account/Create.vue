<template>
  <v-card>
    <v-card-title>Create Account</v-card-title>
    <form @submit.prevent="create" @keydown="error.clear($event.target.name)">
      <v-card-text>
        <v-container grid-list-md>
          <v-flex xs12>
            <v-text-field
              v-model="account.bank"
              :error-messages="error.get('bank')"
              name="bank"
              label="Bank"
              prepend-icon="mdi-bank"
              autofocus
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="account.number"
              :error-messages="error.get('number')"
              name="number"
              label="Account Number"
              prepend-icon="mdi-barcode-scan"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="account.address"
              :error-messages="error.get('address')"
              name="address"
              label="Address"
              prepend-icon="mdi-account-badge-horizontal"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="account.tel"
              :error-messages="error.get('tel')"
              name="tel"
              label="Telephone"
              prepend-icon="mdi-phone"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="account.email"
              :error-messages="error.get('email')"
              name="email"
              label="Email"
              prepend-icon="mdi-email"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="account.contact_person"
              :error-messages="error.get('contact_person')"
              name="contact_person"
              label="Contact Person"
              prepend-icon="mdi-account"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="account.designation"
              :error-messages="error.get('designation')"
              name="designation"
              label="Designation"
              prepend-icon="mdi-account-badge-horizontal"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="account.fax"
              :error-messages="error.get('fax')"
              name="fax"
              label="Fax"
              prepend-icon="mdi-fax"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="account.purpose"
              :error-messages="error.get('purpose')"
              name="purpose"
              label="Purpose"
              prepend-icon="mdi-clipboard-list"
            ></v-text-field>
          </v-flex>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" class="indigo white--text" :loading="loading">
          Save
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
    </form>
  </v-card>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['account/loading']
    }
  },
  data: () => ({
    account: {}
  }),
  methods: {
    create() {
      this.$store.dispatch('account/create', this.account)
    }
  }
}
</script>

<style></style>
