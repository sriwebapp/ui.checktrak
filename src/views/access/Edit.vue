<template>
  <v-card outlined :loading="loading" class="access-edit">
    <v-card-title style="font-size: 17.5px">Update Accessibility</v-card-title>
    <form @submit.prevent="edit">
      <v-card-text>
        <v-container class="mt-n5">
          <v-flex>
            <v-text-field
              :value="access.name"
              label="Access Name"
              prepend-icon="mdi-tag-text-outline"
              readonly
              class="access-edit_access-name"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <p class="subtitle-1">Select Actions:</p>
          </v-flex>

          <v-flex>
            <v-radio-group v-model="action" row :disabled="loading">
              <v-radio
                v-for="(option, index) in options"
                :key="index"
                :value="index"
              >
                <template v-slot:label>
                  <span class="body-1">{{ option }}</span>
                </template>
              </v-radio>
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
                :value="action.code"
                :disabled="disable('action')"
                :color="action.color"
                hide-details
              >
                <template v-slot:label>
                  <span class="body-2">{{ action.name }}</span>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>

          <v-flex xs12>
            <p class="subtitle-1">Select Groups:</p>
          </v-flex>

          <v-flex>
            <v-radio-group v-model="group" row :disabled="loading">
              <v-radio
                v-for="(option, index) in options"
                :key="index"
                :value="index"
              >
                <template v-slot:label>
                  <span class="body-1">{{ option }}</span>
                </template>
              </v-radio>
            </v-radio-group>
          </v-flex>

          <v-row
            no-gutters
            class="mt-n5 mb-5"
            v-for="branch in groups"
            :key="branch.id"
          >
            <v-col
              v-for="group in branch.groups"
              :key="group.id"
              cols="12"
              sm="4"
              md="2"
            >
              <v-checkbox
                v-model="selectedGroups"
                :value="group.id"
                :disabled="disable('group')"
                hide-details
              >
                <template v-slot:label>
                  <span class="body-2">{{ group.name }}</span>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>

          <v-flex xs12>
            <p class="subtitle-1">Select Modules:</p>
          </v-flex>

          <v-flex>
            <v-radio-group v-model="module" row :disabled="loading">
              <v-radio
                v-for="(option, index) in options"
                :key="index"
                :value="index"
              >
                <template v-slot:label>
                  <span class="body-1">{{ option }}</span>
                </template>
              </v-radio>
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
                :value="module.code"
                :disabled="disable('module')"
                hide-details
              >
                <template v-slot:label>
                  <span class="body-2">{{ module.name }}</span>
                </template></v-checkbox
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="access-edit_final-buttons">
        <v-btn
          type="submit"
          small
          class="indigo white--text"
          :loading="loading"
        >
          Update
        </v-btn>

        <v-btn
          class="deep-orange white--text"
          router
          small
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
    groups() {
      return this.$store.getters['tools/groups']
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
    action: null,
    group: null,
    module: null,
    options: ['Custom', 'Selection', 'All'],
    selectedActions: [],
    selectedGroups: [],
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
        group: this.access.group,
        module: this.access.module,
        actions: this.selectedActions,
        groups: this.selectedGroups,
        modules: this.selectedModules
      })
    },
    setActions(arg) {
      if (arg === 2) {
        this.selectedActions = this.actions.map(action => action.code)
      } else if (arg === 1) {
        this.selectedActions = this.access.actions.map(action => action.code)
      } else {
        this.selectedActions = []
      }
    },
    setGroups(arg) {
      if (arg === 2) {
        let groups = []

        this.groups.forEach(group => {
          group.groups.forEach(g => {
            groups.push(g.id)
          })
        })

        this.selectedGroups = groups
      } else if (arg === 1) {
        this.selectedGroups = this.access.groups.map(group => group.id)
      } else {
        this.selectedGroups = []
      }
    },
    setModules(arg) {
      if (arg === 2) {
        this.selectedModules = this.modules.map(module => module.code)
      } else if (arg === 1) {
        this.selectedModules = this.access.modules.map(module => module.code)
      } else {
        this.selectedModules = []
      }
    }
  },
  mounted() {
    this.$store
      .dispatch('access/getAccess', this.$route.params.id)
      .then(res => {
        this.action = res.data.action
        this.group = res.data.group
        this.module = res.data.module
      })
  },
  watch: {
    action(arg) {
      this.access.action = arg
      this.setActions(arg)
    },
    group(arg) {
      this.access.group = arg
      this.setGroups(arg)
    },
    module(arg) {
      this.access.module = arg
      this.setModules(arg)
    }
  }
}
</script>

<style></style>
