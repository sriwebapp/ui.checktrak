<template>
  <v-row justify="center">
    <v-card width="600">
      <v-card-title style="font-size: 17.5px">Update User </v-card-title>
      <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
        <v-card-text>
          <v-layout row wrap class="px-5">
            <v-flex xs12>
              <v-text-field
                v-model="editedUser.name"
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
                v-model="editedUser.username"
                :error-messages="error.get('username')"
                name="username"
                label="Username"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedUser.email"
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
                v-model="editedUser.branch_id"
                :error-messages="error.get('branch_id')"
                name="branch"
                label="Select Branch"
                prepend-icon="mdi-source-branch"
                :items="branches"
                item-text="name"
                item-value="id"
              ></v-select>
            </v-flex>

            <v-flex xs12>
              <v-switch
                v-model="active"
                color="indigo"
                label="Active"
              ></v-switch>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="indigo white--text"
            small
            :loading="loading"
            v-if="noChanges"
            router
            :to="{ name: 'user-access' }"
          >
            Next
          </v-btn>
          <v-btn
            type="submit"
            small
            color="indigo white--text"
            :loading="loading"
            v-if="!noChanges"
          >
            Update & Next
          </v-btn>
          <v-btn
            class="deep-orange white--text"
            small
            router
            :to="{ name: 'users' }"
            :disabled="loading"
          >
            Return
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon small @click="showDelete" :disabled="loading">
            <v-icon color="red">mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-row>
</template>

<script>
export default {
  computed: {
    active: {
      get() {
        return this.editedUser.active
      },
      set(arg) {
        this.editedUser.active = arg ? 1 : 0
      }
    },
    branches() {
      return this.$store.getters['tools/branches']
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['user/loading']
    },
    editedUser: {
      get() {
        return this.$store.getters['user/editedUser']
      },
      set(arg) {
        this.$store.commit('user/editedUser', arg)
      }
    },
    user() {
      return this.$store.getters['user/user']
    },
    noChanges() {
      return this._.isEqual(this.user, this.editedUser)
    }
  },
  methods: {
    edit() {
      this.$store.dispatch('user/edit', this.editedUser)
    },
    showDelete() {
      this.$store.commit('user/showDelete', true)
    }
  },
  mounted() {
    this.$store.dispatch('user/getUser', this.$route.params.id)
  }
}
</script>

<style></style>
