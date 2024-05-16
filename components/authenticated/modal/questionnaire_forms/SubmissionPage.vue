<template>
  <v-container id="container">
    <v-btn large class="success" @click="submitAll">Submit All Forms</v-btn>
  </v-container>
</template>

<script>
export default {
    methods: {
        async submitAll(){
            try{
                this.$store.dispatch('questionnaire/submitAll');
            }catch(error){
                console.error(error)
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