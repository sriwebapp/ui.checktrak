<template>
  <v-card>
    <v-card-title>Edit Company</v-card-title>
    <form @submit.prevent="edit" @keydown="error.clear($event.target.name)">
      <v-card-text>
        <v-container grid-list-md>
          <v-flex xs12>
            <v-text-field
              v-model="editedCompany.code"
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
              v-model="editedCompany.name"
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
              v-model="editedCompany.address"
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
              v-model="editedCompany.tel"
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
              v-model="editedCompany.tin"
              :error-messages="error.get('tin')"
              name="tin"
              label="TIN No."
              prepend-icon="mdi-tag-text-outline"
            >
            </v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="editedCompany.sss"
              :error-messages="error.get('sss')"
              name="sss"
              label="SSS No."
              prepend-icon="mdi-tag-text-outline"
            >
            </v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="editedCompany.hdmf"
              :error-messages="error.get('hdmf')"
              name="hdmf"
              label="PagIBIG No."
              prepend-icon="mdi-tag-text-outline"
            >
            </v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="editedCompany.phic"
              :error-messages="error.get('phic')"
              name="phic"
              label="Philhealth No."
              prepend-icon="mdi-tag-text-outline"
            >
            </v-text-field>
          </v-flex>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          class="indigo white--text"
          :loading="loading"
          :disabled="noChanges"
        >
          Update
        </v-btn>

        <v-btn
          class="deep-orange white--text"
          router
          :to="{ name: 'show-company' }"
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
    company() {
      return this.$store.getters['company/company']
    },
    editedCompany: {
      get() {
        return this.$store.getters['company/editedCompany']
      },
      set(arg) {
        this.$store.commit('company/editedCompany', arg)
      }
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters['company/loading']
    },
    noChanges() {
      return this._.isEqual(this.company, this.editedCompany)
    }
  },
  methods: {
    edit() {
      this.$store.dispatch('company/edit', this.editedCompany)
    }
  },
  mounted() {
    this.$store.dispatch('company/getCompany', this.$route.params.code)
  }
}
</script>

<style></style>
