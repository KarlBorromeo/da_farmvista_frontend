<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card-button @emitIncrement="increment" @emitDecrement="decrement" />
      <form-card v-for="(i, index) in items" :key="index">
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <form-input-container>
            <v-text-field
              v-model="nameFamilyMember[i - 1]"
              :rules="requiredRule"
              label="* Name of Family Member"
              required
              class="text-capitalize"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Position">
            <v-radio-group
              :rules="requiredRule"
              required
              v-model="position[i - 1]"
              class="py-0 my-0"
            >
              <v-radio
                v-for="item in positionItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="position[i - 1] === 'others'"
                v-model="positionOthers[i - 1]"
                :rules="requiredRule"
                required
                label="Others:"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="nameOrganization[i - 1]"
              :rules="requiredRule"
              required
              label="* Name of Institution/Organization"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Type of Institution/Organization">
            <v-radio-group
              :rules="requiredRule"
              required
              v-model="typeOrganization[i - 1]"
              class="py-0 my-0"
            >
              <v-radio
                v-for="item in typeOrganizationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="typeOrganization[i - 1] === 'others'"
                v-model="typeOrganizationOthers[i - 1]"
                :rules="requiredRule"
                required
                label="Other:"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="numberYearsMember[i - 1]"
              :rules="numberRule"
              required
              label="* No. of years as a member"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Status of Membership">
            <v-radio-group
              :rules="requiredRule"
              required
              v-model="statusMembership[i - 1]"
              class="py-0 my-0"
            >
              <v-radio
                v-for="item in statusMembershipItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Status of Organization">
            <v-radio-group
              :rules="requiredRule"
              required
              v-model="statusOrganization[i - 1]"
              class="py-0 my-0"
              @change="validate"
            >
              <v-radio
                v-for="item in statusOrganizationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import {
  concatinateEachIndexes,
  extractUnmatchedValueRadio,
  isOtherValueDefinedRadio,
  convertNumbers,
} from '~/reusableFunctions/questionnaireValidation'
export default {
  components: {
    formCard,
    formCardButton,
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    items: 0,
    nameFamilyMember: [],
    position: [],
    positionItems: [],
    positionOthers: [],
    nameOrganization: [],
    typeOrganization: [],
    typeOrganizationItems: [],
    typeOrganizationOthers: [],
    numberYearsMember: [],
    statusMembership: [],
    statusMembershipItems: [],
    statusOrganization: [],
    statusOrganizationItems: [],
    requiredRule: [(v) => !!v || 'This field is required'],
    numberRule: [(v) => parseInt(v) >= 0 || 'this number is invalid'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      if (this.items == 0) {
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'FamilyAffiliatedValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveData', {
          keyName: 'familyAffiliatedFarmOrg',
          data: this.getEmptyData(),
        })
        return
      }
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'FamilyAffiliatedValidated',
        valid
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'familyAffiliatedFarmOrg',
          data: this.getData(),
        })
      }
    },
    /* create an object that is an empty values */
    getEmptyData() {
      return {
        fullName: [],
        position: [],
        nameOrganization: [],
        typeOrganization: [],
        yearsAsMember: [],
        statusMembership: [],
        statusOrganization: [],
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        fullName: this.nameFamilyMember,
        position: concatinateEachIndexes(
          this.position,
          this.positionOthers,
          this.items
        ),
        nameOrganization: this.nameOrganization,
        typeOrganization: concatinateEachIndexes(
          this.typeOrganization,
          this.typeOrganizationOthers,
          this.items
        ),
        yearsAsMember: convertNumbers(this.numberYearsMember),
        statusMembership: this.statusMembership,
        statusOrganization: this.statusOrganization,
      }
    },
    /* decrement the count of items, pop the end index */
    decrement() {
      let min = 0;
      if(this.$store.getters['questionnaire/generalInformationDetails'].isMemberFarmerOrganization == 'yes' || this.$store.getters['profiling/selectedRecord'].profileGeneralInfo.isMemberFarmerOrganization){
        min = 1;
      }
      if (this.items > min) {
        this.items--
        this.nameFamilyMember.pop()
        this.position.pop()
        this.positionOthers.pop()
        this.nameOrganization.pop()
        this.typeOrganization.pop()
        this.typeOrganizationOthers.pop()
        this.numberYearsMember.pop()
        this.statusMembership.pop()
        this.statusOrganization.pop()
      }
    },
    increment() {
      this.items++
    },
    /* reset the data */
    resetData() {
      this.items = 0
      this.nameFamilyMember = []
      this.position = []
      this.positionOthers = []
      this.nameOrganization = []
      this.typeOrganization = []
      this.typeOrganizationOthers = []
      this.numberYearsMember = []
      this.statusMembership = []
      this.statusOrganization = []
    },
    /* concat fullname, return full name string */
    concatFullName(firstName,middleInitial,lastName){
      const first = firstName + ' '
      const middle = middleInitial?middleInitial+'. ':'';
      const last= lastName
      const fullName = first + middle + last
      return fullName
    }
  },
  beforeMount() {
    this.positionItems = this.$store.getters['questionnaireCode/Code1']
    this.typeOrganizationItems = this.$store.getters['questionnaireCode/Code2']
    this.statusMembershipItems = this.$store.getters['questionnaireCode/Code3_4']
    this.statusOrganizationItems = this.$store.getters['questionnaireCode/Code3_4']

    const isEditing = this.$store.getters['profiling/isEditingMode']    
    if (isEditing) {
      const data = this.$store.getters['profiling/selectedRecord']
      if (data.familyAffiliatedFarmOrg) {
        //TODO: on edit BE, delete this if BE done START
        if(data.profileGeneralInfo.isMemberFarmerOrganization == 'yes'){
          const fullName = this.concatFullName(data.profile.firstName,data.profile.middleInitial,data.profile.lastName)
          this.items++
          this.nameFamilyMember.push(fullName)
          this.position.push('')
          this.positionOthers.push('')
          this.nameOrganization.push(data.profileGeneralInfo.organizationName)
          this.typeOrganization.push('')
          this.typeOrganizationOthers.push('')
          this.numberYearsMember.push('')
          this.statusMembership.push('')
          this.statusOrganization.push('')
        }
        //TODO: on edit BE, delete this if BE done END
        const length = data.familyAffiliatedFarmOrg.length
        this.items += length
        for (let i = 0; i < length; i++) {
          this.nameFamilyMember.push(data.familyAffiliatedFarmOrg[i].fullName)
          this.position.push(isOtherValueDefinedRadio(data.familyAffiliatedFarmOrg[i].position,this.positionItems))
          this.positionOthers.push(extractUnmatchedValueRadio(data.familyAffiliatedFarmOrg[i].position,this.positionItems))
          this.nameOrganization.push(data.familyAffiliatedFarmOrg[i].nameOrganization)
          this.typeOrganization.push(data.familyAffiliatedFarmOrg[i].typeOrganization)
          this.typeOrganizationOthers.push(extractUnmatchedValueRadio(data.familyAffiliatedFarmOrg[i].typeOrganization,this.typeOrganizationItems))
          this.numberYearsMember.push(data.familyAffiliatedFarmOrg[i].yearsAsMember)
          this.statusMembership.push(data.familyAffiliatedFarmOrg[i].statusMembership)
          this.statusOrganization.push(data.familyAffiliatedFarmOrg[i].statusOrganization)
        }
      } else {
        this.resetData()
      }
    } else {
      const profileGeneralInfo = this.$store.getters['questionnaire/generalInformationDetails']
      const profile = this.$store.getters['questionnaire/profile']
      if(profileGeneralInfo && profile){
        if(profileGeneralInfo.isMemberFarmerOrganization == 'yes'){
          const firstName = profile.firstName + ' '
          const middleInitial = profile.middleInitial?profile.middleInitial+'. ':'';
          const lastName = profile.lastName
          const fullName = firstName + middleInitial + lastName
          this.items = 1
          this.nameFamilyMember.push(fullName)
          this.position.push('')
          this.positionOthers.push('')
          this.nameOrganization.push(profileGeneralInfo.organizationName)
          this.typeOrganization.push('')
          this.typeOrganizationOthers.push('')
          this.numberYearsMember.push('')
          this.statusMembership.push('')
          this.statusOrganization.push('')
        }
      }else{
        this.resetData()
      }
    }
  },
  computed: {
    farmerOrgName(){
      return this.$store.getters['questionnaire/generalInformationDetails'].organizationName
    },
    farmerOwnProfile(){
      return this.$store.getters['questionnaire/profile']
    }
  },
  watch: {
    /* watch if the the own farmer details member org will be change to yes or no, then it will affect also the family affiliated data */
    farmerOrgName(val){
      if(this.$store.getters['questionnaire/generalInformationDetails'].isMemberFarmerOrganization == 'yes'){
          console.log(this.nameOrganization)
          this.nameOrganization[0] = val
      } 
    },
    /* watch if the farmer profile is changed like names, then it will affect also the family affilated data */
    farmerOwnProfile(val){
      if(this.$store.getters['questionnaire/generalInformationDetails'].isMemberFarmerOrganization == 'yes'){
        const fullName = this.concatFullName(val.firstName,val.middleInitial,val.lastName)
        this.nameFamilyMember[0] = fullName
      }
    },
    items() {
      this.validate()
    },
    position(value) {
      this.validate()
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.positionOthers[index] = ''
        }
      })
    },
    typeOrganization(value) {
      this.validate()
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.typeOrganizationOthers[index] = ''
        }
      })
    },
    nameFamilyMember() {
      this.validate()
    },
    positionOthers() {
      this.validate()
    },
    nameOrganization() {
      this.validate()
    },
    typeOrganizationOthers() {
      this.validate()
    },
    numberYearsMember() {
      this.validate()
    },
    statusMembership() {
      this.validate()
    },
    statusOrganization() {
      this.validate()
    },
  },
}
</script>
