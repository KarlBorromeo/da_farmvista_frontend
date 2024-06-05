<template>
  <v-col class="card">
    <v-card style="height:100%" class="d-flex justify-center align-center" :style="styleProp">
        <v-container class="d-flex justify-center align-center" color="red">
            <v-spacer />
            <v-icon>mdi-account-badge-outline</v-icon>  
            <v-spacer />
            <v-card class="elevation-0" style="background-color:transparent">
                <p class="text-center my-0 py-0 body-1 font-weight-light">{{ name }}</p>   
                <p class="text-center my-0 py-0 caption font-weight-light">Active Farmers</p>   
                <p class="text-center my-0 py-0 font-weight-bold">{{ count }}</p>   
            </v-card> 
            <v-spacer /> 
        </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
    props: ['name','count','styleProp']
}
</script>
