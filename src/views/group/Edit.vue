<template>
  <v-card>
    <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
      <v-card-title>Edit Group</v-card-title>
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                v-model="branch_id"
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
                v-model="editedGroup.name"
                :error-messages="error.get('name')"
                name="name"
                label="Group Name"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="editedIncharge"
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
                :loading="gettingUsers"
                :disabled="gettingUsers"
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          class="indigo white--text"
          :loading="loading"
          :disabled="noChanges || gettingUsers"
        >
          Save
        </v-btn>

        <v-btn
          class="deep-orange white--text"
          router
          :to="{ name: 'groups' }"
          :disabled="loading || gettingUsers"
        >
          Return
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon large @click="showDelete">
          <v-icon color="red">mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  computed: {
    active: {
      get() {
        return this.editedGroup.active
      },
      set(arg) {
        this.editedGroup.active = arg ? 1 : 0
      }
    },
    group() {
      return this.$store.getters['group/group']
    },
    editedGroup() {
      return this.$store.getters['group/editedGroup']
    },
    branches() {
      return this.$store.getters['tools/branches']
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['group/loading']
    },
    noChanges() {
      return (
        this._.isEqual(this.group, this.editedGroup) &&
        this._.isEqual(this.incharge, this.editedIncharge)
      )
    }
  },
  data: () => ({
    branch_id: 0,
    editedIncharge: [],
    gettingUsers: false,
    incharge: [],
    users: []
  }),
  methods: {
    edit() {
      this.editedGroup.incharge = this.editedIncharge
      this.$store.dispatch('group/edit', this.editedGroup)
    },
    showDelete() {
      this.$store.commit('group/showDelete', true)
    }
  },
  mounted() {
    this.$store.dispatch('group/getGroup', this.$route.params.id).then(res => {
      this.incharge = res.data.incharge.map(i => i.id)
      this.editedIncharge = res.data.incharge.map(i => i.id)
      this.branch_id = res.data.branch_id
    })
  },
  watch: {
    branch_id(arg) {
      if (arg) {
        this.users = []
        this.editedGroup.branch_id = arg
        this.gettingUsers = true
        this.$store
          .dispatch('tools/getBranchUsers', arg)
          .then(res => {
            this.users = res.data
            this.editedIncharge =
              arg === this.group.branch_id ? this.incharge : []
          })
          .finally(() => (this.gettingUsers = false))
      }
    }
  }
}
</script>

<style></style>
