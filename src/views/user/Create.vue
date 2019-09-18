<template>
  <v-card>
    <v-card-title>Create User </v-card-title>
    <form @submit.prevent="create" @keydown="error.clear($event.target.name)">
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                v-model="user.name"
                :error-messages="error.get('name')"
                name="name"
                label="Name"
                prepend-icon="mdi-account"
                autofocus
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="user.username"
                :error-messages="error.get('username')"
                name="username"
                label="Username"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="user.email"
                :error-messages="error.get('email')"
                name="email"
                type="email"
                label="Email"
                prepend-icon="mdi-email"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="user.branch_id"
                :error-messages="error.get('branch_id')"
                name="branch_id"
                label="Select Branch"
                prepend-icon="mdi-compass"
                :items="branches"
                item-text="name"
                item-value="id"
              ></v-select>
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="user.group_id"
                :error-messages="error.get('group_id')"
                name="group_id"
                label="Select Group"
                prepend-icon="mdi-account-group"
                :items="groups"
                item-text="name"
                item-value="id"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" color="indigo white--text" :loading="loading">
          Save
        </v-btn>
        <v-btn
          class="deep-orange white--text"
          router
          :to="{ name: 'users' }"
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
    groups() {
      return this.$store.getters['tools/groups']
    },
    loading() {
      return this.$store.getters['user/loading']
    }
  },
  data: () => ({
    user: {}
  }),
  methods: {
    create() {
      this.$store.dispatch('user/create', this.user)
    }
  }
}
</script>

<style></style>
