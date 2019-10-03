<template>
  <v-card>
    <v-card-title>Create Payee</v-card-title>
    <form @submit.prevent="create" @keydown="error.clear($event.target.name)">
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                v-model="payee.code"
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
                v-model="payee.name"
                :error-messages="error.get('name')"
                name="name"
                label="Name"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="payee.payee_group_id"
                :error-messages="error.get('payee_group_id')"
                name="payee_group_id"
                label="Select Group"
                prepend-icon="mdi-account-group"
                :items="group"
                item-text="name"
                item-value="id"
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
          :to="{ name: 'payees' }"
          :disabled="loading"
        >
          Return
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon large @click="showImport">
          <v-icon color="indigo">mdi-file-upload-outline</v-icon>
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
      return this.$store.getters['payee/loading']
    },
    group() {
      return this.$store.getters['tools/payeeGroup']
    }
  },
  data: () => ({
    payee: {}
  }),
  methods: {
    create() {
      this.$store.dispatch('payee/create', this.payee)
    },
    showImport() {
      this.$store.commit('payee/showImportCreate', true)
    }
  }
}
</script>

<style></style>
