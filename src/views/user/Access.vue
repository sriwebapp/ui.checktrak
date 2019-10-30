<template>
  <v-card outlined :loading="loading">
    <v-card-title style="font-size: 17.5px">Update User Access</v-card-title>
    <form @submit.prevent="editAccess">
      <v-card-text>
        <v-container class="mt-n5">
          <v-flex xs12>
            <v-select
              v-model="access"
              label="Select Accessibility"
              prepend-icon="mdi-door-closed-lock"
              :items="accesses"
              item-text="name"
              item-value="id"
              autofocus
            ></v-select>
          </v-flex>

          <v-flex xs12>
            <p :class="{ 'subtitle-1': true, 'grey--text': disable('action') }">
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
            <p :class="{ 'subtitle-1': true, 'grey--text': disable('group') }">
              Select Groups:
            </p>
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
            <p :class="{ 'subtitle-1': true, 'grey--text': disable('module') }">
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
                :value="module.code"
                :disabled="disable('module')"
                hide-details
              >
                <template v-slot:label>
                  <span class="body-2">{{ module.name }}</span>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn type="submit" small color="indigo" dark :loading="loading">
          Update
        </v-btn>
        <v-btn
          class="deep-orange white--text"
          small
          router
          :to="{ name: 'edit-user' }"
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
    selectedGroups: [],
    selectedModules: []
  }),
  methods: {
    editAccess() {
      this.$store.dispatch('user/editAccess', {
        user_id: this.user.id,
        access_id: this.access,
        actions: this.selectedActions,
        groups: this.selectedGroups,
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
    setGroups() {
      if (this.selectedAccess.group === 2) {
        let groups = []

        this.groups.forEach(group => {
          group.groups.forEach(g => {
            groups.push(g.id)
          })
        })

        this.selectedGroups = groups
      } else if (this.selectedAccess.group === 1) {
        this.selectedGroups = this.selectedAccess.groups.map(group => group.id)
      } else {
        this.selectedGroups = this.user.groups.map(group => group.id)
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
        this.setGroups()
        this.setModules()
      }
    }
  }
}
</script>

<style></style>
