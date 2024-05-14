<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-checkbox-container title="Agricultural System">
          <v-checkbox
            :rules="listRule"
            v-for="item in agriculturalSystemItems"
            v-model="agriculturalSystem"
            :key="item"
            :value="item"
            :label="item"
            class="ma-0 pa-0"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(agriculturalSystem)"
            v-model="agriculturalSystemOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-radio-container
          title="Did know proper reutilization of agri-waste?"
        >
          <v-radio-group :rules="requiredRule" v-model="didKnowProperReutilization" class="pa-0 ma-0">
            <v-radio
              v-for="item in didKnowProperReutilizationItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-checkbox-container
          v-if="didKnowProperReutilization == 'no'"
          title="If No, where diposed the unutilzied agir-waste?"
        >
          <v-checkbox
            v-for="item in whereDisposedUnutilizedAgriwasteItems"
            v-model="whereDisposedUnutilizedAgriwaste"
            :rules="listRule"
            :key="item"
            :value="item"
            :label="item"
            class="ma-0 pa-0"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(whereDisposedUnutilizedAgriwaste)"
            v-model="whereDisposedUnutilizedAgriwasteOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container
          title="Where heared about reutilization of agri-waste"
        >
          <v-checkbox
            v-for="item in whereHearAboutReutilizationItems"
            v-model="whereHearAboutReutilization"
            :key="item"
            :value="item"
            :label="item"
            class="ma-0 pa-0"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(whereHearAboutReutilization)"
            v-model="whereHearAboutReutilizationOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
          <div
            v-if="whereHearAboutReutilization.length == 0"
            class="red--text caption pa-0 ma-0"
          >
            You must select at least one option!
          </div>
        </form-checkbox-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormCheckboxContainer from '../../form/formCheckboxContainer.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
export default {
  components: {
    FormInputContainer,
    FormRadioContainer,
    FormCheckboxContainer,
  },
  data: () => ({
    valid: false,
    agriculturalSystem: [],
    agriculturalSystemItems: [],
    agriculturalSystemOther: '',
    didKnowProperReutilization: '',
    didKnowProperReutilizationItems: ['yes', 'no'],
    // if no
    whereDisposedUnutilizedAgriwaste: [],
    whereDisposedUnutilizedAgriwasteItems: [],
    whereDisposedUnutilizedAgriwasteOther: '',
    whereHearAboutReutilization: [],
    whereHearAboutReutilizationItems: [],
    whereHearAboutReutilizationOther: '',
    requiredRule: [(v) => !!v || 'This field is required'],
    listRule: [ (v) => v.length>0 || 'Must select at least one one']
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      console.log(valid);
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
    /* check if 'other' checkbox is ticked */
    isOtherTicked(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] == 'others') {
          return true
        }
      }
      return false
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        agriculturalSystem: this.concatOtherValue(
          this.agriculturalSystem,
          this.agriculturalSystemOther
        ),
        knowProperReutilizationAgriwaste: this.didKnowProperReutilization,
        whereDisposedUnutilizedAgriwaste: this.concatOtherValue(
          this.whereDisposedUnutilizedAgriwaste,
          this.whereDisposedUnutilizedAgriwasteOther
        ),
        whereHearAboutReutilization: this.concatOtherValue(
          this.whereHearAboutReutilization,
          this.whereHearAboutReutilizationOther
        ),
      }
    },
  },
  beforeMount() {
    this.agriculturalSystemItems =
      this.$store.getters['questionnaireCode/AgriculturalSystem']
    this.whereDisposedUnutilizedAgriwasteItems =
      this.$store.getters['questionnaireCode/WasteDisposalMethod']
    this.whereHearAboutReutilizationItems =
      this.$store.getters[
        'questionnaireCode/AgriWasteReutilizationInformationSource'
      ]
  },
  watch: {
    agriculturalSystem(value){
      if(value != 'others'){
        this.agriculturalSystemOther = ''
      }
    },
    whereDisposedUnutilizedAgriwaste(value){
      if(value != 'others'){
        this.whereDisposedUnutilizedAgriwasteOther = ''
      }
    },
    whereHearAboutReutilization(value){
      if(value != 'others'){
        this.whereHearAboutReutilizationOther = ''
      }
    }
  }
}
</script>
