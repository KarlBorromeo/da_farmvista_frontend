<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
          <form-radio-container title="Did you use pesticide">
            <v-text-field 
              v-model="didUsePesticide"
              :rules="requiredRule"
              class="requiredFieldHidden"
            />
            <v-radio-group
                v-model="didUsePesticide"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in isAgreeItems"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
                <div
                  v-if="!didUsePesticide"
                  class="red--text caption"
                >
                  You must select an option!
                </div>
              </v-radio-group>
          </form-radio-container>
           
          <form-input-container v-if="didUsePesticide == 'yes'">
            <v-text-field
              v-model="typeOfPesticide"
              :rules="requiredRule"
              label="specify type of pesticide"
              required
            />
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="whomIdeaApplyPesticide"
              :rules="requiredRule"
              label="whom get idea applying pesticides"
              required
            />
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="timesAppliedPesticide"
              :rules="numberRule"
              label="how many times apply pesticides"
              required
            />
          </form-input-container>

          <form-radio-container title="Did you spary pesticided yourself?">
            <v-text-field 
              v-model="didSprayYourself"
              :rules="requiredRule"
              class="requiredFieldHidden"
            />
            <v-radio-group
                v-model="didSprayYourself"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in isAgreeItems"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
                <div
                  v-if="!didSprayYourself"
                  class="red--text caption"
                >
                  You must select an option!
                </div>
              </v-radio-group>
          </form-radio-container>

          <form-input-container v-if="didSprayYourself=='no'">
            <v-text-field
              v-model="payLaborSpraying"
              :rules="numberRule"
              label="how much pay labor of spraying"
              required
            />
          </form-input-container>

          <form-radio-container title="Do you have a sprayer?">
            <v-text-field 
              v-model="haveSprayer"
              :rules="requiredRule"
              class="requiredFieldHidden"
            />
            <v-radio-group
                v-model="haveSprayer"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in isAgreeItems"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
                <div
                  v-if="!haveSprayer"
                  class="red--text caption"
                >
                  You must select an option!
                </div>
              </v-radio-group>
          </form-radio-container>

          <form-checkbox-container v-if="haveSprayer== 'yes'" title="Kind of sprayer do you have">
            <v-text-field 
              v-model="kindSprayerHave"
              :rules="listRule"
              class="requiredFieldHidden"
            />
            <v-checkbox
              v-for="item in kindSprayerHaveItems"
              v-model="kindSprayerHave"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-5"
              style="display: inline-block"
            ></v-checkbox>
            <v-text-field
              v-if="isOtherTicked(kindSprayerHave)"
              v-model="kindSprayerHaveOther"
              :rules="requiredRule"
              label="* please specify"
            ></v-text-field>
            <div v-if="kindSprayerHave.length == 0" class="red--text caption pa-0 ma-0">
              You must select at least one option!
            </div>
        </form-checkbox-container>

        <form-input-container v-else>
            <v-text-field
              v-model="howGetSprayer"
              :rules="requiredRule"
              label="how do you get hold of a sprayer"
              required
            />
        </form-input-container>

        <form-radio-container title="first hear about using pesticide">
            <v-text-field 
              v-model="hearAboutPesticideUsed"
              :rules="requiredRule"
              class="requiredFieldHidden"
            />
            <v-radio-group
                v-model="hearAboutPesticideUsed"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in hearAboutPesticideUsedItems"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
                <v-text-field 
                  v-if="hearAboutPesticideUsed =='group'" 
                  v-model="pesticideUsedGroup"
                  label="Group: please specify"
                  :rules="requiredRule"
                />
                <v-text-field 
                  v-if="hearAboutPesticideUsed =='mass media'" 
                  v-model="pesticideUsedMassMedia"
                  label="Mass Media: please specify"
                  :rules="requiredRule"
                />
                <div
                  v-if="!hearAboutPesticideUsed"
                  class="red--text caption"
                >
                  You must select an option!
                </div>
              </v-radio-group>
          </form-radio-container>

          <form-radio-container title="most important consideration deciding for pesticide to buy">
            <v-text-field 
              v-model="importantConsiderationDecidingPesticide"
              :rules="requiredRule"
              class="requiredFieldHidden"
            />
            <v-radio-group
                v-model="importantConsiderationDecidingPesticide"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in importantConsiderationDecidingPesticideItems"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
                <v-text-field
                  v-if="importantConsiderationDecidingPesticide == 'others'" 
                  v-model="pesticideUsedGroup"
                  label="Other: please specify"
                  :rules="requiredRule"
                />
                <div
                  v-if="!importantConsiderationDecidingPesticide"
                  class="red--text caption"
                >
                  You must select an option!
                </div>
              </v-radio-group>
          </form-radio-container>

          <form-checkbox-container  title="Whom get pest control advice">
            <v-text-field 
              v-model="whomPestControlAdvice"
              :rules="listRule"
              class="requiredFieldHidden"
            />
            <v-checkbox
              v-for="item in whomPestControlAdviceItems"
              v-model="whomPestControlAdvice"
              :key="item"
              :value="item"
              :label="item"
              dense
              class="ma-0 pa-0 ml-5"
              style="display: inline-block"
            ></v-checkbox>         
            <v-text-field
              v-if="isSpecificCheckboxTicked(whomPestControlAdvice,'mass media')"
              v-model="controlAdviceMassMedia"
              :rules="requiredRule"
              label="Mass Media: specify"
              required
            />
            <v-text-field
              v-if="isSpecificCheckboxTicked(whomPestControlAdvice,'others')"
              v-model="controlAdviceOther"
              :rules="requiredRule"
              label="Others: specify"
              required
            />
            <div v-if="whomPestControlAdvice.length == 0" class="red--text caption pa-0 ma-0">
              You must select at least one option!
            </div>
          </form-checkbox-container>
          <form-radio-container v-if="whomPestControlAdvice.length > 1" title="which of these the most credible advice to you?">
            <v-text-field 
              v-model="whichAdviceCredible"
              :rules="requiredRule"
              class="requiredFieldHidden"
            />
            <v-radio-group
                v-model="whichAdviceCredible"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in whomPestControlAdvice"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
                <div
                  v-if="!whichAdviceCredible"
                  class="red--text caption"
                >
                  You must select an option!
                </div>
              </v-radio-group>
          </form-radio-container>

          <form-input-container v-if="whichAdviceCredible">
            <v-text-field
              v-model="why"
              :rules="requiredRule"
              label="why?"
              required
            />
        </form-input-container>

        <form-radio-container title="Have you attended a training on pest management?">
            <v-text-field 
              v-model="attendedTrainingPestManagement"
              :rules="requiredRule"
              class="requiredFieldHidden"
            />
            <v-radio-group
                v-model="attendedTrainingPestManagement"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in isAgreeItems"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
                <div
                  v-if="!attendedTrainingPestManagement"
                  class="red--text caption"
                >
                  You must select an option!
                </div>
              </v-radio-group>
          </form-radio-container>

          <form-input-container v-if="attendedTrainingPestManagement == 'yes'">
            <v-text-field
              v-model="trainingAbout"
              :rules="requiredRule"
              label="what was the training about?"
              required
            />
        </form-input-container>

        <form-input-container v-if="attendedTrainingPestManagement == 'yes'">
            <v-text-field
              v-model="whoOrganizedTraining"
              :rules="requiredRule"
              label="who organized the training?"
              required
            />
        </form-input-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormCheckboxContainer from '../../cards/formCheckboxContainer.vue'
import FormInputContainer from '../../cards/formInputContainer.vue'
import FormRadioContainer from '../../cards/formRadioContainer.vue'
export default {
  components: {
    FormCheckboxContainer,
    FormInputContainer,
    FormRadioContainer,
  },
  data(){
    return {
      valid: false,
      didUsePesticide: '',
        // yes
        typeOfPesticide: '',
      whomIdeaApplyPesticide: '',
      timesAppliedPesticide: '',
      didSprayYourself: '',
        // no
        payLaborSpraying: '',
      haveSprayer: '',
        // yes
        kindSprayerHave: [],
        kindSprayerHaveItems: [],
        kindSprayerHaveOther: '',
        // no
        howGetSprayer: '',
      hearAboutPesticideUsed: '',
      hearAboutPesticideUsedItems: [],
      pesticideUsedMassMedia: '',
      pesticideUsedGroup: '',
      importantConsiderationDecidingPesticide: '',
      importantConsiderationDecidingPesticideItems: [],
      importantConsiderationDecidingPesticideOther: '',
      whomPestControlAdvice: [],
      whomPestControlAdviceItems: [],
      controlAdviceMassMedia: '',
      controlAdviceOther: '',
        // whomePestControlAdvice.length > 1
        whichAdviceCredible: '',
        why: '',
      attendedTrainingPestManagement: '',
        // yes
        trainingAbout: '',
        whoOrganizedTraining: '',

      isAgreeItems: ['yes','no'], // didusePesticie, didsprayYourself, haveSprayer, attendedTrainingPestManagement
      numberRule: [(v) => !!v || 'This field is required', (v) => parseInt(v)>=0 || 'invalid value' ],
      requiredRule: [(v) => !!v || 'This field is required' ],
      listRule: [(v) => v.length>0 || 'this field is required' ]
    }
  },
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      if (valid) {
        const data = this.getData()
        console.log(data)
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
    /* check if specific word checkbox is ticked */
    isSpecificCheckboxTicked(list,word) {
      console.log(list,word)
      for (let i = 0; i < list.length; i++) {
        if (list[i].includes(word)) {
          return true
        }
      }
      return false
    },
    /* concatenate the value of other into the index of list that has 'other' */
    concatOtherValue(list, other) {
      if (!!other) {
        for (let i = 0; i < list.length; i++) {
          if (list[i] == 'others') {
            list[i] += ' ' + other
            break
          }
        }
      }
      return list
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
        didUsePesticide: this.didUsePesticide,
        typeOfPesticide: this.typeOfPesticide,
        whomIdeaApplyPesticide: this.whomIdeaApplyPesticide,
        timesAppliedPesticide: this.timesAppliedPesticide,
        didSprayYourself: this.didSprayYourself,
        payLaborSpraying: this.payLaborSpraying,
        haveSprayer: this.haveSprayer,
        kindSprayerHave: this.concatOtherValue(this.kindSprayerHave,this.kindSprayerHaveOther),
        howGetSprayer: this.howGetSprayer,
        hearAboutPesticideUsed: this.hearAboutPesticideUsed,
        pesticideUsedMassMedia: this.pesticideUsedMassMedia,
        pesticideUsedGroup: this.pesticideUsedGroup,
        importantConsiderationDecidingPesticide: this.concatinateValues(this.importantConsiderationDecidingPesticide,this.importantConsiderationDecidingPesticideOther),
        whomPestControlAdvice: this.whomPestControlAdvice,
        controlAdviceMassMedia: this.controlAdviceMassMedia,
        whichAdviceCredible: this.whichAdviceCredible,
        why: this.why,
        attendedTrainingPestManagement: this.attendedTrainingPestManagement,
        trainingAbout: this.trainingAbout,
        whoOrganizedTraining: this.whoOrganizedTraining,
      }
    },
  },
  watch: {
    controlAdviceMassMedia(value){
      if(!!value){
        for(let i=0; i<this.whomPestControlAdvice.length; i++){
          if(this.whomPestControlAdvice[i].includes('mass media')){
            this.whomPestControlAdvice[i] = 'mass media ' + value;
          }
        }
      }
    },
    controlAdviceOther(value){
      if(!!value){
        for(let i=0; i<this.whomPestControlAdvice.length; i++){
          if(this.whomPestControlAdvice[i].includes('others')){
            this.whomPestControlAdvice[i] = 'others ' + value;
          }
        }
      }
    }
  },
  beforeMount() {
    this.kindSprayerHaveItems = this.$store.getters['questionnaireCode/SprayingEquipment'];
    this.hearAboutPesticideUsedItems =this.$store.getters['questionnaireCode/PesticideInformationSource'];
    this.importantConsiderationDecidingPesticideItems = this.$store.getters['questionnaireCode/PesticideConsideration'];
    this.whomPestControlAdviceItems = this.$store.getters['questionnaireCode/PestControlAdvice'];
  },
}
</script>

<style scoped>
.requiredFieldHidden {
  display: none !important;
}
</style>
