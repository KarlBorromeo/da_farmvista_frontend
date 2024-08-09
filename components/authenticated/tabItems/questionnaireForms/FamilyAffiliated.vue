<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="(i, index) in items" :key="index">
        <v-btn :disabled="(i-1) === disabledIndex" icon class="formCardDeleteBtn" @click="deleteFormCard(i-1)"><v-icon class="red--text">mdi-trash-can</v-icon></v-btn>
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
              :disabled="(i-1) === disabledIndex"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Position" :required="true">
            <v-radio-group
              :rules="requiredRule"
              required
              v-model="position[i - 1]"
              class="py-0 my-0"
              row
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
              :disabled="(i-1) === disabledIndex"
            ></v-text-field>
          </form-input-container>

          <form-radio-container
            title="Type of Institution/Organization"
            :required="true"
          >
            <v-radio-group
              :rules="requiredRule"
              required
              v-model="typeOrganization[i - 1]"
              class="py-0 my-0"
              row
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
              min="0"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Status of Membership" :required="true">
            <v-radio-group
              :rules="requiredRule"
              required
              v-model="statusMembership[i - 1]"
              class="py-0 my-0"
              row
            >
              <v-radio
                v-for="item in statusMembershipItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Status of Organization" :required="true">
            <v-radio-group
              :rules="requiredRule"
              required
              v-model="statusOrganization[i - 1]"
              class="py-0 my-0"
              row
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
      <form-card-button @emitIncrement="increment" :disabled="disableIncrement"/>
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
  activated(){
    this.validate()
  },
  components: {
    formCard,
    formCardButton,
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    tempItems: 0,
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
    disableIncrement: false,
    disabledIndex: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
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
        valid,
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
        statusOrganization: []
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
    /* delete the record of card existing record */
    deleteFormCard(index) {
      if(index<this.items){
        this.nameFamilyMember.splice(index,1)
        this.position.splice(index,1)
        this.positionOthers.splice(index,1)
        this.nameOrganization.splice(index,1)
        this.typeOrganization.splice(index,1)
        this.typeOrganizationOthers.splice(index,1)
        this.numberYearsMember.splice(index,1)
        this.statusMembership.splice(index,1)
        this.statusOrganization.splice(index,1)
        this.items--
        let fullname = this.$store.getters['questionnaire/selfFarmerFullname']
        let i = this.nameFamilyMember.findIndex(item => item === fullname)
        if(i>=0){
          this.disabledIndex = i
        }
      }
    },
    increment() {
      // if (
      //   this.$store.getters['questionnaire/generalInformationDetails'].isHouseMemberAffiliatedToOrg == 'yes') {
        this.items++
        this.tempItems++
        this.nameFamilyMember.push('')
        this.position.push('')
        this.positionOthers.push('')
        this.nameOrganization.push('')
        this.typeOrganization.push('')
        this.typeOrganizationOthers.push('')
        this.numberYearsMember.push('')
        this.statusMembership.push('')
        this.statusOrganization.push('')
      // }
    },
    /* reset the data */
    resetData() {
      this.disabledIndex = ''
      this.items = 0
      this.tempItems = 0
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
		concatFullName(firstName, middleInitial, lastName) {
			const first = firstName + ' '
			const middle = middleInitial ? middleInitial + '. ' : ''
			const last = lastName
			const fullName = first + middle + last
			return fullName
		},
  },
  beforeMount() {
    this.positionItems = this.$store.getters['questionnaireCode/Code1']
    this.typeOrganizationItems = this.$store.getters['questionnaireCode/Code2']
    this.statusMembershipItems =
      this.$store.getters['questionnaireCode/Code3_4']
    this.statusOrganizationItems =
      this.$store.getters['questionnaireCode/Code3_4']
    const isEditing = this.$store.getters['profiling/isEditingMode']
    const fullname = this.$store.getters['questionnaire/selfFarmerFullname']

    /* if editing a record */
    if (isEditing) {
      const data = this.$store.getters['profiling/selectedRecord']
      const length = data.familyAffiliatedFarmOrg.length
      this.items += length
      this.tempItems = this.items
        
      /* instantiate all the record from backend */
      for (let i = 0; i < length; i++) {
        this.nameFamilyMember.push(data.familyAffiliatedFarmOrg[i].fullName)
        this.position.push(
          isOtherValueDefinedRadio(
            data.familyAffiliatedFarmOrg[i].position,
            this.positionItems
          )
        )
        this.positionOthers.push(
          extractUnmatchedValueRadio(
            data.familyAffiliatedFarmOrg[i].position,
            this.positionItems
          )
        )
        this.nameOrganization.push(
          data.familyAffiliatedFarmOrg[i].nameOrganization
        )
        this.typeOrganization.push(
          data.familyAffiliatedFarmOrg[i].typeOrganization
        )
        this.typeOrganizationOthers.push(
          extractUnmatchedValueRadio(
            data.familyAffiliatedFarmOrg[i].typeOrganization,
            this.typeOrganizationItems
          )
        )
        this.numberYearsMember.push(
          data.familyAffiliatedFarmOrg[i].yearsAsMember
        )
        this.statusMembership.push(
          data.familyAffiliatedFarmOrg[i].statusMembership
        )
        this.statusOrganization.push(
          data.familyAffiliatedFarmOrg[i].statusOrganization
        )
      }

      /* decide if remove the self farmer record or not if he/she is not a member of org */
      const selfFarmerOrganization = this.$store.getters['questionnaire/selfFarmerOrganization']
      if (selfFarmerOrganization.isMemberFarmerOrganization == 'yes') {
        const selectedRecordSelfFarmerName = this.concatFullName(data.profile.firstName,data.profile.middleInitial,data.profile.lastName)

        let index = data.familyAffiliatedFarmOrg.findIndex(item => item.fullName === selectedRecordSelfFarmerName)
        if(index>=0){
          this.disabledIndex = index
        }
      }else{
        this.disabledIndex = ''
        let length = this.nameFamilyMember.length
        for(let i=0; i<length; i++){
          if(this.nameFamilyMember[i] === fullname){
            this.nameFamilyMember.splice(i,1)
            this.position.splice(i,1)
            this.positionOthers.splice(i,1)
            this.nameOrganization.splice(i,1)
            this.typeOrganization.splice(i,1)
            this.typeOrganizationOthers.splice(i,1)
            this.numberYearsMember.splice(i,1)
            this.statusMembership.splice(i,1)
            this.statusOrganization.splice(i,1)
            this.items--
            this.tempItems--
            i=0;
            length = this.nameFamilyMember.length
          }
        }
      }

      /* decide to disable or not the add button if there is any other household member in organizations */
      const isAnyHouseholdMemberOrg = this.$store.getters['questionnaire/isHouseMemberAffiliatedToOrg']
      if (isAnyHouseholdMemberOrg == 'yes'){
        this.disableIncrement = false
      }else{
        this.disableIncrement = true
      }

      if(this.disabledIndex>=0){
        this.nameFamilyMember[this.disabledIndex] = fullname
      }
    } else {
    /* if manually creating a record */
      const profileGeneralInfo = this.$store.getters['questionnaire/generalInformationDetails']
      if (profileGeneralInfo) {
        /* add own self farmer if he/she is a member of organizations */
        if (profileGeneralInfo.isMemberFarmerOrganization == 'yes') {
          this.items = 1
          this.disabledIndex = this.items-1
          this.tempItems = this.items
          this.nameFamilyMember.push(fullname)
          this.position.push('')
          this.positionOthers.push('')
          this.nameOrganization.push(profileGeneralInfo.organizationName)
          this.typeOrganization.push('')
          this.typeOrganizationOthers.push('')
          this.numberYearsMember.push('')
          this.statusMembership.push('')
          this.statusOrganization.push('')
        }

        const isAnyHouseholdMemberOrg = this.$store.getters['questionnaire/isHouseMemberAffiliatedToOrg']
        if (isAnyHouseholdMemberOrg == 'yes'){
          this.disableIncrement = false
        }else{
          this.disableIncrement = true
        }
      } else {      
        this.resetData()
      }
    }
  },
  computed: {
    isHouseMemberAffiliatedToOrg() {
      return this.$store.getters['questionnaire/isHouseMemberAffiliatedToOrg']
    },
    selfFarmerOrganization(){
      return this.$store.getters['questionnaire/selfFarmerOrganization']
    },
    selfFarmerFullname() {
      return this.$store.getters['questionnaire/selfFarmerFullname']
    },
  },
  watch: {
    /* watch the changes value of isMemberFarmerOrganization */
    selfFarmerOrganization: {
      handler: function (val) {
        let fullname = this.$store.getters['questionnaire/selfFarmerFullname']
        if(val.isMemberFarmerOrganization == 'no'){   
          this.disabledIndex = ''
          let length = this.nameFamilyMember.length
          for(let i=0; i<length; i++){
            if(this.nameFamilyMember[i] === fullname){
              this.nameFamilyMember.splice(i,1)
              this.position.splice(i,1)
              this.positionOthers.splice(i,1)
              this.nameOrganization.splice(i,1)
              this.typeOrganization.splice(i,1)
              this.typeOrganizationOthers.splice(i,1)
              this.numberYearsMember.splice(i,1)
              this.statusMembership.splice(i,1)
              this.statusOrganization.splice(i,1)
              this.items--
              this.tempItems--
              i=0;
              length = this.nameFamilyMember.length
            }
          }
        }else{
          let existingValIndex = this.nameFamilyMember.findIndex(item => item === fullname)
          let indexNumber 
          if(existingValIndex<0){
            this.items++
            this.tempItems++
            indexNumber = this.tempItems-1
            this.nameFamilyMember.splice(indexNumber,1,fullname)
            this.position.splice(indexNumber,1,val.organizationTypeMembership)
            this.positionOthers.splice(indexNumber,1,'')
            this.nameOrganization.splice(indexNumber,1,val.organizationName)
            this.typeOrganization.splice(indexNumber,1,'')
            this.typeOrganizationOthers.splice(indexNumber,1,'')
            this.numberYearsMember.splice(indexNumber,1,'')
            this.statusMembership.splice(indexNumber,1,'')
            this.statusOrganization.splice(indexNumber,1,'')          
          }else{
            indexNumber = existingValIndex
            this.nameFamilyMember[indexNumber] = fullname
            this.position[indexNumber] = val.organizationTypeMembership
            this.nameOrganization[indexNumber] = val.organizationName
          }
          this.disabledIndex = indexNumber
        }
      },
      deep: true,
    },
    /* watch the changes value of isHouseMemberAffiliatedToOrg */
    isHouseMemberAffiliatedToOrg(val) {
      if(val == 'no'){
        this.disableIncrement = true;
        let fullname = this.$store.getters['questionnaire/selfFarmerFullname']
        let length = this.nameFamilyMember.length
        for(let i=0; i<length; i++){
          if(this.nameFamilyMember[i] !== fullname){
            this.nameFamilyMember.splice(i,1)
            this.position.splice(i,1)
            this.positionOthers.splice(i,1)
            this.nameOrganization.splice(i,1)
            this.typeOrganization.splice(i,1)
            this.typeOrganizationOthers.splice(i,1)
            this.numberYearsMember.splice(i,1)
            this.statusMembership.splice(i,1)
            this.statusOrganization.splice(i,1)
            this.items--
            this.tempItems--
            i=0;
            length = this.nameFamilyMember.length
            this.disabledIndex = i
          }
        }
      }else{
        this.disableIncrement = false;
      }
    },
    /* watch if the self farmer fullname is changed like names, then it will update the name of the index of disabled index if there is disabled index*/
    selfFarmerFullname(val) {
      if(this.disabledIndex>=0){
        this.nameFamilyMember[this.disabledIndex] = val
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
