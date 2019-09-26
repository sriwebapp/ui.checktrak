<template>
  <v-dialog v-model="show" persistent max-width="600">
    <v-card>
      <form @submit.prevent="importChecks">
        <v-card-title>Import Checks</v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-file-input
                  ref="fileinput"
                  v-model="file"
                  label="Select File to be Imported"
                  :disabled="importing"
                  show-size
                  @change="error.reset()"
                  :error-messages="error.get('checks_file')"
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
            :loading="importing"
            :disabled="!file"
          >
            Create
          </v-btn>
          <v-btn
            color="deep-orange"
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
    error() {
      return this.$store.getters.error
    },
    importing() {
      return this.$store.getters['check/importing']
    },
    show: {
      get() {
        return this.$store.getters['check/showImport']
      },
      set(arg) {
        this.$store.commit('check/showImport', arg)
      }
    }
  },
  data: () => ({
    file: null
  }),
  methods: {
    importChecks() {
      this.$store.dispatch('check/importChecks', this.file)
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.$refs.fileinput.reset()
      }
    }
  }
}
</script>

<style></style>
