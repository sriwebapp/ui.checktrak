<template>
  <v-row justify="center">
    <v-card width="600">
      <v-card-title class="title">Edit Branch</v-card-title>
      <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
        <v-card-text>
          <v-layout row wrap class="px-5">
            <v-flex xs12>
              <v-text-field
                v-model="editedBranch.code"
                :error-messages="error.get('code')"
                name="code"
                label="Branch Code"
                prepend-icon="mdi-tag"
                autofocus
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedBranch.name"
                :error-messages="error.get('name')"
                name="name"
                label="Branch Name"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
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
            :to="{ name: 'branches' }"
            :disabled="loading"
          >
            Return
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-row>
</template>

<script>
export default {
  computed: {
    branch() {
      return this.$store.getters['branch/branch']
    },
    editedBranch: {
      get() {
        return this.$store.getters['branch/editedBranch']
      },
      set(arg) {
        this.$store.commit('branch/editedBranch', arg)
      }
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['branch/loading']
    },
    noChanges() {
      return this._.isEqual(this.branch, this.editedBranch)
    }
  },
  methods: {
    edit() {
      this.$store.dispatch('branch/edit', this.editedBranch)
    }
  },
  mounted() {
    this.$store.dispatch('branch/getBranch', this.$route.params.id)
  }
}
</script>

<style></style>
