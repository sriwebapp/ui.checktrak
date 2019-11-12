<template>
  <v-card outlined :loading="loading">
    <v-card-title style="font-size: 17.5px">Edit Account </v-card-title>
    <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md6 class="px-5">
            <v-flex xs12>
              <v-text-field
                :value="code"
                label="Code"
                prepend-icon="mdi-tag"
                readonly
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedAccount.bank"
                :error-messages="error.get('bank')"
                name="bank"
                label="Bank"
                prepend-icon="mdi-bank"
                required
                autofocus
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedAccount.number"
                :error-messages="error.get('number')"
                name="number"
                label="Account Number"
                prepend-icon="mdi-barcode-scan"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedAccount.purpose"
                :error-messages="error.get('purpose')"
                name="purpose"
                label="Purpose"
                prepend-icon="mdi-clipboard-list"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedAccount.address"
                :error-messages="error.get('address')"
                name="address"
                label="Address"
                prepend-icon="mdi-account-badge-horizontal"
              ></v-text-field>
            </v-flex>
          </v-flex>

          <v-flex xs12 md6 class="px-5">
            <v-flex xs12>
              <v-text-field
                v-model="editedAccount.tel"
                :error-messages="error.get('tel')"
                name="tel"
                label="Telephone"
                prepend-icon="mdi-phone"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedAccount.email"
                :error-messages="error.get('email')"
                name="email"
                label="Email"
                prepend-icon="mdi-email"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedAccount.contact_person"
                :error-messages="error.get('contact_person')"
                name="contact_person"
                label="Contact Person"
                prepend-icon="mdi-account"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedAccount.designation"
                :error-messages="error.get('designation')"
                name="designation"
                label="Designation"
                prepend-icon="mdi-account-badge-horizontal"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedAccount.fax"
                :error-messages="error.get('fax')"
                name="fax"
                label="Fax"
                prepend-icon="mdi-fax"
              ></v-text-field>
            </v-flex>
          </v-flex>

          <v-flex xs12 class="px-5">
            <v-switch v-model="active" color="indigo" label="Active"></v-switch>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          small
          class="indigo white--text"
          :loading="loading"
          :disabled="noChanges"
        >
          Update
        </v-btn>

        <v-btn
          class="deep-orange white--text"
          small
          router
          :to="{ name: 'show-account' }"
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
    active: {
      get() {
        return this.editedAccount.active
      },
      set(arg) {
        this.editedAccount.active = arg ? 1 : 0
      }
    },
    code() {
      const bank = this.editedAccount.bank
        ? this.editedAccount.bank.toUpperCase()
        : ''
      const number = this.editedAccount.number
        ? this.editedAccount.number.replace(/-/g, '').slice(-2)
        : ''
      const code = bank.length && number.length > 1 ? bank + '-' + number : ''
      return code
    },
    editedAccount: {
      get() {
        return this.$store.getters['account/editedAccount']
      },
      set(arg) {
        this.commit('account/editedAccount', arg)
      }
    },
    account() {
      return this.$store.getters['account/account']
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['account/loading']
    },
    noChanges() {
      return this._.isEqual(this.account, this.editedAccount)
    }
  },
  methods: {
    edit() {
      this.$store.dispatch('account/edit', this.editedAccount)
    }
  },
  mounted() {
    this.$store.dispatch('account/getAccount', this.$route.params.id)
  }
}
</script>

<style></style>
