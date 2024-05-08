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

        <form-radio-container title="Name of Interviewer">
          <v-radio-group v-model="interviewer" class="ma-0">
            <v-radio
              v-for="item in items"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!interviewer" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </form-radio-container>

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
            :nudge-right="40"
            :return-value.sync="interviewEnd"
            transition="scale-transition"
            offset-y
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

        <form-select-container>
          <div class="" style="margin-top: 2rem !important">
            <v-select
              v-model="regionProvince"
              :items="regionProvinceItems"
              append-icon="mdi-city"
              menu-props="auto"
              hide-details
              label="Region/Pronvince"
              dense
            ></v-select>
            <p v-if="!municipality" class="red--text caption mt-1">
              You must select Region/Province!
            </p>
          </div>
        </form-select-container>

        <form-select-container>
          <div style="margin-top: 2rem !important">
            <v-select
              v-model="municipality"
              :items="municipalityItems"
              append-icon="mdi-city"
              label="City/Municipality"
              dense
            ></v-select>
            <p v-if="!municipality" class="red--text caption mt-1">
              You must select Municipality/City!
            </p>
          </div>
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
  </v-form>
</template>

<script>
import formInputContainer from '../../cards/formInputContainer.vue'
import FormMenuContainer from '../../cards/formMenuContainer.vue'
import FormRadioContainer from '../../cards/formRadioContainer.vue'
import FormSelectContainer from '../../cards/formSelectContainer.vue'
export default {
  components: {
    formInputContainer,
    FormRadioContainer,
    FormMenuContainer,
    FormSelectContainer,
  },
  data: () => ({
    valid: false,
    surveyNumber: '',
    surveyNumberRule: [(v) => !!v || 'survey number is required'],
    interviewer: null,
    items: [
      { label: 'Jhon Warren S. Batondo', value: 'Jhon Warren S. Batondo' },
      { label: 'Paul JOnes A. Ga-as', value: 'Paul JOnes A. Ga-as' },
      { label: 'Donabel F. Gumata', value: 'Donabel F. Gumata' },
      { label: 'Paul Christian A. Alason', value: 'Paul Christian A. Alason' },
    ],
    date: null,
    dateRule: [(v) => !!v || 'date is required'],
    interviewStart: '',
    timeStartPicker: false,
    interviewStartRule: [(v) => !!v || 'time start is required'],
    interviewEnd: '',
    timeEndPicker: false,
    interviewEndRule: [(v) => !!v || 'time end is required'],
    regionProvince: '',
    regionProvinceItems: [
      'AGUSAN DEL NORTE',
      'AGUSAN DEL SUR',
      'DINAGAT ISLAND',
      'SURIGAO DEL NORTE',
      'SURIGAO DEL SUR',
    ],
    municipality: null,
    municipalityItems: [
      'ALEGRIA',
      'BACUAG',
      'BAROBO',
      'BASILISA',
      'BISLIG',
      'BUENAVISTA',
      'BUNAWAN',
      'BUTUAN CITY',
      'CABADBARAN CITY',
      'CANTILAN',
      'CARRASCAL',
      'EZPERANZA',
      'HINATUAN',
      'JABONGA',
      'KITCHARAO',
      'LAS NIEVES',
      'LIANGA',
      'LINGIG',
      'LORETO',
      'NASIPIT',
      'PROSPERIDAD',
      'ROSARIO',
      'SAN AGUSTIN',
      'SAN FRANCISCO',
      'SAN JOSE',
      'SANTIAGO',
      'SIBAGAT',
      'STA. JOSEFA',
      'SURIGAO CITY',
      'TAGANAAN',
      'TAGBINA',
      'TAGO',
      'TALACOGON',
      'TANDAG',
      'TRENTO',
      'TUBAJON',
      'TUBAY',
    ],
    barangay: null,
    barangayRule: [(v) => !!v || 'Barangay is required'],
  }),

  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      if (
        this.$refs.form.validate() &&
        this.municipality &&
        this.regionProvince &&
        this.interviewer
      ) {
        return true
      }
      return false
    },
    /* return the data of this form as an object */
    getData() {
      return {
        survey_no: this.suveryNumber,
        validator_name: this.interviewer,
        date_of_interview: this.date,
        interview_start: this.interviewStart,
        interview_end: this.interviewEnd,
        region_province: this.regionProvince,
        city_municipality: this.municipality,
        barangay: this.barangay,
      }
    },
    /* validate the form, decide to enable next tab, save the data */
    validation() {
      const isValidated = this.validate()
      console.log('validated: ', isValidated)
      this.$store.commit('questionnaire/SurveyInformationValidate', isValidated)
      if (isValidated) {
        const data = this.getData()
        this.$store.commit('questionnaire/SurveyInformation', data)
      }
    },
  },
  watch: {
    surveyNumber() {
      this.validation()
    },
    interviewer() {
      this.validation()
    },
    interviewStart() {
      this.validation()
    },
    interviewEnd() {
      this.validation()
    },
    municipality() {
      this.validation()
    },
    barangay() {
      this.validation()
    },
  },
}
</script>
