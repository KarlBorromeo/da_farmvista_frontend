<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card-button @emitIncrement="increment" @emitDecrement="decrement" />
      <form-card v-for="i in items" :key="i">
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <form-input-container>
            <v-text-field
              v-model="name[i - 1]"
              :rules="requiredRule"
              label="* Name"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="age[i - 1]"
              :rules="numberRule"
              label="* Age"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Sex">
            <v-radio-group
              :rules="requiredRule"
              v-model="sex[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in sexItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
              label="Highest Educational Attainment"
              required
              class="text-capitalize"
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

          <form-radio-container title="Involved in coffee farm">
            <v-radio-group
              :rules="requiredRule"
              v-model="involveCoffeefarm[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in involveCoffeefarmItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
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
  components: {
    formCard,
    formCardButton,
    FormInputContainer,
    FormRadioContainer,
    FormSelectContainer
  },
  data: () => ({
    valid: false,
    items: 1,
    name: ['Tampolano Tahay'],
    age: [35],
    sex: ['male'],
    sexItems: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
    roleFamily: ['father'],
    educationsAttainment: ['college grad'],
    educationsAttainmentItems: [],
    contributionAmount: [20000],
    involveCoffeefarm: ['yes'],
    involveCoffeefarmItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    requiredRule: [(v) => !!v || 'invalid value'],
    numberRule: [(v) => parseInt(v)>=0 || 'invalid value'],
    tempValue: '',
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
      console.log(this.getData(), valid)
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
      if (this.items > 0) {
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
      this.name = []
      this.age = []
      this.sex = []
      this.roleFamily = []
      this.educationsAttainment = []
      this.contributionAmount = []
      this.involveCoffeefarm = []
    },
  },
  watch: {
    name() {
      console.log('edited name')
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
    this.educationsAttainmentItems = this.$store.getters['questionnaireCode/HighestEducationalAttainment']
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      const length = data.familySourceIncome.length
      if (length > 0) {
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
  },
}
</script>
