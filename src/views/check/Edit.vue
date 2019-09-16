<template>
  <v-dialog v-model="show" persistent max-width="600">
    <v-card>
      <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
        <v-card-title>Edit Check</v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  :value="check.account ? check.account.code : ''"
                  label="Account"
                  prepend-icon="mdi-bank"
                  hide-details
                  class="mb-3"
                  disabled
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.number"
                  label="Check Number"
                  prepend-icon="mdi-tag-text-outline"
                  hide-details
                  class="mb-3"
                  placeholder=" "
                  disabled
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.payee ? check.payee.name : ''"
                  label="Payee"
                  prepend-icon="mdi-account-cash-outline"
                  hide-details
                  class="mb-3"
                  disabled
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.amount"
                  label="Amount"
                  prepend-icon="mdi-currency-php"
                  hide-details
                  class="mb-3"
                  disabled
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.date"
                  label="Created"
                  prepend-icon="mdi-calendar"
                  hide-details
                  class="mb-3"
                  disabled
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  v-model="check.details"
                  :error-messages="error.get('details')"
                  name="details"
                  label="Details"
                  prepend-icon="mdi-clipboard-list-outline"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" color="orange white--text" :loading="editing">
            Edit
          </v-btn>
          <v-btn
            color="deep-orange"
            outlined
            @click="show = false"
            :disabled="editing"
          >
            Return
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    check() {
      return this.$store.getters['check/check']
    },
    editing() {
      return this.$store.getters['check/editing']
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showEdit']
      },
      set(arg) {
        this.$store.commit('check/showEdit', arg)
      }
    }
  },
  methods: {
    edit() {
      this.$store.dispatch('check/edit', this.check)
    }
  }
}
</script>

<style></style>
