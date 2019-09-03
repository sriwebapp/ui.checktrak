<template>
  <v-container>
    <v-card>
      <v-card-title>Update User Access</v-card-title>
      <form @submit.prevent="editAccess">
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <p class="title">Select User Group:</p>
            </v-flex>

            <v-radio-group v-model="group">
              <v-radio
                v-for="group in groups"
                :key="group.id"
                :label="group.name"
                :value="group.id"
              ></v-radio>
            </v-radio-group>

            <v-divider class="mb-4"></v-divider>

            <v-flex xs12>
              <p :class="{ title: true, 'grey--text': disable('action') }">
                Select Actions:
              </p>
            </v-flex>

            <v-row no-gutters>
              <v-col
                v-for="action in actions"
                :key="action.id"
                cols="12"
                sm="4"
                md="2"
              >
                <v-checkbox
                  v-model="selectedActions"
                  :label="action.name"
                  :value="action.code"
                  :disabled="disable('action')"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-flex xs12>
              <p :class="{ title: true, 'grey--text': disable('branch') }">
                Select Branches:
              </p>
            </v-flex>

            <v-row no-gutters>
              <v-col
                v-for="branch in branches"
                :key="branch.id"
                cols="12"
                sm="4"
                md="2"
              >
                <v-checkbox
                  v-model="selectedBranches"
                  :label="branch.name"
                  :value="branch.code"
                  :disabled="disable('branch')"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-flex xs12>
              <p :class="{ title: true, 'grey--text': disable('module') }">
                Select Modules:
              </p>
            </v-flex>

            <v-row no-gutters>
              <v-col
                v-for="module in modules"
                :key="module.id"
                cols="12"
                sm="4"
                md="2"
              >
                <v-checkbox
                  v-model="selectedModules"
                  :label="module.name"
                  :value="module.code"
                  :disabled="disable('module')"
                ></v-checkbox>
              </v-col>
            </v-row>
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
    actions() {
      return this.$store.getters['tools/actions']
    },
    branches() {
      return this.$store.getters['branch/branches']
    },
    groups() {
      return this.$store.getters['group/groups']
    },
    loading() {
      return this.$store.getters['user/loading']
    },
    modules() {
      return this.$store.getters['tools/modules']
    },
    group: {
      get() {
        return this.$store.getters['user/group']
      },
      set(arg) {
        this.$store.commit('user/group', arg)
      }
    },
    selectedGroup() {
      return this.groups.find(grp => grp.id === this.group)
    },
    user() {
      return this.$store.getters['user/user']
    }
  },
  data: () => ({
    selectedActions: [],
    selectedBranches: [],
    selectedModules: []
  }),
  methods: {
    editAccess() {
      this.$store.dispatch('user/editAccess', {
        user_id: this.user.id,
        group_id: this.group,
        actions: this.selectedActions,
        branches: this.selectedBranches,
        modules: this.selectedModules
      })
    },
    disable(obj) {
      if (this.selectedGroup) {
        return this.selectedGroup[obj] !== 0
      }
    },
    setActions() {
      if (this.selectedGroup.action === 2) {
        this.selectedActions = this.actions.map(action => action.code)
      } else if (this.selectedGroup.action === 1) {
        this.selectedActions = this.selectedGroup.actions.map(
          action => action.code
        )
      } else {
        this.selectedActions = this.user.actions.map(action => action.code)
      }
    },
    setBranches() {
      if (this.selectedGroup.branch === 2) {
        this.selectedBranches = this.branches.map(branch => branch.code)
      } else if (this.selectedGroup.branch === 1) {
        this.selectedBranches = this.selectedGroup.branches.map(
          branch => branch.code
        )
      } else {
        this.selectedBranches = this.user.branches.map(branch => branch.code)
      }
    },
    setModules() {
      if (this.selectedGroup.module === 2) {
        this.selectedModules = this.modules.map(module => module.code)
      } else if (this.selectedGroup.module === 1) {
        this.selectedModules = this.selectedGroup.modules.map(
          module => module.code
        )
      } else {
        this.selectedModules = this.user.modules.map(module => module.code)
      }
    }
  },
  mounted() {
    this.$store.dispatch('user/getGroup', this.$route.params.id)
  },
  watch: {
    selectedGroup() {
      if (this.selectedGroup) {
        this.setActions()
        this.setBranches()
        this.setModules()
      }
    }
  }
}
</script>

<style></style>
