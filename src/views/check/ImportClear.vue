<template>
  <v-dialog v-model="show" persistent max-width="400">
    <v-card :loading="importing">
      <form @submit.prevent="importChecks">
        <v-card-title>
          <span style="font-size: 17.5px">
            Import Cleared Checks
          </span>
          <v-spacer></v-spacer>
          <v-btn
            small
            icon
            href="https://sriwebapp.github.io/ui.checktrak/"
            target="_blank"
          >
            <v-icon color="green">mdi-help-circle-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap class="px-5">
            <v-flex xs12>
              <v-select
                v-model="account_id"
                :error-messages="error.get('account_id')"
                name="account_id"
                label="Account"
                :disabled="importing"
                prepend-icon="mdi-bank"
                :items="accounts"
                item-text="number"
                item-value="id"
              ></v-select>
            </v-flex>

            <v-flex xs12>
              <v-file-input
                ref="fileinput"
                v-model="file"
                label="Select File to be Imported"
                show-size
                :error-messages="error.get('clear_checks_file')"
                :disabled="importing"
                @change="error.reset()"
                prepend-icon="mdi-file-upload-outline"
                accept=".csv"
              ></v-file-input>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            small
            color="indigo white--text"
            :loading="importing"
            :disabled="!file || importing"
          >
            Start Importing
            <template v-slot:loader>
              <span>Importing...</span>
            </template>
          </v-btn>
          <v-btn
            color="deep-orange"
            small
            outlined
            @click="show = false"
            :disabled="importing"
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
    accounts() {
      return this.$store.getters['tools/accounts'].map(account => {
        return {
          id: account.id,
          number: account.code + ' ' + account.number
        }
      })
    },
    error() {
      return this.$store.getters.error
    },
    importing() {
      return this.$store.getters['check/importing']
    },
    show: {
      get() {
        return this.$store.getters['check/showImportClear']
      },
      set(arg) {
        this.$store.commit('check/showImportClear', arg)
      }
    }
  },
  data: () => ({
    file: null,
    account_id: null
  }),
  methods: {
    importChecks() {
      this.$store.dispatch('check/importClearChecks', {
        file: this.file,
        account: this.account_id
      })
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.account_id = null
        this.error.reset()
        this.file = null
      }
    }
  }
}
</script>

<style></style>
