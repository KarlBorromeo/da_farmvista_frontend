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
            label="Date of Interview"
            required
            type="date"
          ></v-text-field>
        </form-input-container>

        <form-menu-container>
          <v-menu
            ref="timeStartPicker"
            v-model="timeStartPicker"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="interviewStart"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
            class="my-0 py-0"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="interviewStart"
                label="Interview Start (24 hrs format)"
                :rules="interviewStartRule"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                class="mb-3"
              >
              </v-text-field>
            </template>
            <v-time-picker
              v-if="timeStartPicker"
              v-model="interviewStart"
              full-width
              @click:minute="$refs.timeStartPicker.save(interviewStart)"
            ></v-time-picker>
          </v-menu>
        </form-menu-container>

        <form-menu-container>
          <v-menu
            ref="timeEndPicker"
            v-model="timeEndPicker"
            :close-on-content-click="false"
            :nudge-right="0"
            :return-value.sync="interviewEnd"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
            class="my-0 py-0"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="interviewEnd"
                label="Interview Start (24 hrs format)"
                :rules="interviewEndRule"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                class="mb-5"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeEndPicker"
              v-model="interviewEnd"
              full-width
              @click:minute="$refs.timeEndPicker.save(interviewEnd)"
            ></v-time-picker>
          </v-menu>
        </form-menu-container>

        <form-input-container>
          <v-text-field
            v-model="regionProvince"
            :rules="requiredRule"
            label="Region/Pronvince"
            required
            class="mb-2"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="municipality"
            :rules="requiredRule"
            label="City/Municipality"
            required
            class="mb-2"
          ></v-text-field>
        </form-input-container>

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
      <!-- <p class="hiddenRequiredField">{{ initializedData }}</p> -->
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formInputContainer from '../../form/formInputContainer.vue'
import FormMenuContainer from '../../form/formMenuContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
import FormSelectContainer from '../../form/formSelectContainer.vue'
export default {
  components: {
    formInputContainer,
    FormRadioContainer,
    FormMenuContainer,
    FormSelectContainer,
  },
  data: () => ({
    valid: false,
    surveyNumber: '555',
    surveyNumberRule: [(v) => !!v || 'survey number is required'],
    interviewer: 'Karl Borromeo',
    date: '2024-05-17',
    dateRule: [(v) => !!v || 'date is required'],
    interviewStart: '08:00',
    timeStartPicker: false,
    interviewStartRule: [(v) => !!v || 'time start is required'],
    interviewEnd: '12:00',
    timeEndPicker: false,
    interviewEndRule: [(v) => !!v || 'time end is required'],
    regionProvince: 'AGUSAN DEL NORTE',
    regionProvinceItems: [
      'agusan del norte',
      'agusan del sur',
      'dinagat island',
      'surigao del norte',
      'surigao del sur',
    ],
    municipality: 'ALEGRIA',
    municipalityItems: [
      'alegria',
      'bacuag',
      'barobo',
      'basilisa',
      'bislig',
      'buenavista',
      'bunawan',
      'butuan city',
      'cabadbaran city',
      'cantilan',
      'carascal',
      'ezperanza',
      'hinatuan',
      'jabonga',
      'kitcharao',
      'las nieves',
      'lianga',
      'lingig',
      'loreto',
      'nasipit',
      'prosperidad',
      'rosario',
      'san agustin',
      'san francisco',
      'san jose',
      'santiago',
      'sibagat',
      'sta. josefa',
      'surigao city',
      'taganaan',
      'tagbina',
      'tago',
      'talacogon',
      'tandag',
      'trento',
      'tubajon',
      'tubay',
    ],
    barangay: 'Brgy. Binutbut',
    barangayRule: [(v) => !!v || 'Barangay is required'],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),

  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      // console.log('validated',valid)
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
    },
    /* return the data of this form as an object */
    getData() {
      return {
        dateOfInterview: this.date,
        surveyNo: parseInt(this.surveyNumber),
        validatorName: this.interviewer,
        interviewStart: this.interviewStart,
        interviewEnd: this.interviewEnd,
        regionProvince: this.regionProvince,
        cityMunicipality: this.municipality,
        barangay: this.barangay,
      }
    },
  },
  watch: {
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
    // selectedRecord: {
    //   handler: function(newVal){
    //     const data =  newVal
    //     if(Object.keys(data).length > 0){
    //       console.log(data.interview)
    //         this.date = data.interview.dateOfInterview
    //         this.surveyNumber = data.interview.surveyNo
    //         this.interviewer = data.interview.validatorName
    //         this.interviewStart = data.interview.interviewStart
    //         this.interviewEnd = data.interview.interviewEnd
    //         this.regionProvince = data.interview.regionProvince
    //         this.municipality = data.interview.cityMunicipality
    //         this.barangay = data.interview.barangay
    //     }else{
    //         this.date = ''
    //         this.surveyNumber = ''
    //         this.interviewer = ''
    //         this.interviewStart = ''
    //         this.interviewEnd = ''
    //         this.regionProvince = ''
    //         this.municipality = ''
    //         this.barangay = ''
    //     }
    //   },
    //   immediate: true // Trigger the handler immediately with the current value
    // }
  },
  computed: {
    selectedRecord() {
      return this.$store.getters['profiling/selectedRecord'];
    }
    // initializedData(){
    //   const data =  this.$store.getters['profiling/selectedRecord']
    //   if(Object.keys(data).length > 0){
    //     this.date = data.interview.dateOfInterview
    //     this.surveyNumber = data.interview.surveyNo
    //     this.interviewer = data.interview.validatorName
    //     this.interviewStart = data.interview.interviewStart
    //     this.interviewEnd = data.interview.interviewEnd
    //     this.regionProvince = data.interview.regionProvince
    //     this.municipality = data.interview.cityMunicipality
    //     this.barangay = data.interview.barangay
    //   }else{
    //     this.date = ''
    //     this.surveyNumber = ''
    //     this.interviewer = ''
    //     this.interviewStart = ''
    //     this.interviewEnd = ''
    //     this.regionProvince = ''
    //     this.municipality = ''
    //     this.barangay = ''
    //   }
    //   return data.interview
    // }
  }
}
</script>
