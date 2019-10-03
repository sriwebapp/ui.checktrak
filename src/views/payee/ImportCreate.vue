<template>
  <v-dialog v-model="show" persistent max-width="600">
    <v-card>
      <form @submit.prevent="importPayees">
        <v-card-title>
          Import Payees
          <v-spacer></v-spacer>
          <v-btn
            icon
            href="https://sriwebapp.github.io/ui.checktrak/"
            target="_blank"
          >
            <v-icon color="green">mdi-help-circle-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-file-input
                  ref="fileinput"
                  v-model="file"
                  label="Select File to be Imported"
                  show-size
                  :error-messages="error.get('payees_file')"
                  :disabled="loading"
                  :loading="loading"
                  @change="error.reset()"
                  prepend-icon="mdi-file-upload-outline"
                  accept=".csv"
                ></v-file-input>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            color="indigo white--text"
            :loading="loading"
            :disabled="!file || loading"
          >
            Start Importing
            <template v-slot:loader>
              <span>Importing...</span>
            </template>
          </v-btn>
          <v-btn
            color="deep-orange"
            outlined
            @click="show = false"
            :disabled="loading"
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
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['payee/loading']
    },
    show: {
      get() {
        return this.$store.getters['payee/showImportCreate']
      },
      set(arg) {
        this.$store.commit('payee/showImportCreate', arg)
      }
    }
  },
  data: () => ({
    file: null
  }),
  methods: {
    importPayees() {
      this.$store.dispatch('payee/importCreatePayees', this.file)
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        // this.$refs.fileinput.reset()
      }
    }
  }
}
</script>

<style></style>
