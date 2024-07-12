<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="i in items" :key="i">
        <v-btn :disabled="(i-1) === disabledIndex" icon class="formCardDeleteBtn" @click="deleteFormCard(i-1)"><v-icon class="red--text">mdi-trash-can</v-icon></v-btn>
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <form-input-container>
            <v-text-field
              v-model="name[i - 1]"
              :rules="requiredRule"
              label="* Name"
              :disabled="(i-1) === disabledIndex"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="age[i - 1]"
              :rules="numberRule"
              label="* Age"
              type="number"
              :disabled="(i-1) === disabledIndex"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Sex" :required="true">
            <v-radio-group
              :rules="requiredRule"
              v-model="sex[i - 1]"
              class="pa-0 ma-0"
              :disabled="(i-1) === disabledIndex"
            >
              <v-radio
                v-for="item in sexItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="roleFamily[i - 1]"
              :rules="requiredRule"
              label="* Role in the family"
            ></v-text-field>
          </form-input-container>

          <form-select-container>
            <v-select
              :items="educationsAttainmentItems"
              v-model="educationsAttainment[i - 1]"
              :rules="requiredRule"
              label="* Highest Educational Attainment"
              required
              class="text-capitalize"
              :disabled="(i-1) === disabledIndex"
            ></v-select>
          </form-select-container>

          <form-input-container>
            <v-text-field
              v-model="contributionAmount[i - 1]"
              :rules="numberRule"
              label="* Contributiong (PHP) income/month"
              type="number"
              min="0"
            ></v-text-field>
          </form-input-container>

          <form-radio-container
            title="Involved in coffee farm"
            :required="true"
          >
            <v-radio-group
              :rules="requiredRule"
              v-model="involveCoffeefarm[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in involveCoffeefarmItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
      <form-card-button @emitIncrement="increment" @emitDecrement="decrement" />
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import { convertNumbers } from '~/reusableFunctions/questionnaireValidation'
import FormSelectContainer from '../../form/formSelectContainer.vue'
export default {
  activated(){
    this.validate()
  },
  components: {
    formCard,
    formCardButton,
    FormInputContainer,
    FormRadioContainer,
    FormSelectContainer,
  },
  data: () => ({
    valid: false,
    items: 1,
    name: [],
    age: [],
    sex: [],
    sexItems: [],
    roleFamily: [],
    educationsAttainment: [],
    educationsAttainmentItems: [],
    contributionAmount: [],
    involveCoffeefarm: [],
    involveCoffeefarmItems: ['yes', 'no'],
    requiredRule: [(v) => !!v || 'invalid value'],
    numberRule: [(v) => parseInt(v) >= 0 || 'invalid value'],
    tempValue: '',
    disabledIndex: ''
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      if (this.items == 0) {
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'FamilyIncomeValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveData', {
          keyName: 'familySourceIncome',
          data: this.getEmptyData(),
        })
        return
      }
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'FamilyIncomeValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'familySourceIncome',
          data: this.getData(),
        })
      }
    },
    /* create an object that is an empty values */
    getEmptyData() {
      return {
        fullName: [],
        age: [],
        sex: [],
        roleInFamily: [],
        educationAttainment: [],
        estimatedContribution: [],
        isInvolvedCoffeeFarm: [],
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        fullName: this.name,
        age: this.age,
        sex: this.sex,
        roleInFamily: this.roleFamily,
        educationAttainment: this.educationsAttainment,
        estimatedContribution: convertNumbers(this.contributionAmount),
        isInvolvedCoffeeFarm: this.involveCoffeefarm,
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--
        this.name.pop()
        this.age.pop()
        this.sex.pop()
        this.roleFamily.pop()
        this.educationsAttainment.pop()
        this.contributionAmount.pop()
        this.involveCoffeefarm.pop()
      }
    },
    increment() {
      this.items++
    },
    resetData() {
      this.items = 0
      this.disabledIndex = ''
      this.name = []
      this.age = []
      this.sex = []
      this.roleFamily = []
      this.educationsAttainment = []
      this.contributionAmount = []
      this.involveCoffeefarm = []
    },
     /* delete the record of card existing record */
    deleteFormCard(index) {
      this.name.splice(index,1)
      this.age.splice(index,1)
      this.sex.splice(index,1)
      this.roleFamily.splice(index,1)
      this.educationsAttainment.splice(index,1)
      this.contributionAmount.splice(index,1)
      this.involveCoffeefarm.splice(index,1)
      this.items--
      let fullname = "maria liza a. racho"
      let i = this.name.findIndex(item => item === fullname)
      if(i>=0){
        this.disabledIndex = i
      }
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
  computed: {
    farmerGenInfo() {
      return this.$store.getters['questionnaire/generalInformationDetails']
    },
    selfFarmerFullname() {
      return this.$store.getters['questionnaire/selfFarmerFullname']
    },
  },
  watch: {
    farmerGenInfo(val) {
      //TODO: tell aubrey to put to index 0 the ownFarmer details in order to target always the index 0 incase the name is changed and etc.
      this.age[0] = val.age
      this.sex[0] = val.sex
      this.educationsAttainment[0] = val.highestEducationAttained
    },
    selfFarmerFullname(val) {
      //TODO: tell aubrey to put to index 0 the ownFarmer details in order to target always the index 0 incase the name is changed and etc.
      this.name[0] = val
    },
    name() {
      this.validate()
    },
    age() {
      this.validate()
    },
    sex() {
      this.validate()
    },
    roleFamily() {
      this.validate()
    },
    educationsAttainment() {
      this.validate()
    },
    contributionAmount() {
      this.validate()
    },
    involveCoffeefarm() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
  beforeMount() {
    this.sexItems = this.$store.getters['questionnaireCode/Sex']
    this.educationsAttainmentItems =
      this.$store.getters['questionnaireCode/HighestEducationalAttainment']
    const isEditing = this.$store.getters['profiling/isEditingMode']
    if (isEditing) {
      const data = this.$store.getters['profiling/selectedRecord']
      if (Object.keys(data).length > 0) {
        const length = data.familySourceIncome.length
        if (length > 0) {
          this.disabledIndex = 0
          this.items = length
          for (let i = 0; i < length; i++) {
            this.name[i] = data.familySourceIncome[i].fullName
            this.age[i] = data.familySourceIncome[i].age
            this.sex[i] = data.familySourceIncome[i].sex
            this.roleFamily[i] = data.familySourceIncome[i].roleInFamily
            this.educationsAttainment[i] =
              data.familySourceIncome[i].educationAttainment
            this.contributionAmount[i] =
              data.familySourceIncome[i].estimatedContribution
            this.involveCoffeefarm[i] =
              data.familySourceIncome[i].isInvolvedCoffeeFarm
          }
        } else {
          this.resetData()
        }
      } else {
        this.resetData()
      }
      this.tempValue = 'tempValue'
    } else {
      const profileGeneralInfo =
        this.$store.getters['questionnaire/generalInformationDetails']
      const profile = this.$store.getters['questionnaire/profile']
      if (profileGeneralInfo && profile) {
        const fullName = this.concatFullName(
          profile.firstName,
          profile.middleInitial,
          profile.lastName
        )
        this.items = 1
        this.name.push(fullName)
        this.age.push(profileGeneralInfo.age)
        this.sex.push(profileGeneralInfo.sex)
        this.roleFamily.push('')
        this.educationsAttainment.push(
          profileGeneralInfo.highestEducationAttained
        )
        this.contributionAmount.push('')
        this.involveCoffeefarm.push('')
      }
    }
  },
}
</script>
