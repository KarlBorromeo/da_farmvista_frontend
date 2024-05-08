<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="py-0 pb-2 my-0">
          <v-text-field
            v-model="avgYearsGeneralFarming"
            :rules="requiredRule"
            label="* Average years in general farming"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="py-0 pb-2 my-0">
          <v-text-field
            v-model="avgYearsContourFarming"
            :rules="requiredRule"
            label="* Average years in contour farming/agroforestry"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="py-0 my-0">
          <v-radio-group v-model="isThereStoppedFarming" class="pa-0 ma-0">
            <p class="pa-0 ma-0">
              * Did acquire through government or programs:
            </p>
            <v-radio
              v-for="item in isThereStoppedFarmingItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!isThereStoppedFarming" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
        <v-col v-if="isStopped" cols="12" md="4" class="py-0 pb-2 my-0">
          <v-text-field
            v-model="yearStopped"
            :rules="yearRule"
            label="* Specify year stopped"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col v-if="isStopped" cols="12" md="4" class="py-0 pb-2 my-0">
          <v-text-field
            v-model="yearResumed"
            :rules="yearRule"
            label="* Specify year resumed"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col v-if="isStopped" cols="12" md="4" class="py-0 pb-2 my-0">
          <v-text-field
            v-model="reasonStopping"
            :rules="reasonRule"
            label="* Provide reason for stopping"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    avgYearsGeneralFarming: '',
    avgYearsContourFarming: '',
    isThereStoppedFarming: '',
    isThereStoppedFarmingItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'partially', label: 'Partially' },
    ],
    yearStopped: '',
    yearResumed: '',
    yearRule: [
      (v) => {
        const year = parseInt(v)
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        if (year > 1900 && year <= currentYear) {
          return true
        } else {
          return 'invalid year'
        }
      },
    ],
    reasonStopping: '',
    reasonRule: [(v) => !!v || 'this field is required'],
    requiredRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) > 0 || 'invalid value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      const validRadio = this.validateRadio()
      if (valid && validRadio) {
        const data = this.getData()
        console.log(data)
      } else {
        alert('invalid')
      }
    },
    /* check if radio inputs are not empty */
    validateRadio() {
      if (!this.isThereStoppedFarming) {
        return false
      }
      return true
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        avgyrs_general_farming: this.avgYearsGeneralFarming,
        avgyrs_ctr_farming: this.avgYearsContourFarming,
        is_there_time_stopped_farming: this.isThereStoppedFarming,
        year_stopped_farming: this.yearStopped,
        year_resumed_farming: this.yearResumed,
        reason_stopping: this.reasonStopping,
      }
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
    },
  },
}
</script>
