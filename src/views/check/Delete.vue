<template>
  <v-dialog v-model="show" persistent max-width="600">
    <v-card>
      <form
        @submit.prevent="deleteCheck"
        @keydown="error.clear($event.target.name)"
      >
        <v-card-title>Delete Check</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <v-text-field
                v-model="remarks"
                :error-messages="error.get('remarks')"
                name="remarks"
                label="Remarks"
                prepend-icon="mdi-clipboard-list-outline"
                required
              ></v-text-field>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" color="red white--text" :loading="deleting">
            Delete
          </v-btn>
          <v-btn
            color="deep-orange"
            outlined
            @click="show = false"
            :disabled="deleting"
          >
            Close
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    check() {
      return this.$store.getters['check/check']
    },
    deleting() {
      return this.$store.getters['check/deleting']
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showDelete']
      },
      set(arg) {
        this.$store.commit('check/showDelete', arg)
      }
    }
  },
  data: () => ({
    remarks: ''
  }),
  methods: {
    deleteCheck() {
      this.$store.dispatch('check/delete', {
        id: this.check.id,
        remarks: this.remarks
      })
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.remarks = ''
      }
    }
  }
}
</script>

<style></style>
