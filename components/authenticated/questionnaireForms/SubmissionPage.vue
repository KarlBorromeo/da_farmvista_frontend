<template>
  <v-container id="container">
    <v-btn large class="success" @click="submitAll" :disabled="loading">Submit All Forms</v-btn>
    <snackbar ref="snackbar" />
  </v-container>
</template>

<script>
import snackbar from '~/components/snackbar.vue'
export default {
  components: { snackbar },
  data(){
    return{
      loading: false
    }
  },
  methods: {
    async submitAll() {
      try {
        this.loading = true;
        const response = await this.$store.dispatch('questionnaire/submitAll')
        this.$refs.snackbar.showBar(response,'success')
      } catch (error) {
        this.$refs.snackbar.showBar(error, 'red')
      }
      this.loading = false;
    },
  },
}
</script>

<style scoped>
#container {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
