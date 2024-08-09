<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-row>
            <form-radio-container title="Classification" :required="true">
              <v-radio-group
                :rules="requiredRule"
                v-model="classification"
                class="pa-0 ma-0"
                row
              >
                <v-radio
                  v-for="item in classificationItems"
                  :key="item"
                  :label="item"
                  :value="item"
                  class="text-capitalize"
                ></v-radio>
              </v-radio-group>
            </form-radio-container>
          </v-row>
        </v-col>

        <v-col cols="12" sm="6">
          <v-row>
            <form-radio-container title="Status" :required="true">
              <v-radio-group
                :rules="requiredRule"
                v-model="status"
                class="pa-0 ma-0"
                row
              >
                <v-radio
                  v-for="item in statusItems"
                  :key="item"
                  :label="item"
                  :value="item"
                  class="text-capitalize"
                ></v-radio>
              </v-radio-group>
            </form-radio-container>
          </v-row>
        </v-col>

				<form-input-container v-if="status == 'inactive'">
					<v-textarea
						v-model="reasonForStopCoffeeFarm"
						:rules="requiredRule"
						label="* Reason for Stopping Farming"
						required
						rows="2"
					/>
				</form-input-container>
				
				<v-col cols="12" sm="6">
					<v-text-field
						v-model="confirmedBy"
						:rules="requiredRule"
						label="* Confirmed by (Name):"
						required
					></v-text-field>
				</v-col>

				<v-col cols="12" sm="6">
					<v-text-field
						v-model="position"
						:rules="requiredRule"
						label="* Confirmed by (Position):"
						required
					></v-text-field>
				</v-col>

        <!-- TODO: -->
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="surveyNumber"
            :rules="surveyNumberRule"
            label="* Survey Number"
            required
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="validatorName"
            :rules="requiredRule"
            label="* Name of Interviewer Validator"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="date"
            :rules="dateRule"
            label="* Date of Validation"
            required
            type="date"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
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
        </v-col>

        <v-col cols="12" sm="6">
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
        </v-col>
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
      classification: '',
      classificationItems: [],
      status: '',
      statusItems: [],
      reasonForStopCoffeeFarm: '',
      confirmedBy: '',
      position: '',
    }
  },

  methods: {
    /* call the this.validate if the dom was done rendering the form  */
		validteAfterVueTick(){
			this.$nextTick(async () => {
						await this.validate();
			});
		},
    /* test if the form is valid, return boolean */
    async validate() {
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
      const form = this.$store.getters['questionnaire/form']
      const demographic = form.interview
      return {
        ...demographic,
        dateOfInterview: this.date,
        surveyNo: this.surveyNumber ? parseInt(this.surveyNumber) : '',
        validatorName: this.validatorName,
        interviewStart: this.convertTimeToHHMM(this.interviewStart),
        interviewEnd: this.convertTimeToHHMM(this.interviewEnd),
        classification : this.classification,
				status : this.status,
				reasonForStopCoffeeFarm: this.reasonForStopCoffeeFarm,
        confirmedByName : this.confirmedBy,
				confirmedByPosition : this.position,
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
      this.validteAfterVueTick()
    },
    surveyNumber() {
      this.validteAfterVueTick()
    },
    validatorName() {
      this.validteAfterVueTick()
    },
    interviewStart() {
      this.validteAfterVueTick()
    },
    interviewEnd() {
      this.validteAfterVueTick()
    },
    regionProvince(){
      this.validteAfterVueTick()
    },
    municipality(){
      this.validteAfterVueTick()
    },
    barangay(){
      this.validteAfterVueTick()
    },
    confirmedBy(){
      this.validteAfterVueTick()
    },
    position(){
      this.validteAfterVueTick()
    },
    classification(){
      this.validteAfterVueTick()
    },
    status(val){
			if(val !== 'active'){
				this.$store.commit('questionnaire/toggleIsSelfFarmerActive',false)
			}else{
				this.$store.commit('questionnaire/toggleIsSelfFarmerActive',true)
			}
			this.$store.commit('questionnaire/resetTabsValidity')
			this.validteAfterVueTick()
		},
    reasonForStopCoffeeFarm(){
      this.validteAfterVueTick()
    },
  },
  beforeMount() {
    this.statusItems =
			this.$store.getters['questionnaireCode/ProfileStatus']
		this.classificationItems =
			this.$store.getters['questionnaireCode/ProfileClassification']
    const isEditing = this.$store.getters['profiling/isEditingMode']
    if (isEditing) {
      const data = this.$store.getters['profiling/selectedRecord']
      if(data.interview){
        this.date = data.interview.dateOfInterview
        this.surveyNumber = data.interview.surveyNo
        this.validatorName = data.interview.validatorName
        this.interviewStart = data.interview.interviewStart
        this.interviewEnd = data.interview.interviewEnd
        this.regionProvince = data.interview.regionProvince
        this.municipality = data.interview.cityMunicipality
        this.barangay = data.interview.barangay
        this.confirmedBy = data.interview.confirmedByName
        this.position = data.interview.confirmedByPosition
        this.classification = data.interview.classification
        this.status = data.interview.status
        this.reasonForStopCoffeeFarm = "sample raason for stopping"        
      }
    }else {
      this.date = ''
      this.surveyNumber = '1234'
      this.validatorName = ''
      this.interviewStart = ''
      this.interviewEnd = ''
      this.regionProvince = ''
      this.municipality = ''
      this.barangay = ''
      this.confirmedBy = ''
      this.position = ''
      this.classification = ''
      this.status = ''
      this.reasonForStopCoffeeFarm = "sample raason for stopping"
    }
  },
}
</script>
