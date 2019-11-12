<template>
  <v-dialog v-model="show" persistent max-width="400">
    <v-card :loading="loading">
      <form @submit.prevent="upload">
        <v-card-title>
          <span style="font-size: 17.5px">
            Change Avatar
          </span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap class="px-5">
            <v-flex xs12>
              <v-file-input
                ref="fileinput"
                v-model="file"
                label="Select Image"
                show-size
                :error-messages="error.get('avatar')"
                @change="error.reset()"
                prepend-icon="mdi-file-image-outline"
                accept="image/*"
              ></v-file-input>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            small
            color="indigo white--text"
            :loading="loading"
            :disabled="!file || loading"
          >
            Upload
          </v-btn>
          <v-btn
            color="deep-orange"
            small
            outlined
            @click="show = false"
            :disabled="loading"
          >
            Return
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error
    },
    show: {
      get() {
        return this.$store.getters.showAvatar
      },
      set(arg) {
        this.$store.commit('showAvatar', arg)
      }
    }
  },
  data: () => ({
    loading: false,
    file: null
  }),
  methods: {
    async upload() {
      this.loading = true
      try {
        await this.$store.dispatch('tools/uploadAvatar', this.file)
        await this.$store.dispatch('auth/getUser')
        this.show = false
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    show(arg) {
      if (arg) {
        this.error.reset()
        this.file = null
      }
    }
  }
}
</script>

<style></style>
