<template>
  <v-container>
    <v-card>
      <v-card-title>Update User Access</v-card-title>
      <form
        @submit.prevent="editAccess"
        @keydown="error.clear($event.target.name)"
      >
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
              <p class="title">Select Actions:</p>
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
                  :label="action.name"
                  :value="action.id"
                  :disabled="select('action')"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-flex xs12>
              <p class="title">Select Branches:</p>
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
                  :label="branch.name"
                  :value="branch.id"
                  :disabled="select('branch')"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-flex xs12>
              <p class="title">Select Modules:</p>
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
                  :label="module.name"
                  :value="module.id"
                  :disabled="select('module')"
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

    error() {
      return this.$store.getters.error
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
    }
  },
  methods: {
    editAccess() {
      //   this.$store.dispatch('user/edit', this.user)
    },
    select(obj) {
      return this.selectedGroup[obj] !== 0
    }
  },
  mounted() {
    this.$store.dispatch('tools/getActions')
    this.$store.dispatch('tools/getModules')
    this.$store.dispatch('branch/getBranches')
    this.$store.dispatch('group/getGroups')
    this.$store.dispatch('user/getUser', this.$route.params.id)
  }
}
</script>

<style></style>
