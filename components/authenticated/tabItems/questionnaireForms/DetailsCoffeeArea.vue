<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Classification of crops</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="classificationCropsDetails"
              :rules="requiredRule"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-input-container>
            <v-text-field
              v-model="classificationCropsReasons"
              :rules="requiredRule"
              label="* Reason for using"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>

      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Year Planted</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="yearPlantedDetails"
              :rules="yearRule"
              label="* Details"
              type="number"
            ></v-text-field>
          </form-input-container>
          <form-input-container>
            <v-text-field
              v-model="yearPlantedReasons"
              :rules="requiredRule"
              label="* Reason for using"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>

      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Planting Distance</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="plantingDistanceDetails"
              :rules="requiredRule"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Reason for Using">
            <v-radio-group
              :rules="requiredRule"
              v-model="plantingDistanceReasons"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in reasonUsingItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="plantingDistanceReasons == 'others'"
                v-model="plantingDistanceReasonsOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>

      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Number of Plants or stands</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="numberPlantsDetails"
              :rules="requiredRule"
              label="* Details"
              type="number"
            ></v-text-field>
          </form-input-container>
          <form-input-container>
            <v-text-field
              v-model="numberPlantsReasons"
              :rules="requiredRule"
              label="* Reason for using"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>

      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Intercrop and Variety</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="intercropVarietyDetails"
              :rules="requiredRule"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Reason for Using">
            <v-radio-group
              :rules="requiredRule"
              v-model="intercropVarietyReasons"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in reasonUsingItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="intercropVarietyReasons == 'others'"
                v-model="intercropVarietyReasonsOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Total Area (ha)</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="totalAreaDetails"
              :rules="numberRule"
              label="* Details"
              type="number"
            ></v-text-field>
          </form-input-container>
          <form-input-container>
            <v-text-field
              v-model="totalAreaReasons"
              :rules="requiredRule"
              label="* Reason for using"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Seed Source</p>
        <v-row>
          <form-checkbox-container title="Details">
            <v-checkbox
              v-for="item in seedSourceItems"
              v-model="seedSourceDetails"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-6"
              style="display: inline-block"
            ></v-checkbox>
            <v-text-field
              v-if="isOtherTicked(seedSourceDetails)"
              v-model="seedSourceDetailsOther"
              label="* please specify"
            ></v-text-field>
          </form-checkbox-container>

          <form-radio-container title="Reason for Using">
            <v-radio-group
              :rules="requiredRule"
              v-model="seedSourceReasons"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in reasonUsingItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="seedSourceReasons == 'others'"
                v-model="seedSourceReasonsOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import {
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
  isOtherValueTickedCheckbox,
  concatOtherValueToList,
  extractUnmatchedValueCheck,
} from '~/reusableFunctions/questionnaireValidation'
import FormCheckboxContainer from '../../form/formCheckboxContainer.vue'
export default {
  components: {
    formCard,
    FormInputContainer,
    FormRadioContainer,
    FormCheckboxContainer,
  },
  data: () => ({
    valid: false,
    classificationCropsDetails: 'sampleData',
    classificationCropsReasons: 'sampleData',
    yearPlantedDetails: 1997,
    yearPlantedReasons: 'sampleData',
    plantingDistanceDetails: '4',
    plantingDistanceReasons: 'others',
    plantingDistanceReasonsOther: 'sampleData Other',
    numberPlantsDetails: 5,
    numberPlantsReasons: 'sampleData',
    intercropVarietyDetails: 'sampleData',
    intercropVarietyReasons: 'others',
    intercropVarietyReasonsOther: 'sample Data Other',
    totalAreaDetails: 2,
    totalAreaReasons: 'sampleData',
    seedSourceDetails: [],
    seedSourceDetailsOther: '',
    seedSourceReasons: 'recommended by other farmer',
    seedSourceReasonsOther: '',
    seedSourceItems: [],
    reasonUsingItems: [],
    requiredRule: [(v) => !!v || 'This field is required'],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
    yearRule: [
      (v) => {
        const value = parseInt(v)
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        if (value > 1900 && value <= currentYear) {
          return true
        }
        return 'invalid year value'
      },
    ],
    tempValue: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      let valid = false
      const validTextRadio = this.$refs.form.validate()
      const validCheckbox = this.validateCheckbox()
      console.log(validTextRadio, validCheckbox)
      if (validTextRadio && validCheckbox) {
        valid = true
      }
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'DetailsCoffeeAreaValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'detailCoffeeArea',
          data: this.getData(),
        })
        console.log('data:', this.getData())
      }
    },
    /* test if the checkbox are not empty */
    validateCheckbox() {
      console.log(this.seedSourceDetails.length)
      if (this.seedSourceDetails.length < 1) {
        return false
      } else if (
        this.seedSourceDetails.includes('others') &&
        !this.seedSourceDetailsOther
      ) {
        return false
      } else {
        console.log('hahahh:', this.seedSourceDetails)
        return true
      }
    },
    /* concatenate two value holders for field that has others (ex: variable, variableOther)*/
    concatinateValues(original, other) {
      let text = original
      if (!!other) {
        text += ' ' + other
      }
      return text
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        classificationCrops: {
          details: this.classificationCropsDetails,
          reasonUsing: this.classificationCropsReasons,
        },
        yearPlanted: {
          details: parseInt(this.yearPlantedDetails),
          reasonUsing: this.yearPlantedReasons,
        },
        plantingDistance: {
          details: this.plantingDistanceDetails,
          reasonUsing: this.concatinateValues(
            this.plantingDistanceReasons,
            this.plantingDistanceReasonsOther
          ),
        },
        numberPlantsStands: {
          details: parseInt(this.numberPlantsDetails),
          reasonUsing: this.numberPlantsReasons,
        },
        intercropVariety: {
          details: this.intercropVarietyDetails,
          reasonUsing: this.concatinateValues(
            this.intercropVarietyReasons,
            this.intercropVarietyReasonsOther
          ),
        },
        totalArea: {
          details: parseInt(this.totalAreaDetails),
          reasonUsing: this.totalAreaReasons,
        },
        seedSource: {
          details: concatOtherValueToList(
            this.seedSourceDetails,
            this.seedSourceDetailsOther
          ),
          reasonUsing: this.concatinateValues(
            this.seedSourceReasons,
            this.seedSourceReasonsOther
          ),
        },
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
    this.reasonUsingItems = this.$store.getters['questionnaireCode/Code16B']
    this.seedSourceItems = this.$store.getters['questionnaireCode/Code16A']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.classificationCropsDetails =
        data.detailCoffeeArea.classificationCrops.details
      this.classificationCropsReasons =
        data.detailCoffeeArea.classificationCrops.reasonUsing
      this.yearPlantedDetails = data.detailCoffeeArea.yearPlanted.details
      this.yearPlantedReasons = data.detailCoffeeArea.yearPlanted.reasonUsing
      this.plantingDistanceDetails =
        data.detailCoffeeArea.plantingDistance.details
      this.plantingDistanceReasons = isOtherValueDefinedRadio(
        data.detailCoffeeArea.plantingDistance.reasonUsing,
        this.reasonUsingItems
      )
      this.plantingDistanceReasonsOther = extractUnmatchedValueRadio(
        data.detailCoffeeArea.plantingDistance.reasonUsing,
        this.reasonUsingItems
      )
      this.numberPlantsDetails =
        data.detailCoffeeArea.numberPlantsStands.details
      this.numberPlantsReasons =
        data.detailCoffeeArea.numberPlantsStands.reasonUsing
      this.intercropVarietyDetails =
        data.detailCoffeeArea.intercropVariety.details
      this.intercropVarietyReasons = isOtherValueDefinedRadio(
        data.detailCoffeeArea.intercropVariety.reasonUsing,
        this.reasonUsingItems
      )
      this.intercropVarietyReasonsOther = extractUnmatchedValueRadio(
        data.detailCoffeeArea.intercropVariety.reasonUsing,
        this.reasonUsingItems
      )
      this.totalAreaDetails = data.detailCoffeeArea.totalArea.details
      this.totalAreaReasons = data.detailCoffeeArea.totalArea.reasonUsing
      this.seedSourceDetails = isOtherValueTickedCheckbox(
        data.detailCoffeeArea.seedSource.details,
        this.seedSourceItems
      )
      this.seedSourceDetailsOther = extractUnmatchedValueCheck(
        data.detailCoffeeArea.seedSource.details,
        this.seedSourceItems
      )
      this.seedSourceReasons = isOtherValueDefinedRadio(
        data.detailCoffeeArea.seedSource.reasonUsing,
        this.reasonUsingItems
      )
      this.seedSourceReasonsOther = extractUnmatchedValueRadio(
        data.detailCoffeeArea.seedSource.reasonUsing,
        this.reasonUsingItems
      )
    } else {
      this.classificationCropsDetails = ''
      this.classificationCropsReasons = ''
      this.yearPlantedDetails = ''
      this.yearPlantedReasons = ''
      this.plantingDistanceDetails = ''
      this.plantingDistanceReasons = ''
      this.plantingDistanceReasonsOther = ''
      this.numberPlantsDetails = ''
      this.numberPlantsReasons = ''
      this.intercropVarietyDetails = ''
      this.intercropVarietyReasons = ''
      this.intercropVarietyReasonsOther = ''
      this.totalAreaDetails = ''
      this.totalAreaReasons = ''
      this.seedSourceDetails = []
      this.seedSourceDetailsOther = ''
      this.seedSourceReasons = ''
      this.seedSourceReasonsOther = ''
    }
    this.tempValue = 'tempValue'
  },
  watch: {
    plantingDistanceReasons(value) {
      this.validate()
      if (value !== 'others') {
        this.plantingDistanceReasonsOther = ''
      }
    },
    intercropVarietyReasons(value) {
      this.validate()
      if (value !== 'others') {
        this.intercropVarietyReasonsOther = ''
      }
    },
    seedSourceDetails(value) {
      this.validate()
      if (!value.includes('others')) {
        this.seedSourceDetailsOther = ''
      }
    },
    seedSourceReasons(value) {
      this.validate()
      if (value !== 'others') {
        this.seedSourceReasonsOther = ''
      }
    },
    classificationCropsDetails() {
      this.validate()
    },
    classificationCropsReasons() {
      this.validate()
    },
    yearPlantedDetails() {
      this.validate()
    },
    yearPlantedReasons() {
      this.validate()
    },
    plantingDistanceDetails() {
      this.validate()
    },
    plantingDistanceReasonsOther() {
      this.validate()
    },
    numberPlantsDetails() {
      this.validate()
    },
    numberPlantsReasons() {
      this.validate()
    },
    intercropVarietyDetails() {
      this.validate()
    },
    intercropVarietyReasonsOther() {
      this.validate()
    },
    totalAreaDetails() {
      this.validate()
    },
    totalAreaReasons() {
      this.validate()
    },
    seedSourceDetailsOther() {
      this.validate()
    },
    seedSourceReasonsOther() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
}
</script>
