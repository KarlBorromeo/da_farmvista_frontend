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

        <form-checkbox-container
          title="Source of planting material"
          :required="true"
        >
          <v-checkbox
            v-for="item in sourcePlantingMaterialItems"
            v-model="sourcePlantingMaterial"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 mr-5"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(sourcePlantingMaterial)"
            v-model="sourcePlantingMaterialOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="Coffee variety used" :required="true">
          <v-checkbox
            v-for="item in coffeeVarietyItems"
            v-model="coffeeVariety"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 mr-5"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(coffeeVariety)"
            v-model="coffeeVarietyOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container
          title="Method of land preparation"
          :required="true"
        >
          <v-checkbox
            v-for="item in methodLandPreparationItems"
            v-model="methodLandPreparation"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 mr-5"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(methodLandPreparation)"
            v-model="methodLandPreparationOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="Row orientation" :required="true">
          <v-checkbox
            v-for="item in rowOrientationItems"
            v-model="rowOrientation"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 mr-5"
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
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 mr-5"
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
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 mr-5"
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
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 mr-5"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(diseaseManagement)"
            v-model="diseaseManagementOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-radio-container
          title="Use of inorganic fertilizer"
          :required="true"
        >
          <v-radio-group
            row
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

        <form-radio-container
          v-if="isUseInorganicFertilizer == 'yes'"
          title=" Specify the method of inorganic application"
          :required="true"
        >
          <v-radio-group
            row
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
            <div v-if="!methodInorganicApplication" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container
          title="Use of organic fertilizer"
          :required="true"
        >
          <v-radio-group
            row
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

        <form-radio-container
          v-if="isUseOrganicFertilizer == 'yes'"
          title=" Specify the method of organic application"
          :required="true"
        >
          <v-radio-group
            row
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

        <form-radio-container title="Practice green manuring" :required="true">
          <v-radio-group
            row
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

        <form-radio-container title="Return crop residue" :required="true">
          <v-radio-group
            row
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
            :rules="regexRule"
            label="* Date of Harvesting, Example: 02 - 2012 , 11 - 2023 or 10 - 2020"
          ></v-text-field>
        </form-input-container>
      </v-row>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import FormCheckboxContainer from '~/components/authenticated/form/formCheckboxContainer.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import {
  concatOtherValueToList,
  concatinateOtherValueToString,
  extractUnmatchedValueCheck,
  isOtherValueTickedCheckbox,
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
} from '~/reusableFunctions/questionnaireValidation'
export default {
  activated(){
    this.validate()
  },
  components: {
    FormInputContainer,
    FormRadioContainer,
    FormCheckboxContainer,
  },
  data: () => ({
    valid: false,
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
    plantingDepth: '.5',
    soilType: '',
    weedControl: [],
    weedControlOther: '',
    insectPestManagement: [],
    insectPestManagementOther: '',
    diseaseManagement: [],
    diseaseManagementOther: '',
    typeMethodItems: [], //items for weedControl, insectPestMngmnt, diseaseMngmnt
    isUseInorganicFertilizer: 'yes',
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
    listRule: [(v) => v.length > 0 || 'select at least one option'],
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
    numberRule: [(v) => parseFloat(v) >= 0 || 'invalid depth value'],
    regexRule: [
      (v) => {
        if (!v) {
          return 'field required'
        } else {
          const regex = /^\d{2}\s*-\s*\d{4}\s*(,\s*\d{2}\s*-\s*\d{4})?$/
          const result = regex.test(v)
          if (result) {
            return true
          } else {
            return 'follow the input pattern'
          }
        }
      },
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
      const textRadioValid = this.$refs.form.validate()
      const checkboxValid = this.validateCheckbox()
      let valid = false
      if (textRadioValid && checkboxValid) {
        valid = true
      }
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'DetailsCoffeeProductionValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'detailCoffeeProduction',
          data: this.getData(),
        })
      }
    },
    /* validate checkboxes if empty or not */
    validateCheckbox() {
      if (
        this.sourcePlantingMaterial.length == 0 ||
        this.coffeeVariety.length == 0 ||
        this.methodLandPreparation.length == 0 ||
        this.rowOrientation.length == 0
      ) {
        return false
      } else {
        return true
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        startPlanting: parseInt(this.startPlanting),
        sourcePlantingMaterial: concatOtherValueToList(
          this.sourcePlantingMaterial,
          this.sourcePlantingMaterialOther
        ),
        coffeeVarietyUsed: concatOtherValueToList(
          this.coffeeVariety,
          this.coffeeVarietyOther
        ),
        methodLandPreparation: concatOtherValueToList(
          this.methodLandPreparation,
          this.sourcePlantingMaterialOther
        ),
        rowOrientation: concatOtherValueToList(
          this.rowOrientation,
          this.sourcePlantingMaterialOther
        ),
        plantingDepth: parseFloat(this.plantingDepth),
        soilType: this.soilType,
        weedControl: concatOtherValueToList(
          this.weedControl,
          this.sourcePlantingMaterialOther
        ),
        insectPestManagement: concatOtherValueToList(
          this.insectPestManagement,
          this.sourcePlantingMaterialOther
        ),
        diseaseManagement: concatOtherValueToList(
          this.diseaseManagement,
          this.sourcePlantingMaterialOther
        ),
        isUseInorganicFertilizer: this.isUseInorganicFertilizer,
        specifyInorganicFertilizer: this.kindInorganicFertilizer,
        methodInorganicApplication: concatinateOtherValueToString(
          this.methodInorganicApplication,
          this.methodInorganicApplicationOther
        ),
        isUseOrganicFertilizer: this.isUseOrganicFertilizer,
        specifyOrganicFertilizer: this.kindOgranicFertilizer,
        methodOrganicApplication: concatinateOtherValueToString(
          this.methodOrganicApplication,
          this.methodInorganicApplicationOther
        ),
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

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.startPlanting = data.detailCoffeeProduction.startPlanting
      this.sourcePlantingMaterial = isOtherValueTickedCheckbox(
        data.detailCoffeeProduction.sourcePlantingMaterial,
        this.sourcePlantingMaterialItems
      )
      this.sourcePlantingMaterialOther = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.sourcePlantingMaterial,
        this.sourcePlantingMaterialItems
      )
      this.coffeeVariety = isOtherValueTickedCheckbox(
        data.detailCoffeeProduction.coffeeVarietyUsed,
        this.coffeeVarietyItems
      )
      this.coffeeVarietyOther = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.coffeeVarietyUsed,
        this.coffeeVarietyItems
      )
      this.methodLandPreparation = isOtherValueTickedCheckbox(
        data.detailCoffeeProduction.methodLandPreparation,
        this.methodLandPreparationItems
      )
      this.methodLandPreparationOther = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.methodLandPreparation,
        this.methodLandPreparationItems
      )
      this.rowOrientation = isOtherValueTickedCheckbox(
        data.detailCoffeeProduction.rowOrientation,
        this.rowOrientationItems
      )
      this.rowOrientationOther = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.rowOrientation,
        this.rowOrientationItems
      )
      this.plantingDepth = data.detailCoffeeProduction.plantingDepth
      this.soilType = data.detailCoffeeProduction.soilType
      this.weedControl = isOtherValueTickedCheckbox(
        data.detailCoffeeProduction.weedControl,
        this.typeMethodItems
      )
      this.weedControlOther = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.weedControl,
        this.typeMethodItems
      )
      this.insectPestManagement = isOtherValueTickedCheckbox(
        data.detailCoffeeProduction.insectPestManagement,
        this.typeMethodItems
      )
      this.insectPestManagementOther = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.insectPestManagement,
        this.typeMethodItems
      )
      this.diseaseManagement = isOtherValueTickedCheckbox(
        data.detailCoffeeProduction.diseaseManagement,
        this.typeMethodItems
      )
      this.diseaseManagementOther = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.diseaseManagement,
        this.typeMethodItems
      )
      this.isUseInorganicFertilizer =
        data.detailCoffeeProduction.isUseInorganicFertilizer
      this.kindInorganicFertilizer = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.specifyInorganicFertilizer,
        []
      )
      this.methodInorganicApplication = isOtherValueDefinedRadio(
        data.detailCoffeeProduction.methodInorganicApplication,
        this.methodApplicationItems
      )
      this.methodInorganicApplicationOther = extractUnmatchedValueRadio(
        data.detailCoffeeProduction.methodInorganicApplication,
        this.methodApplicationItems
      )
      this.isUseOrganicFertilizer =
        data.detailCoffeeProduction.isUseOrganicFertilizer
      this.kindOgranicFertilizer = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.specifyOrganicFertilizer,
        []
      )
      this.methodOrganicApplication = isOtherValueDefinedRadio(
        data.detailCoffeeProduction.methodOrganicApplication,
        this.methodApplicationItems
      )
      this.methodOrganicApplicationOther = extractUnmatchedValueRadio(
        data.detailCoffeeProduction.methodOrganicApplication,
        this.methodApplicationItems
      )
      this.isPracticeGreenManuring =
        data.detailCoffeeProduction.isPracticeGreenManuring
      this.isReturnCropResidue = data.detailCoffeeProduction.isReturnCropResidue
      this.dateHarvesting = extractUnmatchedValueCheck(
        data.detailCoffeeProduction.dateHarvesting,
        []
      )
    } else {
      this.startPlanting = ''
      this.sourcePlantingMaterial = []
      this.sourcePlantingMaterialOther = ''
      this.coffeeVariety = []
      this.coffeeVarietyOther = ''
      this.methodLandPreparation = []
      this.methodLandPreparationOther = ''
      this.rowOrientation = []
      this.rowOrientationOther = ''
      this.plantingDepth = ''
      this.soilType = ''
      this.weedControl = []
      this.weedControlOther = ''
      this.insectPestManagement = []
      this.insectPestManagementOther = ''
      this.diseaseManagement = []
      this.diseaseManagementOther = ''
      this.isUseInorganicFertilizer = ''
      this.kindInorganicFertilizer = ''
      this.methodInorganicApplication = ''
      this.methodInorganicApplicationOther = ''
      this.isUseOrganicFertilizer = ''
      this.kindOgranicFertilizer = ''
      this.methodOrganicApplication = ''
      this.methodOrganicApplicationOther = ''
      this.isPracticeGreenManuring = ''
      this.isReturnCropResidue = ''
      this.dateHarvesting = ''
    }
    this.tempValue = 'tempValue'
  },
  watch: {
    isUseInorganicFertilizer(value) {
      
      if (value == 'no') {
        this.kindInorganicFertilizer = ''
        this.methodInorganicApplication = ''
        this.methodInorganicApplicationOther = ''
      }
      this.validate()
    },
    methodInorganicApplication() {
      this.validate()
    },
    isUseOrganicFertilizer(value) {
      
      if (value == 'no') {
        this.kindOgranicFertilizer = ''
        this.methodOrganicApplication = ''
        this.methodOrganicApplicationOther = ''
      }
      this.validate()
    },
    methodOrganicApplication() {
      this.validate()
    },
    sourcePlantingMaterial(value) {
      
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.sourcePlantingMaterialOther = ''
      }
      this.validate()
    },
    sourcePlantingMaterialOther() {
      this.validate()
    },
    coffeeVariety(value) {
      
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.coffeeVarietyOther = ''
      }
      this.validate()
    },
    coffeeVarietyOther() {
      this.validate()
    },
    methodLandPreparation(value) {
      
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.methodLandPreparationOther = ''
      }
      this.validate()
    },
    methodLandPreparationOther() {
      this.validate()
    },
    rowOrientation(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.rowOrientationOther = ''
      }
      this.validate()
    },
    rowOrientationOther() {
      this.validate()
    },
    plantingDepth() {
      this.validate()
    },
    soilType() {
      this.validate()
    },
    weedControl(value) {
      
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.weedControlOther = ''
      }
      this.validate()
    },
    weedControlOther(){
      this.validate()
    },
    insectPestManagement(value) {
    
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.insectPestManagementOther = ''
      }
        this.validate()
    },
    insectPestManagementOther(){
      this.validate()
    },
    diseaseManagement(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.diseaseManagementOther = ''
      }
      this.validate()
    },
    diseaseManagementOther(){
      this.validate()
    },
    startPlanting() {
      this.validate()
    },
    sourcePlantingMaterialOther() {
      this.validate()
    },
    coffeeVarietyOther() {
      this.validate()
    },
    sourcePlantingMaterialOther() {
      this.validate()
    },
    sourcePlantingMaterialOther() {
      this.validate()
    },
    sourcePlantingMaterialOther() {
      this.validate()
    },
    sourcePlantingMaterialOther() {
      this.validate()
    },
    sourcePlantingMaterialOther() {
      this.validate()
    },
    kindInorganicFertilizer() {
      this.validate()
    },
    methodOrganicApplicationOther() {
      this.validate()
    },
    kindOgranicFertilizer() {
      this.validate()
    },
    methodInorganicApplicationOther() {
      this.validate()
    },
    isPracticeGreenManuring() {
      this.validate()
    },
    isReturnCropResidue() {
      this.validate()
    },
    dateHarvesting() {
      this.validate()
    },
  },
}
</script>
