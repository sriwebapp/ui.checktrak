<template>
  <v-dialog v-model="show" max-width="600">
    <v-card>
      <div>
        <v-card-title>Show Check</v-card-title>
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
                  readonly
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
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.payee ? check.payee.name : ''"
                  label="Payee"
                  prepend-icon="mdi-account-cash-outline"
                  hide-details
                  class="mb-3"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.amount"
                  label="Amount"
                  prepend-icon="mdi-currency-php"
                  hide-details
                  class="mb-3"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.details"
                  label="Details"
                  prepend-icon="mdi-clipboard-list-outline"
                  hide-details
                  class="mb-3"
                  placeholder=" "
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.date"
                  label="Created"
                  prepend-icon="mdi-calendar"
                  hide-details
                  class="mb-3"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.status ? check.status.name : ''"
                  label="Status"
                  prepend-icon="mdi-tag-text-outline"
                  hide-details
                  class="mb-3"
                  readonly
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  :value="check.branch ? check.branch.name : ''"
                  label="Branch"
                  prepend-icon="mdi-map-marker"
                  hide-details
                  class="mb-3"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn outlined color="indigo">
            History
          </v-btn>
          <v-btn color="deep-orange" outlined @click="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    check() {
      return this.$store.getters['check/check']
    },
    show: {
      get() {
        return this.$store.getters['check/showCheck']
      },
      set(arg) {
        this.$store.commit('check/showCheck', arg)
      }
    }
  },
  methods: {}
}
</script>

<style></style>
