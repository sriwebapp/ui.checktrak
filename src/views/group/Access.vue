<template>
  <v-card>
    <v-card-title>Update Group Access</v-card-title>
    <form @submit.prevent="edit">
      <v-card-text>
        <v-container grid-list-md>
          <v-flex>
            <v-text-field
              :value="group.name"
              label="Group Name"
              prepend-icon="mdi-account-group"
              readonly
              :loading="loading"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <p class="title">Select Actions:</p>
          </v-flex>

          <v-flex>
            <v-radio-group v-model="group.action" row>
              <v-radio
                v-for="(option, index) in options"
                :key="index"
                :label="option"
                :value="index"
              ></v-radio>
            </v-radio-group>
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
            <p class="title">Select Branches:</p>
          </v-flex>

          <v-flex>
            <v-radio-group v-model="group.branch" row>
              <v-radio
                v-for="(option, index) in options"
                :key="index"
                :label="option"
                :value="index"
              ></v-radio>
            </v-radio-group>
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
            <p class="title">Select Modules:</p>
          </v-flex>

          <v-flex>
            <v-radio-group v-model="group.module" row>
              <v-radio
                v-for="(option, index) in options"
                :key="index"
                :label="option"
                :value="index"
              ></v-radio>
            </v-radio-group>
          </v-flex>

          <v-row no-gutters class="mt-n5">
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
        <v-btn type="submit" class="indigo white--text" :loading="loading">
          Update
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
    actions() {
      return this.$store.getters['tools/actions']
    },
    branches() {
      return this.$store.getters['tools/branches']
    },
    group() {
      return this.$store.getters['group/group']
    },
    loading() {
      return this.$store.getters['group/loading']
    },
    modules() {
      return this.$store.getters['tools/modules']
    }
  },
  data: () => ({
    options: ['Custom', 'Selection', 'All'],
    selectedActions: [],
    selectedBranches: [],
    selectedModules: []
  }),
  methods: {
    disable(obj) {
      if (this.group) {
        return this.group[obj] !== 1
      }
    },
    edit() {
      this.$store.dispatch('group/editAccess', {
        group_id: this.group.id,
        action: this.group.action,
        branch: this.group.branch,
        module: this.group.module,
        actions: this.selectedActions,
        branches: this.selectedBranches,
        modules: this.selectedModules
      })
    },
    setActions() {
      if (this.group.action === 2) {
        this.selectedActions = this.actions.map(action => action.code)
      } else if (this.group.action === 1) {
        this.selectedActions = this.group.actions.map(action => action.code)
      } else {
        this.selectedActions = []
      }
    },
    setBranches() {
      if (this.group.branch === 2) {
        this.selectedBranches = this.branches.map(branch => branch.code)
      } else if (this.group.branch === 1) {
        this.selectedBranches = this.group.branches.map(branch => branch.code)
      } else {
        this.selectedBranches = []
      }
    },
    setModules() {
      if (this.group.module === 2) {
        this.selectedModules = this.modules.map(module => module.code)
      } else if (this.group.module === 1) {
        this.selectedModules = this.group.modules.map(module => module.code)
      } else {
        this.selectedModules = []
      }
    }
  },
  mounted() {
    this.$store.dispatch('group/getGroup', this.$route.params.id)
  },
  watch: {
    group: {
      deep: true,
      handler() {
        if (this.group.id) {
          this.setActions()
          this.setBranches()
          this.setModules()
        }
      }
    }
  }
}
</script>

<style></style>
