<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="i in items" :key="i">
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="cropsGrown[i - 1]"
              :rules="requiredRule"
              label="* Crops grown in the area"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Utilized?">
            <v-radio-group v-model="isUtilized[i - 1]" class="pa-0 ma-0">
              <v-radio
                v-for="item in isUtilizedItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
              <div v-if="!isUtilized[i - 1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormInputContainer from '../../cards/formInputContainer.vue'
import FormRadioContainer from '../../cards/formRadioContainer.vue'
export default {
  components: {
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    items: 1,
    startPlanting: '',
    soucePlantingMaterial: '',
    soucePlantingMaterialItems: [],
    coffeeVariety: '',
    coffeeVarietyItems: [],
    methodLandPreparation: '',
    methodLandPreparationItems: [],
    methodLandPreparationOther: '',
    rowOrientation: '',
    rowOrientationItems: [],
    plantingDepth: '',
    soilType: '',
    weedControl: '',
    weedControlOther: '',
    insectPestManagement: '',
    insectPestManagementOther: '',
    diseaseManagement: '',
    diseaseManagementOther: '',
    typeMethodItems: [], //items for weedControl, insectPestMngmnt, diseaseMngmnt
    isUseInorganicFertilizer: '',
      // if yes
      kindInorganicFertilizer: '',
      methodApplicationInorganicFertilizer: '',
    isUseOrganicFertilizer: '',
      // if yes
      kindOgranicFertilizer: '',
      methodOrganicApplication: '',
    
    methodApplicationItems: [], //items for methodApplicationInorganicFertilizer, methodOrganicApplication
    isPracticeGreenManuring: '',
    isReturnCropResidue: '',
    dateHarvesting: '',
    isAgreeItems: ['yes','no'], //items for isUseInorganicFertilizer, isUseOrganicFertilizer, isPracticeGreenManuring, isReturnCropResidue
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      const radioCheckboxValid = this.validateRadioCheckbox()
      if (valid && radioCheckboxValid) {
        const data = this.getData()
        console.log(data)
      }
    },
    /* check if radio inputs are not empty */
    validateRadioCheckbox() {
      for (let i = 0; i < this.items; i++) {
        if (!this.isUtilized[i]) {
          return false
        }
      }
      return true
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        startPlanting: '',      
        sourcePlantingMaterial: '',
        coffeeVarietyUsed: '',
        methodLandPreparation: '',
        rowOrientation: '',
        plantingDepth: '',  
        soilType: '',
        weedControl: '',
        insectPestManagement: '',
        diseaseManagement: '',
        isUseInorganicFertilizer: '',   
        specifyInorganicFertilizer: '',
        methodInorganicApplication: '', 
        isUseOrganicFertilizer: '',
        specifyOrganicFertilizer: '',
        methodOrganicApplication: '',
        isPracticeGreenManuring: '',
        isReturnCropResidue: '',
        dateHarvesting: ''
      }
    },
  },
  beforeMount(){
    this.soucePlantingMaterialItems = this.$store.getters['questionnaireCode/Code21A']
    this.coffeeVarietyItems = this.$store.getters['questionnaireCode/Code21B']
    this.methodLandPreparationItems = this.$store.getters['questionnaireCode/Code21C']
    this.rowOrientationItems = this.$store.getters['questionnaireCode/Code21D']
    this.typeMethodItems = this.$store.getters['questionnaireCode/Code21E']
    this.methodApplicationItems = this.$store.getters['questionnaireCode/Code21F']
  }
}
</script>
