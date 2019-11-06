<template>
  <v-row justify="center">
    <v-card width="600" outlined :loading="loading">
      <form @submit.prevent="create" @keydown="error.clear($event.target.name)">
        <v-card-title style="font-size: 17.5px">Create Check Book</v-card-title>
        <v-card-text>
          <v-layout row wrap class="px-5">
            <v-flex xs12>
              <v-select
                v-model="account_id"
                :error-messages="error.get('account_id')"
                name="account_id"
                label="Select Account"
                prepend-icon="mdi-bank"
                :items="accounts"
                item-text="number"
                item-value="id"
                autofocus
              ></v-select>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="start_series"
                :error-messages="error.get('start_series')"
                name="start_series"
                label="Series Start"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="end_series"
                :error-messages="error.get('end_series')"
                name="end_series"
                label="Series End"
                prepend-icon="mdi-tag-text-outline"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            small
            class="indigo white--text"
            :loading="loading"
          >
            Save
          </v-btn>

          <v-btn
            class="deep-orange white--text"
            small
            router
            :to="{ name: 'checkbooks' }"
            :disabled="loading"
          >
            Return
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-row>
</template>

<script>
export default {
  computed: {
    accounts() {
      return this.$store.getters['tools/accounts'].map(account => {
        return {
          id: account.id,
          number: account.code + ' ' + account.number
        }
      })
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['checkbook/loading']
    }
  },
  data: () => ({
    account_id: null,
    start_series: '',
    end_series: ''
  }),
  methods: {
    create() {
      this.$store.dispatch('checkbook/create', {
        account_id: this.account_id,
        start_series: this.start_series,
        end_series: this.end_series
      })
    }
  },
  watch: {
    start_series(arg) {
      if (!parseInt(arg)) return

      if (arg.length >= 4) {
        let prefix = arg.substring(0, arg.length - 4)
        let suffix = arg.substring(arg.length - 4, arg.length)

        suffix = ('00' + (parseInt(suffix) + 99)).slice(-1 * suffix.length)

        this.end_series = prefix + suffix
      } else {
        this.end_series = ''
      }
    }
  }
}
</script>

<style></style>
