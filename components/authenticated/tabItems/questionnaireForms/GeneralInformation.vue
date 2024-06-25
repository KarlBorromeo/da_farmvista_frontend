<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-text-field
            v-model="age"
            :rules="ageRule"
            label="* Age"
            type="number"
            required
          ></v-text-field>
        </form-input-container>

        <form-radio-container title="Sex">
          <v-radio-group :rules="requiredRule" v-model="sex" class="pa-0 ma-0">
            <v-radio
              v-for="item in sexItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Civil Status">
          <v-radio-group
            :rules="requiredRule"
            v-model="civilStatus"
            class="pa-0 ma-0"
          >
            <v-radio
              v-for="item in civilStatusItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-input-container>
          <v-text-field
            v-model="religion"
            :rules="requiredRule"
            label="* Religion"
            required
          ></v-text-field>
        </form-input-container>

        <form-select-container>
          <v-select
            :items="highestEducationAttainedItems"
            v-model="highestEducationAttained"
            :rules="requiredRule"
            label="Highest Educational Attainment"
            required
            class="text-capitalize"
          ></v-select>
        </form-select-container>

        <form-radio-container title="Belongs to the Marginalized Sector">
          <v-radio-group
            :rules="requiredRule"
            v-model="isBelongMarginalizedSector"
            class="py-0 my-0"
          >
            <v-radio
              v-for="item in isBelongMarginalizedSectorItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-checkbox-container
          v-if="isBelongMarginalizedSector == 'no'"
          title="If you answered 'no' to the previous question: please specify"
        >
          <v-checkbox
            v-for="item in nonMarginalizedSectorItems"
            v-model="nonMarginalizedSector"
            :key="item"
            :value="item"
            :label="item"
            class="ma-0 pa-0"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(nonMarginalizedSector)"
            v-model="nonMarginalizedSectorOthers"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-input-container>
          <v-text-field
            v-model="dialectSpoken"
            :rules="requiredRule"
            label="* Dialect Spoken"
          ></v-text-field>
        </form-input-container>

        <form-radio-container
          title="Member of a farmer organization or cooperative?"
        >
          <v-radio-group
            :rules="requiredRule"
            v-model="isMemberOrgranization"
            class="py-0 my-0"
          >
            <v-radio
              v-for="item in isMemberOrgranizationItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container
          v-if="isMemberOrgranization == 'yes'"
          title=" If you answered 'yes' to the previous question, select type of Membership"
        >
          <v-radio-group
            :rules="requiredRule"
            v-model="typeMembership"
            class="py-0 my-0"
          >
            <v-radio
              v-for="item in typeMembershipItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-input-container v-if="isMemberOrgranization == 'yes'">
          <v-text-field
            v-model="organizationName"
            :rules="requiredRule"
            label="* Name of Organization/Cooperative:"
          ></v-text-field>
        </form-input-container>

        <form-radio-container
          title="Any household member affiliated to any farming organization/association?"
        >
          <v-radio-group
            :rules="requiredRule"
            v-model="isAnyHouseholdMemberOrg"
            class="py-0 my-0"
          >
            <v-radio
              v-for="item in isAnyHouseholdMemberOrgItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import FormCheckboxContainer from '~/components/authenticated/form/formCheckboxContainer.vue'
import FormSelectContainer from '../../form/formSelectContainer.vue'
import { concatOtherValueToList, isOtherValueTickedCheckbox, extractUnmatchedValueCheck } from '~/reusableFunctions/questionnaireValidation'
export default {
  components: {
    FormInputContainer,
    FormRadioContainer,
    FormCheckboxContainer,
    FormSelectContainer
  },
  data: () => ({
    valid: false,
    age: 35,
    ageRule: [
      (v) => {
        if (v) {
          if (v > 0 && v < 100) {
            return true
          }
          return 'Age must be more than 0 and less than 100'
        }
        return 'Age is required'
      },
    ],
    sex: 'male',
    sexItems: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
    civilStatus: 'married',
    civilStatusItems: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married' },
      { value: 'widow/widower', label: 'Widow/Widower' },
      { value: 'separated', label: 'Separated' },
      {
        value: 'common law partnership',
        label: 'Common Law Partnership',
      },
    ],
    religion: 'catholic',
    highestEducationAttained: 'college grad',
    highestEducationAttainedItems: [],
    isBelongMarginalizedSector: 'no',
    isBelongMarginalizedSectorItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    nonMarginalizedSector: ['indigenous people'],
    nonMarginalizedSectorOthers: '',
    nonMarginalizedSectorItems: [],
    dialectSpoken: 'Bisaya',
    isMemberOrgranization: 'no',
    isMemberOrgranizationItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    typeMembership: '',
    typeMembershipItems: [
      { value: 'member', label: 'Member' },
      { value: 'Officer', label: 'Officer' },
    ],
    organizationName: '',
    isAnyHouseholdMemberOrg: 'yes',
    isAnyHouseholdMemberOrgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
    listRule: [(v) => v.length > 0 || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const textRadioValid = this.$refs.form.validate()
      const checkboxValid = this.validateCheckbox()
      let valid = false
      if (textRadioValid && checkboxValid) {
        valid = true
      }
      console.log('validated', valid)
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'GeneralInformationValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'profileGeneralInfo',
          data: this.getData(),
        })
      }
    },
    /* validate checkbox if empty or not */
    validateCheckbox() {
      if (
        this.isBelongMarginalizedSector == 'no' &&
        this.nonMarginalizedSector.length == 0
      ) {
        return false
      }else if(this.nonMarginalizedSector.includes('others') && !this.nonMarginalizedSectorOthers){
        return false
      } 
      else {
        return true
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        age: parseInt(this.age),
        sex: this.sex,
        civilStatus: this.civilStatus,
        religion: this.religion,
        highestEducationAttained: this.highestEducationAttained,
        isBelongMarginalizedSector: this.isBelongMarginalizedSector,
        ifNoMarginalizedSectorName: concatOtherValueToList(this.nonMarginalizedSector,this.nonMarginalizedSectorOthers),
        dialectSpoken: this.dialectSpoken,
        isMemberFarmerOrganization: this.isMemberOrgranization,
        organizationTypeMembership: this.typeMembership,
        organizationName: this.organizationName,
        isHouseMemberAffiliatedToOrg: this.isAnyHouseholdMemberOrg,
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
  },
  computed: {
    emptyNonMarginalizedSector() {
      if (this.nonMarginalizedSector.length == 0) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    isBelongMarginalizedSector(value) {
      this.validate()
      console.log('hahaha')
      if (value == 'yes') {
        this.nonMarginalizedSector = []
      }
    },
    isMemberOrgranization(value) {
      this.validate()
      if (value == 'no') {
        this.typeMembership = ''
        this.organizationName = ''
      }
    },
    age() {
      this.validate()
    },
    sex() {
      this.validate()
    },
    civilStatus() {
      this.validate()
    },
    religion() {
      this.validate()
    },
    highestEducationAttained() {
      this.validate()
    },
    nonMarginalizedSector() {
      this.validate()
    },
    dialectSpoken() {
      this.validate()
    },
    typeMembership() {
      this.validate()
    },
    organizationName() {
      this.validate()
    },
    isAnyHouseholdMemberOrg() {
      this.validate()
    },
  },
  beforeMount() {
    this.nonMarginalizedSectorItems = this.$store.getters['questionnaireCode/MarginalizedSector']
    this.highestEducationAttainedItems = this.$store.getters['questionnaireCode/HighestEducationalAttainment']
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.age = data.profileGeneralInfo.age
      this.sex = data.profileGeneralInfo.sex
      this.civilStatus = data.profileGeneralInfo.civilStatus
      this.religion = data.profileGeneralInfo.religion
      this.highestEducationAttained =
        data.profileGeneralInfo.highestEducationAttained
      this.isBelongMarginalizedSector =
        data.profileGeneralInfo.isBelongMarginalizedSector
      this.nonMarginalizedSector = isOtherValueTickedCheckbox( data.profileGeneralInfo.ifNoMarginalizedSectorName,this.nonMarginalizedSectorItems)
      this.nonMarginalizedSectorOthers = extractUnmatchedValueCheck(data.profileGeneralInfo.ifNoMarginalizedSectorName,this.nonMarginalizedSectorItems)

      this.dialectSpoken = data.profileGeneralInfo.dialectSpoken
      this.isMemberOrgranization =
        data.profileGeneralInfo.isMemberFarmerOrganization
      this.typeMembership = data.profileGeneralInfo.organizationTypeMembership
      this.organizationName = data.profileGeneralInfo.organizationName
      this.isAnyHouseholdMemberOrg =
        data.profileGeneralInfo.isHouseMemberAffiliatedToOrg
    } else {
      this.age = ''
      this.sex = ''
      this.civilStatus = ''
      this.religion = ''
      this.highestEducationAttained = ''
      this.isBelongMarginalizedSector = ''
      this.nonMarginalizedSector = []
      this.dialectSpoken = ''
      this.isMemberOrgranization = ''
      this.typeMembership = ''
      this.organizationName = ''
      this.isAnyHouseholdMemberOrg = ''
    }
  },
}
</script>
