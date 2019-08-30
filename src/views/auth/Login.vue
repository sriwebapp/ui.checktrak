<template>
  <v-card class="elevation-25">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login form</v-toolbar-title>
    </v-toolbar>
    <form @submit.prevent="login" @keydown="error.clear($event.target.name)">
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-flex xs12>
            <v-text-field
              name="email"
              label="Email"
              prepend-icon="mdi-account-card-details-outline"
              :error-messages="error.get('email')"
              v-model="credential.email"
              autofocus
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              name="password"
              type="password"
              label="Password"
              :error-messages="error.get('password')"
              prepend-icon="mdi-lock-open-outline"
              v-model="credential.password"
            ></v-text-field>
          </v-flex>
        </v-container>
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
          Forgot Password
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters['auth/loading']
    },
    error() {
      return this.$store.getters.error
    }
  },
  data: () => ({
    credential: {}
  }),
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.credential)
    }
  }
}
</script>

<style></style>
