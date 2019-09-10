<template>
  <v-footer app inset dark color="grey lighten-2" v-if="show">
    <v-row>
      <v-col>
        <v-btn block rounded color="indigo" @click="showCreateForm">
          Create
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="orange">Edit</v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="red">Delete</v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="blue">Transmit</v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="purple">Claim</v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="teal">Return</v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="green">Receive</v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="red">Cancel</v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="teal">Clear</v-btn>
      </v-col>
      <v-col>
        <v-btn block rounded color="primary">Preview</v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  computed: {
    show() {
      return this.$store.getters.footer
    }
  },
  methods: {
    showCreateForm() {
      this.$store.commit('check/showCreate', true)
    }
  }
}
</script>

<style></style>
