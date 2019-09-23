<template>
  <v-card>
    <v-card-title>Create Branch</v-card-title>
    <form @submit.prevent="create" @keydown="error.clear($event.target.name)">
      <v-card-text>
        <v-container grid-list-md>
          <v-flex xs12>
            <v-text-field
              v-model="branch.code"
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
              v-model="branch.name"
              :error-messages="error.get('name')"
              name="name"
              label="Branch Name"
              prepend-icon="mdi-tag-text-outline"
              required
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
          :to="{ name: 'branches' }"
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
      return this.$store.getters['branch/loading']
    }
  },
  data: () => ({
    branch: {}
  }),
  methods: {
    create() {
      this.$store.dispatch('branch/create', this.branch)
    }
  }
}
</script>

<style></style>
