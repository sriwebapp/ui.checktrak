<template>
  <v-card outlined :loading="loading">
    <v-card-title style="font-size: 17.5px">Create Company</v-card-title>
    <form @submit.prevent="create" @keydown="error.clear($event.target.name)">
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md6 class="px-5">
            <v-flex xs12>
              <v-text-field
                v-model="company.code"
                :error-messages="error.get('code')"
                name="code"
                label="Company Code"
                prepend-icon="mdi-tag"
                autofocus
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="company.name"
                :error-messages="error.get('name')"
                name="name"
                label="Company Name"
                prepend-icon="mdi-home-city"
                required
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="company.address"
                :error-messages="error.get('address')"
                name="address"
                label="Address"
                prepend-icon="mdi-map-marker"
                required
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="company.tel"
                :error-messages="error.get('tel')"
                name="tel"
                label="Telephone No."
                prepend-icon="mdi-deskphone"
                required
              >
              </v-text-field>
            </v-flex>
          </v-flex>

          <v-flex xs12 md6 class="px-5">
            <v-flex xs12>
              <v-text-field
                v-model="company.tin"
                :error-messages="error.get('tin')"
                name="tin"
                label="TIN No."
                prepend-icon="mdi-tag-text-outline"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="company.sss"
                :error-messages="error.get('sss')"
                name="sss"
                label="SSS No."
                prepend-icon="mdi-tag-text-outline"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="company.hdmf"
                :error-messages="error.get('hdmf')"
                name="hdmf"
                label="PagIBIG No."
                prepend-icon="mdi-tag-text-outline"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="company.phic"
                :error-messages="error.get('phic')"
                name="phic"
                label="Philhealth No."
                prepend-icon="mdi-tag-text-outline"
              >
              </v-text-field>
            </v-flex>
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
          :to="{ name: 'companies' }"
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
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['company/loading']
    }
  },
  data: () => ({
    company: {}
  }),
  methods: {
    create() {
      this.$store.dispatch('company/create', this.company)
    }
  }
}
</script>

<style></style>
