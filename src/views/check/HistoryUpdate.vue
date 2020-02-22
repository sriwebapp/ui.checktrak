<template>
  <v-dialog v-model="show" persistent max-width="350">
    <v-card :loading="loading">
      <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs-12 class="my-n3">
              <v-date-picker
                v-model="date"
                full-width
                no-title
                class="elevation-0"
              ></v-date-picker>
            </v-flex>

            <v-flex xs12 class="px-3 my-n3">
              <v-text-field
                v-model="history.date"
                :error-messages="error.get('date')"
                name="date"
                label="Action Date"
                placeholder="yyyy-mm-dd"
                prepend-icon="mdi-calendar"
                class="pt-5"
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
            :loading="loading"
          >
            Edit
          </v-btn>
          <v-btn
            color="deep-orange"
            small
            outlined
            @click="show = false"
            :disabled="loading"
          >
            Return
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import Helper from './../../helper/Helper'

export default {
  computed: {
    date: {
      get() {
        return Helper.formatDate(this.history.date, 'Y-MM-DD')
      },
      set(arg) {
        this.history.date = arg
      }
    },
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters['check/showHistoryUpdate']
      },
      set(arg) {
        this.$store.commit('check/showHistoryUpdate', arg)
      }
    }
  },
  data: () => ({
    loading: false,
    history: {}
  }),
  methods: {
    async edit() {
      this.loading = true
      try {
        await this.$store.dispatch('check/updateHistory', this.history)
        await this.$store.dispatch('check/getCheck', this.history.check_id)
        this.show = false
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.history = Object.assign({}, this.$store.getters['check/history'])
      }
    }
  }
}
</script>

<style></style>
