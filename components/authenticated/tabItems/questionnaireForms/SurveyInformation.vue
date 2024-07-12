<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-text-field
            v-model="surveyNumber"
            :rules="surveyNumberRule"
            label="* Survey Number"
            required
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="validatorName"
            :rules="requiredRule"
            label="* Name of Interviewer Validator"
            required
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="date"
            :rules="dateRule"
            label="* Date of Validation"
            required
            type="date"
          ></v-text-field>
        </form-input-container>

        <form-menu-container>
          <v-dialog
            ref="timeStartPicker"
            v-model="timeStartPicker"
            :return-value.sync="interviewStart"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="interviewStart"
                label="* Interview Start (24 hrs format)"
                append-icon="mdi-clock-time-four-outline"
                :rules="interviewStartRule"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeStartPicker"
              v-model="interviewStart"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="timeStartPicker = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="saveTimeStart"> OK </v-btn>
            </v-time-picker>
          </v-dialog>
        </form-menu-container>

        <form-menu-container>
          <v-dialog
            ref="timeEndPicker"
            v-model="timeEndPicker"
            :return-value.sync="interviewEnd"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="interviewEnd"
                label="* Interview Start (24 hrs format)"
                append-icon="mdi-clock-time-four-outline"
                :rules="interviewEndRule"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeEndPicker"
              v-model="interviewEnd"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="timeEndPicker = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="saveTimeEnd"> OK </v-btn>
            </v-time-picker>
          </v-dialog>
        </form-menu-container>
      </v-row>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormMenuContainer from '~/components/authenticated/form/formMenuContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import FormSelectContainer from '~/components/authenticated/form/formSelectContainer.vue'
export default {
  activated(){
    this.validate()
  },
  components: {
    formInputContainer,
    FormRadioContainer,
    FormMenuContainer,
    FormSelectContainer,
  },
  data() {
    return {
      valid: false,
      surveyNumber: '',
      surveyNumberRule: [(v) => !!v || 'survey number is required'],
      validatorName: '',
      date: '',
      dateRule: [(v) => !!v || 'date is required'],
      interviewStart: '',
      timeStartPicker: false,
      interviewStartRule: [(v) => !!v || 'time start is required'],
      interviewEnd: '',
      timeEndPicker: false,
      interviewEndRule: [(v) => !!v || 'time end is required'],
      requiredRule: [(v) => !!v || 'this field is required'],
    }
  },

  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'SurveyInformationValidated',
        valid,
      })

      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'interview',
          data: this.getData(),
        })
      }

      // this is the basis to enable the submission tab, it is not really related to this form, it just to toggle the submission tab if the interviewee status is !validated <3
      // if (this.intervieweeStatus !== 'validated') {
      //   this.$store.commit('questionnaire/toggleNextTab', {
      //     tabName: 'OpenEndedQuestionRatingValidated',
      //     valid,
      //   })
      // }
    },
    /* converts into hh:mm format*/
    convertTimeToHHMM(timeStr) {
      if (!timeStr) {
        return ''
      }
      // Split the time string by colon
      let timeParts = timeStr.split(':')
      // Extract hours and minutes
      let hours = timeParts[0]
      let minutes = timeParts[1]
      // Format the result as hh:mm
      return `${hours}:${minutes}`
    },
    /* return the data of this form as an object */
    getData() {
      return {
        dateOfInterview: this.date,
        surveyNo: this.surveyNumber ? parseInt(this.surveyNumber) : '',
        validatorName: this.validatorName,
        interviewStart: this.convertTimeToHHMM(this.interviewStart),
        interviewEnd: this.convertTimeToHHMM(this.interviewEnd),
      }
    },
    /* ensure to execute the method validate() if saving time, sometimes the watch is not working well on this part*/
    saveTimeStart() {
      this.$refs.timeStartPicker.save(this.interviewStart)
      this.validate()
    },
    /* ensure to execute the method validate() if saving time, sometimes the watch is not working well on this part*/
    saveTimeEnd() {
      this.$refs.timeEndPicker.save(this.interviewEnd)
      this.validate()
    },
  },
  watch: {
    date() {
      this.validate()
    },
    surveyNumber() {
      this.validate()
    },
    validatorName() {
      this.validate()
    },
    interviewStart() {
      this.validate()
    },
    interviewEnd() {
      this.validate()
    }
  },
  beforeMount() {
    const isEditing = this.$store.getters['profiling/isEditingMode']
    if (isEditing) {
      const data = this.$store.getters['profiling/selectedRecord']
      if (Object.keys(data).length > 0) {
        this.intervieweeStatus = 'validated'
        this.date = data.interview.dateOfInterview
        this.surveyNumber = data.interview.surveyNo
        this.validatorName = data.interview.validatorName
        this.interviewStart = data.interview.interviewStart
        this.interviewEnd = data.interview.interviewEnd
        this.regionProvince = data.interview.regionProvince
        this.municipality = data.interview.cityMunicipality
        this.barangay = data.interview.barangay
      } else {
        this.intervieweeStatus = 'validated'
        this.date = ''
        this.surveyNumber = ''
        this.validatorName = ''
        this.interviewStart = ''
        this.interviewEnd = ''
        this.regionProvince = ''
        this.municipality = ''
        this.barangay = ''
      }      
    }else {
      this.intervieweeStatus = ''
      this.date = ''
      this.surveyNumber = ''
      this.validatorName = ''
      this.interviewStart = ''
      this.interviewEnd = ''
      this.regionProvince = ''
      this.municipality = ''
      this.barangay = ''
    }
  },
}
</script>
