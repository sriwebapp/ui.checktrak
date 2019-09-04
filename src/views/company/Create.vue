<template>
  <v-card>
    <v-card-title>Create Company</v-card-title>
    <form @submit.prevent="create">
      <v-card-title>
        <v-container grid-list-md>
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
              prepend-icon="mdi-city"
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
        </v-container>
      </v-card-title>
      <v-card-actions>
        <v-btn type="submit" class="indigo white--text" :loading="loading">
          Save
        </v-btn>

        <v-btn
          class="deep-orange white--text"
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
    company: {
      get() {
        return this.$store.getters['company/newCompany']
      },
      set(arg) {
        this.$store.commit('company/newCompany', arg)
      }
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['company/loading']
    }
  },
  methods: {
    create() {
      this.$store.dispatch('company/create', this.company)
    }
  }
}
</script>

<style></style>
