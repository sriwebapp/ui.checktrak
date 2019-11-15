<template>
  <router-view></router-view>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'App',
  computed: {
    token() {
      return this.$store.getters['auth/token']
    }
  },
  watch: {
    token() {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
    }
  }
}
</script>

<style></style>
