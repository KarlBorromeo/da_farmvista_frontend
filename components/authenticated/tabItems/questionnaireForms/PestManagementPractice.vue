<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-radio-container title="Did you use pesticide">
          <v-radio-group
            :rules="requiredRule"
            v-model="didUsePesticide"
            class="pa-0 ma-0"
          >
            <v-radio
              v-for="item in isAgreeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
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

        <form-input-container v-if="didUsePesticide == 'yes'">
          <v-text-field
            v-model="whomIdeaApplyPesticide"
            :rules="requiredRule"
            label="whom get idea applying pesticides"
            required
          />
        </form-input-container>

        <form-input-container v-if="didUsePesticide == 'yes'">
          <v-text-field
            v-model="timesAppliedPesticide"
            :rules="numberRule"
            type="number"
            label="how many times apply pesticides"
            required
          />
        </form-input-container>

        <form-radio-container
          title="Did you spary pesticided yourself?"
          v-if="didUsePesticide == 'yes'"
        >
          <v-radio-group
            :rules="requiredRule"
            v-model="didSprayYourself"
            class="pa-0 ma-0"
          >
            <v-radio
              v-for="item in isAgreeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-input-container
          v-if="didSprayYourself == 'no' && didUsePesticide == 'yes'"
        >
          <v-text-field
            v-model="payLaborSpraying"
            :rules="numberRule"
            type="number"
            label="how much pay labor of spraying"
            required
          />
        </form-input-container>

        <form-radio-container title="Do you have a sprayer?">
          <v-radio-group
            :rules="requiredRule"
            v-model="haveSprayer"
            class="pa-0 ma-0"
          >
            <v-radio
              v-for="item in isAgreeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-checkbox-container
          v-if="haveSprayer == 'yes'"
          title="Kind of sprayer do you have"
        >
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
        </form-checkbox-container>

        <form-input-container v-else>
          <v-text-field
            v-model="howGetSprayer"
            :rules="requiredRule"
            label="how do you get hold of a sprayer"
            required
          />
        </form-input-container>

        <form-radio-container
          title="first hear about using pesticide"
          v-if="didUsePesticide == 'yes'"
        >
          <v-radio-group
            :rules="requiredRule"
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
              v-if="hearAboutPesticideUsed == 'group'"
              v-model="pesticideUsedGroup"
              label="Group: please specify"
              :rules="requiredRule"
            />
            <v-text-field
              v-if="hearAboutPesticideUsed == 'mass media'"
              v-model="pesticideUsedMassMedia"
              label="Mass Media: please specify"
              :rules="requiredRule"
            />
          </v-radio-group>
        </form-radio-container>

        <form-radio-container
          title="most important consideration deciding for pesticide to buy"
        >
          <v-radio-group
            :rules="requiredRule"
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
              v-model="importantConsiderationDecidingPesticideOther"
              label="Other: please specify"
              :rules="requiredRule"
            />
          </v-radio-group>
        </form-radio-container>

        <form-checkbox-container
          title="Whom get pest control advice"
          v-if="didUsePesticide == 'yes'"
        >
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
            v-if="isSpecificCheckboxTicked(whomPestControlAdvice, 'mass media')"
            v-model="controlAdviceMassMedia"
            :rules="requiredRule"
            label="Mass Media: specify"
            required
          />
          <v-text-field
            v-if="isSpecificCheckboxTicked(whomPestControlAdvice, 'others')"
            v-model="controlAdviceOther"
            :rules="requiredRule"
            label="Others: specify"
            required
          />
        </form-checkbox-container>

        <form-radio-container
          v-if="whomPestControlAdvice.length > 1 && didUsePesticide == 'yes'"
          title="which of these the most credible advice to you?"
        >
          <v-radio-group
            :rules="requiredRule"
            v-model="whichAdviceCredible"
            class="pa-0 ma-0"
          >
            <v-radio
              v-for="item in whomPestControlAdvice"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-input-container
          v-if="whichAdviceCredible && didUsePesticide == 'yes'"
        >
          <v-text-field
            v-model="why"
            :rules="requiredRule"
            label="why?"
            required
          />
        </form-input-container>

        <form-radio-container
          title="Have you attended a training on pest management?"
        >
          <v-radio-group
            :rules="requiredRule"
            v-model="attendedTrainingPestManagement"
            class="pa-0 ma-0"
          >
            <v-radio
              v-for="item in isAgreeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
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
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import {
  concatOtherValueToList,
  concatinateOtherValueToString,
  extractUnmatchedValueCheck,
  isOtherValueTickedCheckbox,
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
} from '~/reusableFunctions/questionnaireValidation'
import FormCheckboxContainer from '~/components/authenticated/form/formCheckboxContainer.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
export default {
  components: {
    FormCheckboxContainer,
    FormInputContainer,
    FormRadioContainer,
  },
  data() {
    return {
      valid: false,
      didUsePesticide: 'no',
      // yes
      typeOfPesticide: '',
      whomIdeaApplyPesticide: 'secret daw',
      timesAppliedPesticide: '2',
      didSprayYourself: 'no',
      // no
      payLaborSpraying: '100',
      haveSprayer: 'yes',
      // yes
      kindSprayerHave: ['hand sprayer', 'others'],
      kindSprayerHaveItems: [],
      kindSprayerHaveOther: 'bumba',
      // no
      howGetSprayer: '',
      hearAboutPesticideUsed: 'group',
      hearAboutPesticideUsedItems: [],
      pesticideUsedMassMedia: '',
      pesticideUsedGroup: 'group sample',
      importantConsiderationDecidingPesticide: 'price',
      importantConsiderationDecidingPesticideItems: [],
      importantConsiderationDecidingPesticideOther: '',
      whomPestControlAdvice: ['neighbor', 'relatives', 'others'],
      whomPestControlAdviceItems: [],
      controlAdviceMassMedia: '',
      controlAdviceOther: 'advice other sample',
      // whomePestControlAdvice.length > 1
      whichAdviceCredible: 'relatives',
      why: 'for da char',
      attendedTrainingPestManagement: 'no',
      // yes
      trainingAbout: '',
      whoOrganizedTraining: '',

      isAgreeItems: ['yes', 'no'], // didusePesticie, didsprayYourself, haveSprayer, attendedTrainingPestManagement
      numberRule: [(v) => parseInt(v) >= 0 || 'invalid value'],
      requiredRule: [(v) => !!v || 'This field is required'],
      listRule: [(v) => v.length > 0 || 'this field is required'],
    }
  },
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const textRadioValid = this.$refs.form.validate()
      const validCheckbox = this.validateCheckbox()
      let valid = false
      if (textRadioValid && validCheckbox) {
        valid = true
      }
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'PestManagementPracticeValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'pestManagementPractice',
          data: this.getData(),
        })
      }
    },
    /* validate checkbox if empty or not */
    validateCheckbox() {
      if (
        (this.kindSprayerHave.length == 0 && this.haveSprayer == 'yes') ||
        (this.whomPestControlAdvice.length == 0 &&
          this.didUsePesticide == 'yes')
      ) {
        return false
      } else {
        return true
      }
    },
    /* check if 'other' checkbox is ticked */
    isOtherTicked(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] == 'others' || list[i] == 'other') {
          return true
        }
      }
      return false
    },
    /* check if specific word checkbox is ticked */
    isSpecificCheckboxTicked(list, word) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].includes(word)) {
          return true
        }
      }
      return false
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        didUsePesticide: this.didUsePesticide,
        typeOfPesticide: this.typeOfPesticide,
        whomIdeaApplyPesticide: this.whomIdeaApplyPesticide,
        timesAppliedPesticide: parseInt(this.timesAppliedPesticide),
        didSprayYourself: this.didSprayYourself,
        payLaborSpraying: parseFloat(this.payLaborSpraying),
        haveSprayer: this.haveSprayer,
        kindSprayerHave: concatOtherValueToList(
          this.kindSprayerHave,
          this.kindSprayerHaveOther
        ),
        howGetSprayer: this.howGetSprayer,
        hearAboutPesticideUsed: this.hearAboutPesticideUsed,
        pesticideUsedMassMedia: this.pesticideUsedMassMedia,
        pesticideUsedGroup: this.pesticideUsedGroup,
        importantConsiderationDecidingPesticide: concatinateOtherValueToString(
          this.importantConsiderationDecidingPesticide,
          this.importantConsiderationDecidingPesticideOther
        ),
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
    controlAdviceMassMedia(value) {
      this.validate()
      if (!!value) {
        for (let i = 0; i < this.whomPestControlAdvice.length; i++) {
          if (this.whomPestControlAdvice[i].includes('mass media')) {
            this.whomPestControlAdvice[i] = 'mass media ' + value
          }
        }
      }
    },
    controlAdviceOther(value) {
      this.validate()
      if (!!value) {
        for (let i = 0; i < this.whomPestControlAdvice.length; i++) {
          if (this.whomPestControlAdvice[i].includes('others')) {
            this.whomPestControlAdvice[i] = 'others ' + value
          }
        }
      }
    },
    didUsePesticide(value) {
      this.validate()
      if (value !== 'yes') {
        this.typeOfPesticide = ''
        this.whomIdeaApplyPesticide = ''
        this.timesAppliedPesticide = ''
        this.didSprayYourself = ''
        this.payLaborSpraying = ''
        this.hearAboutPesticideUsed = ''
        this.pesticideUsedGroup = ''
        this.pesticideUsedMassMedia = ''
        this.whomPestControlAdvice = []
        this.controlAdviceMassMedia = ''
        this.controlAdviceOther = ''
        this.whichAdviceCredible = ''
        this.why = ''
      }
    },
    didSprayYourself(value) {
      this.validate()
      if (value !== 'no') {
        this.payLaborSpraying = ''
      }
    },
    haveSprayer(value) {
      this.validate()
      if (value == 'no') {
        this.kindSprayerHave = []
        this.kindSprayerHaveOther = ''
      } else {
        this.howGetSprayer = ''
      }
    },
    attendedTrainingPestManagement(value) {
      this.validate()
      if (value !== 'yes') {
        this.trainingAbout = ''
        this.whoOrganizedTraining = ''
      }
    },
    typeOfPesticide() {
      this.validate()
    },
    whomIdeaApplyPesticide() {
      this.validate()
    },
    timesAppliedPesticide() {
      this.validate()
    },
    payLaborSpraying() {
      this.validate()
    },
    kindSprayerHave() {
      this.validate()
    },
    kindSprayerHaveOther() {
      this.validate()
    },
    howGetSprayer() {
      this.validate()
    },
    hearAboutPesticideUsed() {
      this.validate()
    },
    pesticideUsedMassMedia() {
      this.validate()
    },
    pesticideUsedGroup() {
      this.validate()
    },
    importantConsiderationDecidingPesticide() {
      this.validate()
    },
    importantConsiderationDecidingPesticideOther() {
      this.validate()
    },
    whomPestControlAdvice() {
      this.validate()
    },
    whichAdviceCredible() {
      this.validate()
    },
    why() {
      this.validate()
    },
    trainingAbout() {
      this.validate()
    },
    whoOrganizedTraining() {
      this.validate()
    },
  },
  beforeMount() {
    this.kindSprayerHaveItems =
      this.$store.getters['questionnaireCode/SprayingEquipment']
    this.hearAboutPesticideUsedItems =
      this.$store.getters['questionnaireCode/PesticideInformationSource']
    this.importantConsiderationDecidingPesticideItems =
      this.$store.getters['questionnaireCode/PesticideConsideration']
    this.whomPestControlAdviceItems =
      this.$store.getters['questionnaireCode/PestControlAdvice']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.didUsePesticide = data.pestManagementPractice.didUsePesticide
      this.typeOfPesticide = data.pestManagementPractice.typeOfPesticide
      this.whomIdeaApplyPesticide =
        data.pestManagementPractice.whomIdeaApplyPesticide
      this.timesAppliedPesticide =
        data.pestManagementPractice.timesAppliedPesticide
      this.didSprayYourself = data.pestManagementPractice.didSprayYourself
      this.payLaborSpraying = data.pestManagementPractice.payLaborSpraying
      this.haveSprayer = data.pestManagementPractice.haveSprayer
      this.kindSprayerHave = isOtherValueTickedCheckbox(
        data.pestManagementPractice.kindSprayerHave,
        this.kindSprayerHaveItems
      )
      this.kindSprayerHaveOther = extractUnmatchedValueCheck(
        data.pestManagementPractice.kindSprayerHave,
        this.kindSprayerHaveItems
      )
      this.howGetSprayer = data.pestManagementPractice.howGetSprayer
      this.hearAboutPesticideUsed =
        data.pestManagementPractice.hearAboutPesticideUsed
      this.pesticideUsedMassMedia =
        data.pestManagementPractice.pesticideUsedMassMedia
      this.pesticideUsedGroup = data.pestManagementPractice.pesticideUsedGroup
      this.importantConsiderationDecidingPesticide = isOtherValueDefinedRadio(
        data.pestManagementPractice.importantConsiderationDecidingPesticide,
        this.importantConsiderationDecidingPesticideItems
      )
      console.log(
        'pesticie other: ',
        extractUnmatchedValueRadio(
          data.pestManagementPractice.importantConsiderationDecidingPesticide,
          this.importantConsiderationDecidingPesticideItems
        )
      )
      this.importantConsiderationDecidingPesticideOther =
        extractUnmatchedValueRadio(
          data.pestManagementPractice.importantConsiderationDecidingPesticide,
          this.importantConsiderationDecidingPesticideItems
        )
      this.whomPestControlAdvice = isOtherValueTickedCheckbox(
        data.pestManagementPractice.whomPestControlAdvice,
        this.whomPestControlAdviceItems
      )
      this.controlAdviceMassMedia = extractUnmatchedValueCheck(
        data.pestManagementPractice.controlAdviceMassMedia,
        this.whomPestControlAdviceItems
      )
      this.controlAdviceOther = extractUnmatchedValueCheck(
        data.pestManagementPractice.whomPestControlAdvice,
        this.whomPestControlAdviceItems
      )
      this.whichAdviceCredible = data.pestManagementPractice.whichAdviceCredible
      this.why = data.pestManagementPractice.why
      this.attendedTrainingPestManagement =
        data.pestManagementPractice.attendedTrainingPestManagement
      this.trainingAbout = data.pestManagementPractice.trainingAbout
      this.whoOrganizedTraining =
        data.pestManagementPractice.whoOrganizedTraining
    } else {
      this.didUsePesticide = ''
      this.typeOfPesticide = ''
      this.whomIdeaApplyPesticide = ''
      this.timesAppliedPesticide = ''
      this.didSprayYourself = ''
      this.payLaborSpraying = ''
      this.haveSprayer = ''
      this.kindSprayerHave = []
      this.kindSprayerHaveOther = ''
      this.howGetSprayer = ''
      this.hearAboutPesticideUsed = ''
      this.pesticideUsedMassMedia = ''
      this.pesticideUsedGroup = ''
      this.importantConsiderationDecidingPesticide = ''
      this.importantConsiderationDecidingPesticideOther = ''
      this.whomPestControlAdvice = []
      this.controlAdviceMassMedia = ''
      this.controlAdviceOther = ''
      this.whichAdviceCredible = ''
      this.why = ''
      this.attendedTrainingPestManagement = ''
      this.trainingAbout = ''
      this.whoOrganizedTraining = ''
    }
  },
}
</script>

<style scoped>
.requiredFieldHidden {
  display: none !important;
}
</style>
