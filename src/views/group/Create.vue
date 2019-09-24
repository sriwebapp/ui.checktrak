<template>
  <v-card>
    <form @submit.prevent="create" @keydown="error.clear($event.target.name)">
      <v-card-title>Create Group</v-card-title>
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                v-model="group.branch_id"
                :error-messages="error.get('branch_id')"
                name="branch_id"
                label="Select Branch"
                prepend-icon="mdi-source-branch"
                :items="branches"
                item-text="name"
                item-value="id"
                autofocus
              ></v-select>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="group.name"
                :error-messages="error.get('name')"
                name="name"
                label="Group Name"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="group.incharge"
                :error-messages="error.get('incharge')"
                name="incharge"
                label="Select Incharge"
                prepend-icon="mdi-account-group"
                :items="users"
                item-text="name"
                item-value="id"
                multiple
                chips
                deletable-chips
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" class="indigo white--text" :loading="loading">
          Save
        </v-btn>

        <v-btn
          class="deep-orange white--text"
          router
          :to="{ name: 'groups' }"
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
    branches() {
      return this.$store.getters['tools/branches']
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['group/loading']
    },
    users() {
      return this.$store.getters['tools/users']
    }
  },
  data: () => ({
    group: {
      branch_id: 0,
      name: '',
      incharge: []
    }
  }),
  methods: {
    create() {
      this.$store.dispatch('group/create', this.group)
    }
  }
}
</script>

<style></style>
