<template>
  <v-card outlined>
    <v-card-title>
      <span style="font-size: 17.5px">
        Reports
      </span>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-row no-gutters>
        <v-col
          v-for="(report, index) in reports"
          :key="index"
          class="pa-1"
          cols="12"
          sm="6"
          md="4"
        >
          <v-btn
            block
            large
            outlined
            rounded
            color="purple"
            depressed
            router
            :to="{ name: report.path }"
          >
            {{ report.text }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    reports: [{ text: 'Check Masterlist', path: 'report-masterlist' }]
  })
}
</script>

<style></style>
