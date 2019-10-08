<template>
  <v-card>
    <v-card-title class="title">Manage Company</v-card-title>
    <v-card-text>
      <v-container>
        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-tag</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ company.code }}</v-list-item-title>
            <v-list-item-subtitle>Company Code</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-home-city</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ company.name }}</v-list-item-title>
            <v-list-item-subtitle>Company Name</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-map-marker</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ company.address }}</v-list-item-title>
            <v-list-item-subtitle>Address</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-deskphone</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ company.tel }}</v-list-item-title>
            <v-list-item-subtitle>Telephone No.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-tag-text-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ company.tin }}</v-list-item-title>
            <v-list-item-subtitle>TIN No.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-tag-text-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ company.sss }}</v-list-item-title>
            <v-list-item-subtitle>SSS No.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-tag-text-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ company.hdmf }}</v-list-item-title>
            <v-list-item-subtitle>PagIBIG No.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar size="20">
            <v-icon color="indigo">mdi-tag-text-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ company.phic }}</v-list-item-title>
            <v-list-item-subtitle>Philhealth No.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="info"
        router
        small
        :to="{ name: 'edit-company' }"
        :disabled="loading"
      >
        Edit
      </v-btn>

      <v-btn
        class="deep-orange white--text"
        router
        small
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
