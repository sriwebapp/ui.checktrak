<template>
  <v-card>
    <v-card-title>Update Accessibility</v-card-title>
    <form @submit.prevent="edit">
      <v-card-text>
        <v-container grid-list-md>
          <v-flex>
            <v-text-field
              :value="access.name"
              label="Access Name"
              prepend-icon="mdi-tag-text-outline"
              readonly
              :loading="loading"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <p class="title">Select Actions:</p>
          </v-flex>

          <v-flex>
            <v-radio-group v-model="access.action" row>
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
            <v-radio-group v-model="access.branch" row>
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
            <v-radio-group v-model="access.module" row>
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
          :to="{ name: 'access' }"
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
    access() {
      return this.$store.getters['access/access']
    },
    loading() {
      return this.$store.getters['access/loading']
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
      if (this.access) {
        return this.access[obj] !== 1
      }
    },
    edit() {
      this.$store.dispatch('access/edit', {
        access_id: this.access.id,
        action: this.access.action,
        branch: this.access.branch,
        module: this.access.module,
        actions: this.selectedActions,
        branches: this.selectedBranches,
        modules: this.selectedModules
      })
    },
    setActions() {
      if (this.access.action === 2) {
        this.selectedActions = this.actions.map(action => action.code)
      } else if (this.access.action === 1) {
        this.selectedActions = this.access.actions.map(action => action.code)
      } else {
        this.selectedActions = []
      }
    },
    setBranches() {
      if (this.access.branch === 2) {
        this.selectedBranches = this.branches.map(branch => branch.code)
      } else if (this.access.branch === 1) {
        this.selectedBranches = this.access.branches.map(branch => branch.code)
      } else {
        this.selectedBranches = []
      }
    },
    setModules() {
      if (this.access.module === 2) {
        this.selectedModules = this.modules.map(module => module.code)
      } else if (this.access.module === 1) {
        this.selectedModules = this.access.modules.map(module => module.code)
      } else {
        this.selectedModules = []
      }
    }
  },
  mounted() {
    this.$store.dispatch('access/getAccess', this.$route.params.id)
  },
  watch: {
    access: {
      deep: true,
      handler() {
        if (this.access.id) {
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
