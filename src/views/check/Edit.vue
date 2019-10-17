<template>
  <v-dialog v-model="show" persistent max-width="500">
    <v-card>
      <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
        <v-card-text>
          <v-layout row wrap class="px-5">
            <v-flex xs12>
              <v-text-field
                v-model="check.details"
                :error-messages="error.get('details')"
                name="details"
                label="Details"
                prepend-icon="mdi-clipboard-list-outline"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            small
            color="orange white--text"
            :loading="editing"
          >
            Edit
          </v-btn>
          <v-btn
            color="deep-orange"
            small
            outlined
            @click="show = false"
            :disabled="editing"
          >
            Return
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    editing() {
      return this.$store.getters['check/editing']
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showEdit']
      },
      set(arg) {
        this.$store.commit('check/showEdit', arg)
      }
    }
  },
  data: () => ({
    check: {}
  }),
  methods: {
    edit() {
      this.$store.dispatch('check/edit', this.check)
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.check = Object.assign({}, this.$store.getters['check/check'])
      }
    }
  }
}
</script>

<style></style>
