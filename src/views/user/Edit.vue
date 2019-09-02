<template>
  <v-container>
    <v-card>
      <v-card-title>Update User </v-card-title>
      <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
        <v-card-text>
          <v-container grid-list-md>
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
                name="branch"
                label="Select Branch"
                prepend-icon="mdi-compass"
                :items="branches"
                item-text="name"
                item-value="id"
              ></v-select>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" color="indigo" dark :loading="loading">
            Update
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
  </v-container>
</template>

<script>
export default {
  computed: {
    branches() {
      return this.$store.getters['branch/branches']
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['user/loading']
    },
    user: {
      get() {
        return this.$store.getters['user/selectedUser']
      },
      set(arg) {
        this.$store.commit('user/selectedUser', arg)
      }
    }
  },
  methods: {
    edit() {
      this.$store.dispatch('user/edit', this.user)
    }
  },
  mounted() {
    this.$store.dispatch('branch/getBranches')
    this.$store.dispatch('user/getUser', this.$route.params.id)
  }
}
</script>

<style></style>
