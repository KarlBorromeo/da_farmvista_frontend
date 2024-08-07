<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-text-field
            v-model="avgYearsGeneralFarming"
            :rules="numberRule"
            label="* Average years in general farming"
            type="number"
            min="0"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="avgYearsContourFarming"
            :rules="numberRule"
            label="* Average years in contour farming/agroforestry"
            type="number"
            min="0"
          ></v-text-field>
        </form-input-container>

        <form-radio-container
          title="Was there time stopped farming?"
          :required="true"
        >
          <v-radio-group
            :rules="requiredRule"
            v-model="isThereStoppedFarming"
            class="pa-0 ma-0"
          >
            <v-radio
              v-for="item in isThereStoppedFarmingItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-input-container v-if="isStopped">
          <v-text-field
            v-model="yearStopped"
            :rules="yearRule"
            label="* Specify year stopped"
            type="number"
            min="0"
          ></v-text-field>
        </form-input-container>

        <form-input-container v-if="isStopped">
          <v-text-field
            v-model="yearResumed"
            :rules="yearRule"
            label="* Specify year resumed"
            type="number"
            min="0"
          ></v-text-field>
        </form-input-container>

        <form-input-container v-if="isStopped">
          <v-text-field
            v-model="reasonStopping"
            label="* Provide reason for stopping"
          ></v-text-field>
        </form-input-container>
      </v-row>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
export default {
  activated(){
    this.validate()
  },
  components: { FormInputContainer, FormRadioContainer },
  data() {
    return {
      valid: false,
      avgYearsGeneralFarming: '1',
      avgYearsContourFarming: '2',
      isThereStoppedFarming: 'no',
      isThereStoppedFarmingItems: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'partially', label: 'Partially' },
      ],
      yearStopped: '',
      yearResumed: '',
      yearRule: [
        (v) => {
          if (this.isThereStoppedFarming != 'no') {
            const year = parseInt(v)
            const currentDate = new Date()
            const currentYear = currentDate.getFullYear()
            if (year > 1900 && year <= currentYear) {
              return true
            } else {
              return 'invalid year'
            }
          } else {
            return true
          }
        },
      ],
      reasonStopping: '',
      requiredRule: [(v) => !!v || 'this field is required'],
      numberRule: [(v) => parseFloat(v) >= 0 || 'invalid value'],
      tempValue: '',
    }
  },
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
      const validTexts = this.$refs.form.validate()
      const optionalFieldValid = this.validateConditionalFields()
      let valid = false
      if (validTexts && optionalFieldValid) {
        valid = true
      }
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'GeneralFarmingInformationValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'generalFarmingInfo',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        avgYrsGeneralFarming: parseInt(this.avgYearsGeneralFarming),
        avgYrsCtrFarming: parseInt(this.avgYearsContourFarming),
        isThereTimeStoppedFarming: this.isThereStoppedFarming,
        yearStoppedFarming: this.yearStopped,
        yearResumedFarming: this.yearResumed,
        reasonStopping: this.reasonStopping,
      }
    },
    /* validate conditional fields if empty or not */
    validateConditionalFields() {
      if (
        this.isThereStoppedFarming == 'yes' &&
        (this.yearStopped == '' ||
          this.yearResumed == '' ||
          this.reasonStopping == '')
      ) {
        return false
      }
      return true
    },
  },
  computed: {
    isStopped() {
      if (
        this.isThereStoppedFarming === 'yes' ||
        this.isThereStoppedFarming === 'partially'
      ) {
        return true
      }
      return false
    },
  },
  watch: {
    /* reset other fields to empty if chose 'no' */
    isThereStoppedFarming(value) {
      if (value == 'no') {
        this.yearStopped = ''
        this.yearResumed = ''
        this.reasonStopping = ''
      }
      this.validate()
    },
    avgYearsGeneralFarming() {
      this.validate()
    },
    avgYearsContourFarming() {
      this.validate()
    },
    yearStopped() {
      this.validate()
    },
    yearResumed() {
      this.validate()
    },
    reasonStopping() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
  beforeMount() {
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.avgYearsGeneralFarming = data.generalFarmingInfo.avgYrsGeneralFarming
      this.avgYearsContourFarming = data.generalFarmingInfo.avgYrsCtrFarming
      this.isThereStoppedFarming =
        data.generalFarmingInfo.isThereTimeStoppedFarming
      this.yearStopped = data.generalFarmingInfo.yearStoppedFarming
      this.yearResumed = data.generalFarmingInfo.yearResumedFarming
      this.reasonStopping = data.generalFarmingInfo.reasonStopping
    } else {
      this.avgYearsGeneralFarming = ''
      this.avgYearsContourFarming = ''
      this.isThereStoppedFarming = ''
      this.yearStopped = ''
      this.yearResumed = ''
      this.reasonStopping = ''
    }
    this.tempValue = 'tempValue'
  },
}
</script>
