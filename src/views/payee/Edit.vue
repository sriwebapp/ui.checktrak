<template>
  <v-row justify="center">
    <v-card width="600">
      <v-card-title class="title">Edit Payee</v-card-title>
      <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
        <v-card-text>
          <v-layout row wrap class="px-5">
            <v-flex xs12>
              <v-text-field
                v-model="editedPayee.code"
                :error-messages="error.get('code')"
                name="code"
                label="Code"
                prepend-icon="mdi-tag"
                required
                autofocus
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="editedPayee.name"
                :error-messages="error.get('name')"
                name="name"
                label="Name"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="editedPayee.payee_group_id"
                :error-messages="error.get('payee_group_id')"
                name="payee_group_id"
                label="Select Group"
                prepend-icon="mdi-account-group"
                :items="group"
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
            :to="{ name: 'payees' }"
            :disabled="loading"
          >
            Return
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon large @click="showDelete" :disabled="loading">
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
        return this.editedPayee.active
      },
      set(arg) {
        this.editedPayee.active = arg ? 1 : 0
      }
    },
    editedPayee() {
      return this.$store.getters['payee/editedPayee']
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['payee/loading']
    },
    group() {
      return this.$store.getters['tools/payeeGroup']
    },
    payee() {
      return this.$store.getters['payee/payee']
    },
    noChanges() {
      return this._.isEqual(this.payee, this.editedPayee)
    }
  },
  methods: {
    edit() {
      this.$store.dispatch('payee/edit', this.editedPayee)
    },
    showDelete() {
      this.$store.commit('payee/showDelete', true)
    }
  },
  mounted() {
    this.$store.dispatch('payee/getPayee', this.$route.params.id)
  }
}
</script>

<style></style>
