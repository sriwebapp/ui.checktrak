<template>
  <v-card>
    <v-card-title>Edit Branch</v-card-title>
    <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
      <v-card-text>
        <v-container grid-list-md>
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

          <v-flex xs12>
            <v-select
              v-model="editedBranch.incharge_id"
              :error-messages="error.get('incharge_id')"
              name="incharge_id"
              label="Select Incharge"
              prepend-icon="mdi-account"
              :items="users"
              item-text="name"
              item-value="id"
            ></v-select>
          </v-flex>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          class="indigo white--text"
          :loading="loading"
          :disabled="noChanges"
        >
          Update
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
    },
    users() {
      return this.$store.getters['tools/users']
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
