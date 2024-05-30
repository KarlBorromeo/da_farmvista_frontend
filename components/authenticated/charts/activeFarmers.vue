<template>
  <v-col class="card" cols="12" sm="6" md="3" lg="2">
    <v-card style="height:100%" class="d-flex justify-center align-center">
        <v-container class="d-flex justify-center align-center">
            <v-spacer />
            <v-icon>mdi-account-badge-outline</v-icon>  
            <v-spacer />
            <v-card class="elevation-0">
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
    props: ['name','count']
}
</script>
