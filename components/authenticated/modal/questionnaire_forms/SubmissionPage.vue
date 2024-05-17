<template>
  <v-container id="container">
    <v-btn large class="success" @click="submitAll">Submit All Forms</v-btn>
    <snackbar ref="snackbar" />
  </v-container>
</template>

<script>
import snackbar from '~/components/snackbar.vue';
export default {
    components: {snackbar},
    methods: {
        async submitAll(){
            try{
                await this.$store.dispatch('questionnaire/submitAll');
            }catch(error){
                this.$refs.snackbar.showBar(error, 'red')
            }
        }
    }
}
</script>

<style scoped>
#container{
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>