<template>
  <v-dialog v-model="show" persistent max-width="400">
    <v-card>
      <form @submit.prevent="importChecks">
        <v-card-title>
          <span class="title">
            Import Checks
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
              <v-file-input
                ref="fileinput"
                v-model="file"
                label="Select File to be Imported"
                show-size
                :error-messages="error.get('checks_file')"
                :disabled="importing"
                :loading="importing"
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
    error() {
      return this.$store.getters.error
    },
    importing() {
      return this.$store.getters['check/importing']
    },
    show: {
      get() {
        return this.$store.getters['check/showImportCreate']
      },
      set(arg) {
        this.$store.commit('check/showImportCreate', arg)
      }
    }
  },
  data: () => ({
    file: null
  }),
  methods: {
    importChecks() {
      this.$store.dispatch('check/importCreateChecks', this.file)
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
