<template>
  <div class="elevation-2">
    <v-container>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ratione laudantium quasi tenetur 
      esse molestiae assumenda alias delectus minus porro quae repellat iusto maxime, voluptates, doloribus recusandae quidem vi
      tae ipsum deleniti, cupiditate debitis eos? Odio sunt hic expedita eligendi saepe vitae, temporibus architecto minus esse rem tempora animi possimus dolore.
    </v-container>

    <v-container class="mt-0">
      <v-row justify="center">
        <age-demographics class="mb-5 custom-card" />
        <gender-demographics class="mb-5 custom-card" />
        <education-attained-demographics class="mb-5 custom-card" />      
      </v-row>  
      <v-row justify="center">
        <marginalized-demographics />
        <source-income-demographics />
      </v-row>
      <v-row justify="center">
        <marginalized-demographics />
        <house-expenses />
      </v-row>
      <v-row justify="center">
        <area-coffee-farm-demographics />
      </v-row>
      <v-row justify="center">
        <cropping-system />
        <commodity />
      </v-row>
    </v-container>
  
  </div>
</template>

<script>
import ageDemographics from '../../charts/demograhpics/ageDemographics.vue'
import areaCoffeeFarmDemographics from '../../charts/demograhpics/areaCoffeeFarmDemographics.vue'
import croppingSystem from '../../charts/demograhpics/croppingSystemDemographics.vue'
import educationAttainedDemographics from '../../charts/demograhpics/educationAttainedDemographics.vue'
import genderDemographics from '../../charts/demograhpics/genderDemographics.vue'
import houseExpenses from '../../charts/demograhpics/houseExpensesDemographics.vue'
import marginalizedDemographics from '../../charts/demograhpics/marginalizedDemographics.vue'
import sourceIncomeDemographics from '../../charts/demograhpics/sourceIncomeDemographics.vue'
import commodity from '../../charts/demograhpics/commodityDemographics.vue'
export default {  
  components: {
    ageDemographics,
    genderDemographics,
    educationAttainedDemographics,
    marginalizedDemographics,
    sourceIncomeDemographics,
    houseExpenses,
    areaCoffeeFarmDemographics,
    croppingSystem,
    commodity
   },
}
</script>