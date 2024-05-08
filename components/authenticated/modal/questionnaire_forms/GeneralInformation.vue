<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="py-0 pb-2 my-0">
          <v-text-field
            v-model="age"
            :rules="ageRule"
            label="* Age"
            type="number"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="py-0 my-0">
          <v-radio-group v-model="sex" class="pa-0 ma-0">
            <p class="pa-0 ma-0">* Sex:</p>
            <v-radio
              v-for="item in sexItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!sex" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>

        <v-col cols="12" md="4" class="py-0 my-0">
          <v-radio-group v-model="civilStatus" class="pa-0 ma-0">
            <p class="pa-0 ma-0">* Civil Status:</p>
            <v-radio
              v-for="item in civilStatusItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!civilStatus" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>

        <v-col cols="12" md="4" class="py-0 pb-2">
          <v-text-field
            v-model="religion"
            :rules="requiredRule"
            label="* Religion"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="py-0 pb-2">
          <v-text-field
            v-model="highestEducationAttained"
            :rules="requiredRule"
            label="* Highest Educational Attainment"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="py-0 my-0 pb-2">
          <v-radio-group v-model="isBelongMarginalizedSector" class="py-0 my-0">
            <p class="pa-0 ma-0">* Belongs to the Marginalized Sector:</p>
            <v-radio
              v-for="item in isBelongMarginalizedSectorItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!isBelongMarginalizedSector" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
        <v-col
          v-if="isBelongMarginalizedSector == 'no'"
          cols="12"
          md="4"
          class="py-0 my-0"
        >
          <p class="pa-0 ma-0 mb-2">
            * If you answered 'no' to the previous question: please specify
          </p>
          <v-checkbox
            v-for="item in nonMarginalizedSectorItems"
            v-model="nonMarginalizedSector"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            class="ma-0 pa-0"
          ></v-checkbox>
          <div
            v-if="emptyNonMarginalizedSector"
            class="red--text caption pa-0 ma-0"
          >
            You must select at least one option!
          </div>
        </v-col>

        <v-col cols="12" md="4" class="py-0 pb-2">
          <v-text-field
            v-model="dialectSpoken"
            :rules="requiredRule"
            label="* Dialect Spoken"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="py-0 my-0 pb-2">
          <v-radio-group v-model="isMemberOrgranization" class="py-0 my-0">
            <p class="pa-0 ma-0">
              * Member of a farmer organization or cooperative?
            </p>
            <v-radio
              v-for="item in isMemberOrgranizationItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!isMemberOrgranization" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>

        <v-col
          v-if="isMemberOrgranization == 'yes'"
          cols="12"
          md="4"
          class="py-0 my-0 pb-2"
        >
          <v-radio-group v-model="typeMembership" class="py-0 my-0">
            <p class="pa-0 ma-0">
              * If you answered 'yes' to the previous question, Please select
              type of Membership:
            </p>
            <v-radio
              v-for="item in typeMembershipItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!typeMembership" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>

        <v-col
          v-if="isMemberOrgranization == 'yes'"
          cols="12"
          md="4"
          class="py-0 pb-2"
        >
          <v-text-field
            v-model="organizationName"
            :rules="requiredRule"
            label="* Name of Organization/Cooperative:"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="py-0 my-0 pb-2">
          <v-radio-group v-model="isAnyHouseholdMemberOrg" class="py-0 my-0">
            <p class="pa-0 ma-0">
              * Any household member affiliated to any farming
              organization/association?
            </p>
            <v-radio
              v-for="item in isAnyHouseholdMemberOrgItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!isAnyHouseholdMemberOrg" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    age: null,
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
    sex: '',
    sexItems: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
    civilStatus: '',
    civilStatusItems: [
      { value: 'single', label: 'Single' },
      { value: 'married', label: 'Married' },
      { value: 'widow/widower', label: 'Widow/Widower' },
      { value: 'separated', label: 'Separated' },
      { value: 'common law partnership', label: 'Common Law Partnership' },
    ],
    religion: '',
    highestEducationAttained: '',
    isBelongMarginalizedSector: '',
    isBelongMarginalizedSectorItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    // fdsfdsafsdafdsafsadfdsafdsafdsafsdafdasfdsafsdfdsafadsfads
    nonMarginalizedSector: [],
    nonMarginalizedSectorItems: [
      { value: 'senior citizen', label: 'Senior Citizen' },
      { value: 'indigenous people', label: 'Indigenous People' },
      { value: 'person with disability', label: 'Person with Disability' },
      { value: '4Ps beneficiary', label: '4Ps Beneficiary' },
    ],
    dialectSpoken: '',
    isMemberOrgranization: '',
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
    isAnyHouseholdMemberOrg: '',
    isAnyHouseholdMemberOrgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate();
      const radioCheckBoxValid = this.validateRadioCheckbox()
      if(valid && radioCheckBoxValid){
        const data = this.getData();
        console.log(data);
      }else{
        alert('invalid')
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData(){
      return{
        age: this.age,
        sex: this.sex,
        civil_status: this.civilStatus,
        religion: this.religion,
        highest_education_attained: this.highestEducationAttained,
        is_belong_marginalized_sector: this.isBelongMarginalizedSector,
        if_no_marginalized_sector_name: this.nonMarginalizedSector,
        dialect_spoken: this.dialectSpoken,
        is_member_farmer_organization: this.isMemberOrgranization,
        organization_type_membership: this.typeMembership,
        organization_name: this.organizationName
      }
    },
    /* check if radio inputs and checkboxes are not empty, return true if validated */
    validateRadioCheckbox(){
      if(!this.sex || 
        !this.civilStatus || 
        !this.isBelongMarginalizedSector || 
        !this.isMemberOrgranization || 
        !this.typeMembership || 
        !this.isAnyHouseholdMemberOrg){
        return false
      }
      if(this.isBelongMarginalizedSector == 'no' && this.nonMarginalizedSector.length == 0){
        return false
      }
      if(this.isMemberOrgranization == 'yes' && !this.typeMembership){
        return false
      }
      return true;
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
  watch:{
    isBelongMarginalizedSector(value){
      if(value == 'no'){
        this.nonMarginalizedSector = [];
      }
    },
    isMemberOrgranization(value){
      if(value == 'yes'){
        this.typeMembership = '';
        this.organizationName = '';
      }
    }
  }
}
</script>
