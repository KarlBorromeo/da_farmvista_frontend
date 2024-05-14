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
          <v-text-field
            v-model="sex"
            :rules="requiredRule"
            required
            class="hiddenRequiredField"
          />
          <v-radio-group v-model="sex" class="pa-0 ma-0">
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
        </form-radio-container>

        <form-radio-container title="Civil Status">
          <v-text-field
            v-model="civilStatus"
            :rules="requiredRule"
            required
            class="hiddenRequiredField"
          />
          <v-radio-group v-model="civilStatus" class="pa-0 ma-0">
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
        </form-radio-container>

        <form-input-container>
          <v-text-field
            v-model="religion"
            :rules="requiredRule"
            label="* Religion"
            required
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="highestEducationAttained"
            :rules="requiredRule"
            label="* Highest Educational Attainment"
          ></v-text-field>
        </form-input-container>

        <form-radio-container title="Belongs to the Marginalized Sector">
          <v-text-field
            v-model="isBelongMarginalizedSector"
            :rules="requiredRule"
            required
            class="hiddenRequiredField"
          />
          <v-radio-group v-model="isBelongMarginalizedSector" class="py-0 my-0">
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
        </form-radio-container>

        <form-checkbox-container
          v-if="isBelongMarginalizedSector == 'no'"
          title="If you answered 'no' to the previous question: please specify"
        >
          <v-text-field
            v-model="nonMarginalizedSector"
            :rules="listRule"
            required
            class="hiddenRequiredField"
          />
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
          <v-text-field
            v-model="isMemberOrgranization"
            :rules="requiredRule"
            required
            class="hiddenRequiredField"
          />
          <v-radio-group v-model="isMemberOrgranization" class="py-0 my-0">
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
        </form-radio-container>

        <form-radio-container
          v-if="isMemberOrgranization == 'yes'"
          title=" If you answered 'yes' to the previous question, select type of Membership"
        >
          <v-text-field
            v-model="typeMembership"
            :rules="requiredRule"
            required
            class="hiddenRequiredField"
          />
          <v-radio-group v-model="typeMembership" class="py-0 my-0">
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
          <v-text-field
            v-model="isAnyHouseholdMemberOrg"
            :rules="requiredRule"
            required
            class="hiddenRequiredField"
          />
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
        </form-radio-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
import FormCheckboxContainer from '../../form/formCheckboxContainer.vue'
export default {
  components: { FormInputContainer, FormRadioContainer, FormCheckboxContainer },
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
    listRule: [(v) => v.length > 0 || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      console.log(valid)
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        age: this.age,
        sex: this.sex,
        civilStatus: this.civilStatus,
        religion: this.religion,
        highestEducationAttained: this.highestEducationAttained,
        isBelongMarginalizedSector: this.isBelongMarginalizedSector,
        ifNoMarginalizedSectorName: this.nonMarginalizedSector,
        dialectSpoken: this.dialectSpoken,
        isMemberFarmerOrganization: this.isMemberOrgranization,
        organizationTypeMembership: this.typeMembership,
        organizationName: this.organizationName,
      }
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
      if (value == 'yes') {
        this.nonMarginalizedSector = []
      }
    },
    isMemberOrgranization(value) {
      if (value == 'no') {
        this.typeMembership = ''
        this.organizationName = ''
      }
    },
  },
}
</script>
