<template>
  <v-row justify="center">
    <v-card width="600" outlined :loading="loading">
      <form @submit.prevent="create" @keydown="error.clear($event.target.name)">
        <v-card-title style="font-size: 17.5px">Create Group</v-card-title>
        <v-card-text>
          <v-layout row wrap class="px-5">
            <v-flex xs12>
              <v-select
                v-model="branch_id"
                :error-messages="error.get('branch_id')"
                name="branch_id"
                label="Select Branch"
                prepend-icon="mdi-source-branch"
                :loading="gettingUsers"
                :items="branches"
                item-text="name"
                item-value="id"
                autofocus
              ></v-select>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="name"
                :error-messages="error.get('name')"
                name="name"
                label="Group Name"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="incharge"
                :error-messages="error.get('incharge')"
                name="incharge"
                label="Select Incharge"
                prepend-icon="mdi-account-group"
                :items="users"
                item-text="name"
                item-value="id"
                multiple
                chips
                small-chips
                deletable-chips
                :disabled="gettingUsers"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            small
            class="indigo white--text"
            :disabled="gettingUsers"
            :loading="loading"
          >
            Save
          </v-btn>

          <v-btn
            class="deep-orange white--text"
            small
            router
            :to="{ name: 'groups' }"
            :disabled="loading || gettingUsers"
          >
            Return
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-row>
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
    }
  },
  data: () => ({
    branch_id: 0,
    name: '',
    incharge: [],
    gettingUsers: false,
    users: []
  }),
  methods: {
    create() {
      this.$store.dispatch('group/create', {
        branch_id: this.branch_id,
        name: this.name,
        incharge: this.incharge
      })
    }
  },
  watch: {
    branch_id(arg) {
      if (arg) {
        this.users = []
        this.incharge = []
        this.gettingUsers = true
        this.$store
          .dispatch('tools/getBranchUsers', arg)
          .then(res => (this.users = res.data))
          .finally(() => (this.gettingUsers = false))
      }
    }
  }
}
</script>

<style></style>
