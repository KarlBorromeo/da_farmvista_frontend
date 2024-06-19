<template>
  <div class="elevation-2">
    <!-- <v-container>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ratione laudantium quasi tenetur 
      esse molestiae assumenda alias delectus minus porro quae repellat iusto maxime, voluptates, doloribus recusandae quidem vi
      tae ipsum deleniti, cupiditate debitis eos? Odio sunt hic expedita eligendi saepe vitae, temporibus architecto minus esse rem tempora animi possimus dolore.
    </v-container> -->

    <!-- <v-container style="height: 400px"> -->
      <v-row justify="center" class="pa-0 ma-0" style="border: 1px dashed black">
        <age-demographics class="mb-5"/>
        <gender-demographics class="mb-5"/>
        <education-attained-demographics class="mb-5"/>      
      </v-row>   

    </v-container>
  </div>
</template>

<script>
import ageDemographics from '../../charts/ageDemographics.vue'
import educationAttainedDemographics from '../../charts/educationAttainedDemographics.vue'
import genderDemographics from '../../charts/genderDemographics.vue'
export default {  
  components: {
    ageDemographics,
    genderDemographics,
    educationAttainedDemographics
   }
  
}
</script>

<style scoped>

</style>