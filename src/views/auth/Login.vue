<template>
  <v-card class="elevation-25" :loading="loading">
    <v-toolbar dark flat color="black" height="50">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <form @submit.prevent="login" @keydown="error.clear($event.target.name)">
      <v-divider></v-divider>
      <v-card-text>
        <v-layout row wrap class="mx-5">
          <v-flex xs12>
            <v-text-field
              name="username"
              label="Username or Email"
              prepend-icon="mdi-account-card-details-outline"
              :error-messages="error.get('username')"
              v-model="username"
              autofocus
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              name="password"
              type="password"
              label="Password"
              :error-messages="error.get('password')"
              prepend-icon="mdi-lock-open-outline"
              v-model="password"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-select
              v-model="company_id"
              :error-messages="error.get('company_id')"
              name="company_id"
              label="Select Company"
              prepend-icon="mdi-home-city-outline"
              :items="companies"
              item-text="name"
              item-value="id"
            >
            </v-select>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit" color="primary" :loading="loading">
          Sign In
        </v-btn>
        <v-btn
          text
          color="warning"
          :disabled="loading"
          router
          :to="{ name: 'forgotPassword' }"
        >
          Reset Password
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  computed: {
    company_id: {
      get() {
        return this.$store.getters['auth/company']
      },
      set(arg) {
        this.$store.commit('auth/company', arg)
      }
    },
    companies() {
      return this.$store.getters['tools/companies']
    },
    loading() {
      return this.$store.getters['auth/loading']
    },
    error() {
      return this.$store.getters.error
    }
  },
  data: () => ({
    username: null,
    password: null
  }),
  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password,
        company_id: this.company_id
      })
    }
  }
}
</script>

<style></style>
