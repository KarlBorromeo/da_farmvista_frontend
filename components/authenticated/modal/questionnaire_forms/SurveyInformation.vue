<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-radio-group v-model="interviewer">
      <v-radio
        v-for="item in items"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :rules="[(v) => !!interviewer || 'You must select an inteviewer!']"
      ></v-radio>
      <div v-if="!interviewer" class="red--text caption">
        You must select an option!
      </div>
    </v-radio-group>

    <v-text-field
      v-model="date"
      :rules="dateRule"
      label="Date of Interview"
      required
      type="date"
      class="mb-3"
    ></v-text-field>

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

    <div class="mb-4">
    <v-select
      v-model="municipality"
      :items="municipalities"
      append-icon="mdi-city"
      menu-props="auto"
      hide-details
      label="City/Municipality"
      class="border"
      dense
    ></v-select>
    <p v-if="!municipality" class="red--text caption mt-1">
        You must select Municipality/City! </p>
    </div>

    <v-text-field
      v-model="barangay"
      :rules="barangayRule"
      label="Barangay"
      required
      class="mb-2"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
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
    interviewEnd: null,
    timeEndPicker: false,
    interviewEndRule: [(v) => !!v || 'time end is required'],
    municipality: null,
    municipalities: [
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
      'TUBAY'
    ],
    barangay:null,
    barangayRule:[(v) => !!v || 'Barangay is required']
  }),

  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      if(this.$refs.form.validate() && this.municipality && this.interviewer){
        return true
      }
      return false;
    },
    /* return the data of this form as an object */
    getData(){
      return {
        interviewer:this.interviewer,
        date: this.date,
        time_start: this.interviewStart,
        time_end: this.interviewEnd,
        municipality: this.municipality,
        barangay: this.barangay
      }
    },
    /* validate the form, decide to enable next tab, save the data */
    validation(){
      const isValidated = this.validate();
      this.$store.commit('questionnaire/SurveyInformationValidate',isValidated)
      if(isValidated){
        const data = this.getData();
        this.$store.commit('questionnaire/SurveyInformation',data)
      }
    },
  },
  watch:{
    interviewer(){
      this.validation()
    },
    interviewStart(){
      this.validation()
    },
    interviewEnd(){
      this.validation()
    },
    municipality(){
      this.validation()
    },
    barangay(){
      this.validation()
    }
  }
}
</script>
