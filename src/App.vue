<template>
  <router-view></router-view>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  computed: {
    token() {
      return this.$store.getters['auth/token']
    }
  },
  watch: {
    token() {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
    }
  }
}
</script>
