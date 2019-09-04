<template>
  <v-card>
    <v-card-title>Manage Company</v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-flex xs12>
          <v-text-field
            :value="company.code"
            label="Company Code"
            prepend-icon="mdi-tag"
            :loading="loading"
            placeholder=" "
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="company.name"
            label="Company Name"
            prepend-icon="mdi-home-city"
            placeholder=" "
            readonly
          >
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="company.address"
            label="Address"
            prepend-icon="mdi-city"
            placeholder=" "
            readonly
          >
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="company.tel"
            label="Telephone No."
            prepend-icon="mdi-deskphone"
            placeholder=" "
            readonly
          >
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="company.tin"
            label="TIN No."
            prepend-icon="mdi-tag-text-outline"
            placeholder=" "
            readonly
          >
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="company.sss"
            label="SSS No."
            prepend-icon="mdi-tag-text-outline"
            placeholder=" "
            readonly
          >
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="company.hdmf"
            label="PagIBIG No."
            prepend-icon="mdi-tag-text-outline"
            placeholder=" "
            readonly
          >
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            :value="company.phic"
            label="Philhealth No."
            prepend-icon="mdi-tag-text-outline"
            placeholder=" "
            readonly
          >
          </v-text-field>
        </v-flex>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="info"
        router
        :to="{ name: 'edit-company' }"
        :disabled="loading"
      >
        Edit
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
  </v-card>
</template>

<script>
export default {
  computed: {
    company() {
      return this.$store.getters['company/company']
    },
    loading() {
      return this.$store.getters['company/loading']
    }
  },
  mounted() {
    this.$store.dispatch('company/getCompany', this.$route.params.code)
  }
}
</script>

<style></style>
