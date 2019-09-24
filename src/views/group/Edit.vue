<template>
  <v-card>
    <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
      <v-card-title>Edit Group</v-card-title>
      <v-card-text>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                v-model="editedGroup.branch_id"
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
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          class="indigo white--text"
          :loading="loading"
          :disabled="noChanges"
        >
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
    users() {
      return this.$store.getters['tools/users']
    },
    noChanges() {
      return (
        this._.isEqual(this.group, this.editedGroup) &&
        this._.isEqual(this.incharge, this.editedIncharge)
      )
    }
  },
  data: () => ({
    editedIncharge: [],
    incharge: []
  }),
  methods: {
    edit() {
      this.editedGroup.incharge = this.editedIncharge
      this.$store.dispatch('group/edit', this.editedGroup)
    }
  },
  mounted() {
    this.$store.dispatch('group/getGroup', this.$route.params.id).then(res => {
      this.incharge = res.data.incharge.map(i => i.id)
      this.editedIncharge = res.data.incharge.map(i => i.id)
    })
  }
}
</script>

<style></style>
