<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="startPlanting"
              :rules="yearRule"
              label="* Start of planting"
            ></v-text-field>
          </form-input-container>

          <form-checkbox-container title="Source of planting material">
            <v-checkbox
              :rules="listRule"
              v-for="item in sourcePlantingMaterialItems"
              v-model="sourcePlantingMaterial"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-6"
              style="display: inline-block"
            ></v-checkbox>
            <v-text-field
              v-if="isOtherTicked(sourcePlantingMaterial)"
              v-model="sourcePlantingMaterialOther"
              :rules="requiredRule"
              label="* please specify"
            ></v-text-field>
          </form-checkbox-container>

          <form-checkbox-container title="Coffee variety used">
            <v-checkbox
              :rules="listRule"
              v-for="item in coffeeVarietyItems"
              v-model="coffeeVariety"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-6"
              style="display: inline-block"
            ></v-checkbox>
            <v-text-field
              v-if="isOtherTicked(coffeeVariety)"
              v-model="coffeeVarietyOther"
              :rules="requiredRule"
              label="* please specify"
            ></v-text-field>
          </form-checkbox-container>

          <form-checkbox-container title="Method of land preparation">
            <v-checkbox
              v-for="item in methodLandPreparationItems"
              v-model="methodLandPreparation"
              :rules="listRule"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-6"
              style="display: inline-block"
            ></v-checkbox>
            <v-text-field
              v-if="isOtherTicked(methodLandPreparation)"
              v-model="methodLandPreparationOther"
              :rules="requiredRule"
              label="* please specify"
            ></v-text-field>
          </form-checkbox-container>

          <form-checkbox-container title="Row orientation">
            <v-checkbox
              v-for="item in rowOrientationItems"
              v-model="rowOrientation"
              :rules="listRule"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-6"
              style="display: inline-block"
            ></v-checkbox>
            <v-text-field
              v-if="isOtherTicked(rowOrientation)"
              v-model="rowOrientationOther"
              :rules="requiredRule"
              label="* please specify"
            ></v-text-field>
          </form-checkbox-container>

          <form-input-container>
            <v-text-field
              v-model="plantingDepth"
              :rules="numberRule"
              label="* Planting Depth"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="soilType"
              label="Soil Type (optional)"
            ></v-text-field>
          </form-input-container>

          <form-checkbox-container title="Weed Control">
            <v-checkbox
              v-for="item in typeMethodItems"
              v-model="weedControl"
              :rules="listRule"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-6"
              style="display: inline-block"
            ></v-checkbox>
            <v-text-field
              v-if="isOtherTicked(weedControl)"
              v-model="weedControlOther"
              :rules="requiredRule"
              label="* please specify"
            ></v-text-field>
          </form-checkbox-container>

          <form-checkbox-container title="Insect Pest Management">
            <v-checkbox
              v-for="item in typeMethodItems"
              v-model="insectPestManagement"
              :rules="listRule"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-6"
              style="display: inline-block"
            ></v-checkbox>
            <v-text-field
              v-if="isOtherTicked(insectPestManagement)"
              v-model="insectPestManagementOther"
              :rules="requiredRule"
              label="* please specify"
            ></v-text-field>
          </form-checkbox-container>

          <form-checkbox-container title="Disease Management">
            <v-checkbox
              v-for="item in typeMethodItems"
              v-model="diseaseManagement"
              :rules="listRule"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-6"
              style="display: inline-block"
            ></v-checkbox>
            <v-text-field
              v-if="isOtherTicked(diseaseManagement)"
              v-model="diseaseManagementOther"
              :rules="requiredRule"
              label="* please specify"
            ></v-text-field>
          </form-checkbox-container>

          <form-radio-container title="Use of inorganic fertilizer">
            <v-radio-group
              :rules="requiredRule"
              v-model="isUseInorganicFertilizer"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isAgreeItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container v-if="isUseInorganicFertilizer == 'yes'">
            <v-text-field
              v-model="kindInorganicFertilizer"
              :rules="requiredRule"
              label="* If 'yes', specify the inorganic fertilizer"
            ></v-text-field>
          </form-input-container>

          <form-radio-container v-if="isUseInorganicFertilizer == 'yes'" title=" Specify the method of inorganic application">
            <v-radio-group
              :rules="requiredRule"
              v-model="methodInorganicApplication"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in methodApplicationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="methodInorganicApplication == 'others'"
                v-model="methodInorganicApplicationOther"
                :rules="requiredRule"
                label="* this field is required"
              ></v-text-field>
              <div
                v-if="!methodInorganicApplication"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Use of organic fertilizer">
            <v-radio-group
              :rules="requiredRule"
              v-model="isUseOrganicFertilizer"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isAgreeItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container v-if="isUseOrganicFertilizer == 'yes'">
            <v-text-field
              v-model="kindOgranicFertilizer"
              :rules="requiredRule"
              label="* If 'yes', specify the organic fertilizer"
            ></v-text-field>
          </form-input-container>

          <form-radio-container v-if="isUseOrganicFertilizer == 'yes'" title=" Specify the method of organic application">
            <v-radio-group
              :rules="requiredRule"
              v-model="methodOrganicApplication"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in methodApplicationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="methodOrganicApplication == 'others'"
                v-model="methodOrganicApplicationOther"
                :rules="requiredRule"
                label="* this field is required"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Practice green manuring">
            <v-radio-group
              :rules="requiredRule"
              v-model="isPracticeGreenManuring"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isAgreeItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Return crop residue">
            <v-radio-group
              :rules="requiredRule"
              v-model="isReturnCropResidue"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isAgreeItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="dateHarvesting"
              :rules="requiredRule"
              label="* Date of Harvesting, Example: 02 - 2012 , 16 - 2023"
            ></v-text-field>
          </form-input-container>          
        </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormCheckboxContainer from '../../form/formCheckboxContainer.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
import { concatOtherValueToList, concatinateOtherValueToString } from '~/reusableFunctions/questionnaireValidation'
export default {
  components: {
    FormInputContainer,
    FormRadioContainer,
    FormCheckboxContainer,
  },
  data: () => ({
    valid: false,
    items: 1,
    startPlanting: '',
    sourcePlantingMaterial: [],
    sourcePlantingMaterialItems: [],
    sourcePlantingMaterialOther: '',
    coffeeVariety: [],
    coffeeVarietyItems: [],
    coffeeVarietyOther: '',
    methodLandPreparation: [],
    methodLandPreparationItems: [],
    methodLandPreparationOther: '',
    rowOrientation: [],
    rowOrientationItems: [],
    rowOrientationOther: '',
    plantingDepth: '',
    soilType: '',
    weedControl: [],
    weedControlOther: '',
    insectPestManagement: [],
    insectPestManagementOther: '',
    diseaseManagement: [],
    diseaseManagementOther: '',
    typeMethodItems: [], //items for weedControl, insectPestMngmnt, diseaseMngmnt
    isUseInorganicFertilizer: '',
      // if yes
      kindInorganicFertilizer: '',
      methodInorganicApplication: '',
      methodInorganicApplicationOther: '',
    isUseOrganicFertilizer: '',
      // if yes
      kindOgranicFertilizer: '',
      methodOrganicApplication: '',
      methodOrganicApplicationOther: '',
    methodApplicationItems: [], //items for methodApplicationInorganicFertilizer, methodOrganicApplication
    isPracticeGreenManuring: '',
    isReturnCropResidue: '',
    dateHarvesting: '',
    isAgreeItems: ['yes', 'no'], //items for isUseInorganicFertilizer, isUseOrganicFertilizer, isPracticeGreenManuring, isReturnCropResidue
    requiredRule: [(v) => !!v || 'This field is required'],
    listRule: [ (v) => v.length>0 || 'select at least one option' ],
    yearRule: [
      (v) => !!v || 'This field is required',
      (v) => {
        const value = parseInt(v)
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        if (value > 1900 && value <= currentYear) {
          return true
        } else {
          return 'invalid year value'
        }
      },
    ],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid depth value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      console.log(valid, this.getData())
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        startPlanting: this.startPlanting,
        sourcePlantingMaterial: concatOtherValueToList(this.sourcePlantingMaterial,this.sourcePlantingMaterialOther),
        coffeeVarietyUsed: concatOtherValueToList(this.coffeeVariety,this.coffeeVarietyOther),
        methodLandPreparation: concatOtherValueToList(this.methodLandPreparation,this.sourcePlantingMaterialOther),
        rowOrientation: concatOtherValueToList(this.rowOrientation,this.sourcePlantingMaterialOther),
        plantingDepth: this.plantingDepth,
        soilType: this.soilType,
        weedControl: concatOtherValueToList(this.weedControl,this.sourcePlantingMaterialOther),
        insectPestManagement: concatOtherValueToList(this.insectPestManagement,this.sourcePlantingMaterialOther),
        diseaseManagement: concatOtherValueToList(this.diseaseManagement,this.sourcePlantingMaterialOther),
        isUseInorganicFertilizer: this.isUseInorganicFertilizer,
        specifyInorganicFertilizer: this.kindInorganicFertilizer,
        methodInorganicApplication: concatinateOtherValueToString(this.methodInorganicApplication,this.methodInorganicApplicationOther),
        isUseOrganicFertilizer: this.isUseOrganicFertilizer,
        specifyOrganicFertilizer: this.kindOgranicFertilizer,
        methodOrganicApplication: concatinateOtherValueToString(this.methodOrganicApplication,this.methodInorganicApplicationOther),
        isPracticeGreenManuring: this.isPracticeGreenManuring,
        isReturnCropResidue: this.isReturnCropResidue,
        dateHarvesting: this.dateHarvesting,
      }
    },
    /* check if 'other' checkbox is ticked */
    isOtherTicked(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] == 'others') {
          return true
        }
      }
      return false
    },
  },
  beforeMount() {
    this.sourcePlantingMaterialItems =
      this.$store.getters['questionnaireCode/Code21A']
    this.coffeeVarietyItems = this.$store.getters['questionnaireCode/Code21B']
    this.methodLandPreparationItems =
      this.$store.getters['questionnaireCode/Code21C']
    this.rowOrientationItems = this.$store.getters['questionnaireCode/Code21D']
    this.typeMethodItems = this.$store.getters['questionnaireCode/Code21E']
    this.methodApplicationItems =
      this.$store.getters['questionnaireCode/Code21F']
  },
  watch: {
    isUseInorganicFertilizer(value){
      if(value == 'no'){
        this.kindInorganicFertilizer = '';
        this.methodInorganicApplication = '';
        this.methodInorganicApplicationOther = '';
      }
    },
    isUseOrganicFertilizer(value){
      if(value == 'no'){
        this.kindOgranicFertilizer = '';
        this.methodOrganicApplication = '';
        this.methodOrganicApplicationOther = '';
      }
    },
    sourcePlantingMaterial(value){
      const otherTicked = value.findIndex((item)=>item == 'others');
      if(!otherTicked){
        this.sourcePlantingMaterialOther = '';
      }
    },
    coffeeVariety(value){
      const otherTicked = value.findIndex((item)=>item == 'others');
      if(!otherTicked){
        this.coffeeVarietyOther = '';
      }
    },
    methodLandPreparation(value){
      const otherTicked = value.findIndex((item)=>item == 'others');
      if(!otherTicked){
        this.methodLandPreparationOther = '';
      }
    },
    rowOrientation(value){
      const otherTicked = value.findIndex((item)=>item == 'others');
      if(!otherTicked){
        this.rowOrientationOther = '';
      }
    },
    weedControl(value){
      const otherTicked = value.findIndex((item)=>item == 'others');
      if(!otherTicked){
        this.weedControlOther = '';
      }
    },
    insectPestManagement(value){
      const otherTicked = value.findIndex((item)=>item == 'others');
      if(!otherTicked){
        this.insectPestManagementOther = '';
      }
    },
    diseaseManagement(value){
      const otherTicked = value.findIndex((item)=>item == 'others');
      if(!otherTicked){
        this.diseaseManagementOther = '';
      }
    },
  }
}
</script>
