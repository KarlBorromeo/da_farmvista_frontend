<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-radio-container title="Interviewee Status" class="mt-2">
          <v-radio-group
            :rules="requiredRule"
            v-model="intervieweeStatus"
            class="pa-0 ma-0"
          >
            <v-radio
              v-for="item in intervieweeStatusItems"
              :key="item"
              :label="item"
              :value="item"
              class="text-capitalize"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>
        <form-input-container v-if="intervieweeStatus === 'validated'">
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
            v-model="interviewer"
            :rules="requiredRule"
            label="* Name of Interviewer"
            required
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="date"
            :rules="dateRule"
            label="Date of Validation"
            required
            type="date"
          ></v-text-field>
        </form-input-container>

        <form-menu-container v-if="intervieweeStatus === 'validated'">
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
                label="Interview Start (24 hrs format)"
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
              <v-btn
                text
                color="primary"
                @click="saveTimeStart"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </form-menu-container>

        <form-menu-container v-if="intervieweeStatus === 'validated'">
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
                label="Interview Start (24 hrs format)"
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
              <v-btn
                text
                color="primary"
                @click="saveTimeEnd"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </form-menu-container>
        
        <form-select-container>
          <v-select
            v-model="regionProvince"
            :items="regionProvinceItems"
            label="Region/Pronvince"
            dense
            class="text-capitalize"
            :rules="requiredRule"
            required
          ></v-select>
        </form-select-container>

        <form-select-container>
          <v-select
            :items="municipalityItems"
            v-model="municipality"
            :rules="requiredRule"
            label="City/Municipality"
            required
            class="text-capitalize"
          ></v-select>
        </form-select-container>

        <form-input-container>
          <v-text-field
            v-model="barangay"
            :rules="barangayRule"
            label="Barangay"
            required
            class="mb-2"
          ></v-text-field>
        </form-input-container>
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
  components: {
    formInputContainer,
    FormRadioContainer,
    FormMenuContainer,
    FormSelectContainer,
  },
  data() {
    return {
      valid: false,
      intervieweeStatus: '',
      intervieweeStatusItems: [],
      surveyNumber: '',
      surveyNumberRule: [(v) => !!v || 'survey number is required'],
      interviewer: '',
      date: '',
      dateRule: [(v) => !!v || 'date is required'],
      interviewStart: '',
      timeStartPicker: false,
      interviewStartRule: [(v) => !!v || 'time start is required'],
      interviewEnd: '',
      timeEndPicker: false,
      interviewEndRule: [(v) => !!v || 'time end is required'],
      regionProvince: '',
      regionProvinceItems: [],
      municipality: '',
      municipalityItems: [],
      barangay: '',
      barangayRule: [(v) => !!v || 'Barangay is required'],
      requiredRule: [(v) => !!v || 'This field is required'],
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
      if(this.intervieweeStatus !== 'validated'){
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'OpenEndedQuestionRatingValidated',   
          valid,
        })      
      }
    },
    /* converts into hh:mm format*/
    convertTimeToHHMM(timeStr) {
      if(!timeStr){
        return ''
      }
      // Split the time string by colon
      let timeParts = timeStr.split(':');
      // Extract hours and minutes
      let hours = timeParts[0];
      let minutes = timeParts[1];
      // Format the result as hh:mm
      return `${hours}:${minutes}`;
    },
    /* return the data of this form as an object */
    getData() {
      return {
        intervieweeStatus: this.intervieweeStatus,
        dateOfInterview: this.date,
        surveyNo: this.surveyNumber?parseInt(this.surveyNumber):'',
        validatorName: this.interviewer,
        interviewStart: this.convertTimeToHHMM(this.interviewStart),
        interviewEnd: this.convertTimeToHHMM(this.interviewEnd),
        regionProvince: this.regionProvince,
        cityMunicipality: this.municipality,
        barangay: this.barangay,
      }
    },
    /* ensure to execute the method validate() if saving time, sometimes the watch is not working well on this part*/
    saveTimeStart(){
      this.$refs.timeStartPicker.save(this.interviewStart)
      this.validate()
    },
    /* ensure to execute the method validate() if saving time, sometimes the watch is not working well on this part*/
    saveTimeEnd(){
      this.$refs.timeEndPicker.save(this.interviewEnd)
      this.validate()
    }
  },
  watch: {
    intervieweeStatus(val){
      if(val !== 'validated'){
        this.surveyNumber = ''
        this.interviewStart = ''
        this.interviewEnd = ''
        this.validate()
        this.$store.commit('questionnaire/toggleIsIntervieweeValidated',false)
      }else{
        this.$store.commit('questionnaire/toggleIsIntervieweeValidated',true)
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'SurveyInformationValidated',
          valid: false,
        })
        
      }
    },
    date() {
      this.validate()
    },
    surveyNumber() {
      this.validate()
    },
    interviewer() {
      this.validate()
    },
    interviewStart() {
      this.validate()
    },
    interviewEnd() {
      this.validate()
    },
    regionProvince() {
      this.validate()
    },
    municipality() {
      this.validate()
    },
    barangay() {
      this.validate()
    },
  },
  beforeMount() {
    this.intervieweeStatusItems = this.$store.getters['questionnaireCode/IntervieweeStatus']
    this.regionProvinceItems = this.$store.getters['questionnaireCode/RegionProvince']
    this.municipalityItems = this.$store.getters['questionnaireCode/CityMunicipality']
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.intervieweeStatus = data.interview.intervieweeStatus
      this.date = data.interview.dateOfInterview
      this.surveyNumber = data.interview.surveyNo
      this.interviewer = data.interview.validatorName
      this.interviewStart = data.interview.interviewStart
      this.interviewEnd = data.interview.interviewEnd
      this.regionProvince = data.interview.regionProvince
      this.municipality = data.interview.cityMunicipality
      this.barangay = data.interview.barangay
    } else {
      this.intervieweeStatus = ''
      this.date = ''
      this.surveyNumber = ''
      this.interviewer = ''
      this.interviewStart = ''
      this.interviewEnd = ''
      this.regionProvince = ''
      this.municipality = ''
      this.barangay = ''
    }
  },
}
</script>
