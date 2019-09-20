<template>
  <v-card>
    <v-card-title>Update User Access</v-card-title>
    <form @submit.prevent="editAccess">
      <v-card-text>
        <v-container grid-list-md>
          <v-flex xs12>
            <p class="title">Select Accessibility:</p>
          </v-flex>

          <v-radio-group v-model="access">
            <v-radio
              v-for="access in accesses"
              :key="access.id"
              :label="access.name"
              :value="access.id"
            ></v-radio>
          </v-radio-group>

          <v-divider class="mb-4"></v-divider>

          <v-flex xs12>
            <p :class="{ title: true, 'grey--text': disable('action') }">
              Select Actions:
            </p>
          </v-flex>

          <v-row no-gutters class="mt-n5 mb-5">
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
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-flex xs12>
            <p :class="{ title: true, 'grey--text': disable('branch') }">
              Select Branches:
            </p>
          </v-flex>

          <v-row no-gutters class="mt-n5 mb-5">
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
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-flex xs12>
            <p :class="{ title: true, 'grey--text': disable('module') }">
              Select Modules:
            </p>
          </v-flex>

          <v-row no-gutters class="mt-n5 ">
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
                hide-details
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
</template>

<script>
export default {
  computed: {
    actions() {
      return this.$store.getters['tools/actions']
    },
    branches() {
      return this.$store.getters['tools/branches']
    },
    accesses() {
      return this.$store.getters['tools/access']
    },
    loading() {
      return this.$store.getters['user/loading']
    },
    modules() {
      return this.$store.getters['tools/modules']
    },
    access: {
      get() {
        return this.$store.getters['user/access']
      },
      set(arg) {
        this.$store.commit('user/access', arg)
      }
    },
    selectedAccess() {
      return this.accesses.find(acs => acs.id === this.access)
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
        access_id: this.access,
        actions: this.selectedActions,
        branches: this.selectedBranches,
        modules: this.selectedModules
      })
    },
    disable(obj) {
      if (this.selectedAccess) {
        return this.selectedAccess[obj] !== 0
      }
    },
    setActions() {
      if (this.selectedAccess.action === 2) {
        this.selectedActions = this.actions.map(action => action.code)
      } else if (this.selectedAccess.action === 1) {
        this.selectedActions = this.selectedAccess.actions.map(
          action => action.code
        )
      } else {
        this.selectedActions = this.user.actions.map(action => action.code)
      }
    },
    setBranches() {
      if (this.selectedAccess.branch === 2) {
        this.selectedBranches = this.branches.map(branch => branch.code)
      } else if (this.selectedAccess.branch === 1) {
        this.selectedBranches = this.selectedAccess.branches.map(
          branch => branch.code
        )
      } else {
        this.selectedBranches = this.user.branches.map(branch => branch.code)
      }
    },
    setModules() {
      if (this.selectedAccess.module === 2) {
        this.selectedModules = this.modules.map(module => module.code)
      } else if (this.selectedAccess.module === 1) {
        this.selectedModules = this.selectedAccess.modules.map(
          module => module.code
        )
      } else {
        this.selectedModules = this.user.modules.map(module => module.code)
      }
    }
  },
  mounted() {
    this.$store.dispatch('user/getAccess', this.$route.params.id)
  },
  watch: {
    selectedAccess() {
      if (this.selectedAccess) {
        this.setActions()
        this.setBranches()
        this.setModules()
      }
    }
  }
}
</script>

<style></style>
