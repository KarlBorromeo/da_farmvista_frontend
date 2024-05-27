<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-text-field
            v-model="food"
            :rules="numberRule"
            label="* Food in a week"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="clothing"
            :rules="numberRule"
            label="* Clothing in a year"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="utilities"
            :rules="numberRule"
            label="* Utilities in a month"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="householdFacilities"
            :rules="numberRule"
            label="* Household Facilities in a year"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="nonFoodItems"
            :rules="numberRule"
            label="* Non-Food Items in a month"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="healthExpenses"
            :rules="numberRule"
            label="* Health Expenses in a year"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="transportation"
            :rules="numberRule"
            label="* Transportation in a month"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="communication"
            :rules="numberRule"
            label="* Communication in a month"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="recreation"
            :rules="numberRule"
            label="* Recreation in a month"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="education"
            :rules="numberRule"
            label="* Education in a semester"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="specialOccasions"
            :rules="numberRule"
            label="* Special Occasions in a year"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="otherExpenses"
            :rules="numberRule"
            label="* Other expenses in a week"
            type="number"
          ></v-text-field>
        </form-input-container>
        <form-input-container>
          <v-text-field
            v-model="otherExpensesSpecify"
            :rules="requiredRule"
            label="* Other expenses Specify:"
            hint="specify the other item name"
          ></v-text-field>
        </form-input-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import { convertNumbers } from '~/reusableFunctions/questionnaireValidation'
export default {
  components: { FormInputContainer },
  data: () => ({
    valid: false,
    food: 100,
    clothing: 100,
    utilities: 100,
    householdFacilities: 100,
    nonFoodItems: 100,
    healthExpenses: 100,
    transportation: 100,
    communication: 100,
    recreation: 100,
    education: 100,
    specialOccasions: 100,
    otherExpenses: 100,
    otherExpensesSpecify: 'sample other',
    numberRule: [
      (v) => parseInt(v) >= 0 || 'invalid value',
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'HouseholdExpensesValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'householdExpense',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        food: convertNumbers(this.food),
        clothing: convertNumbers(this.clothing),
        utilities: convertNumbers(this.utilities),
        household: convertNumbers(this.householdFacilities),
        nonFoodItems: convertNumbers(this.nonFoodItems),
        healthExpenses: convertNumbers(this.healthExpenses),
        transportation: convertNumbers(this.transportation),
        communication: convertNumbers(this.communication),
        recreation: convertNumbers(this.recreation),
        education: convertNumbers(this.education),
        specialOccasions: convertNumbers(this.specialOccasions),
        others: convertNumbers(this.otherExpenses),
        otherSpecified: this.otherExpensesSpecify,
      }
    },
  },
  watch: {
    food() {
      this.validate()
    },
    clothing() {
      this.validate()
    },
    utilities() {
      this.validate()
    },
    householdFacilities() {
      this.validate()
    },
    nonFoodItems() {
      this.validate()
    },
    healthExpenses() {
      this.validate()
    },
    transportation() {
      this.validate()
    },
    communication() {
      this.validate()
    },
    recreation() {
      this.validate()
    },
    education() {
      this.validate()
    },
    specialOccasions() {
      this.validate()
    },
    otherExpenses() {
      this.validate()
    },
    otherExpensesSpecify() {
      this.validate()
    },
  },
  beforeMount() {
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.food = data.householdExpense.food
      this.clothing = data.householdExpense.clothing
      this.utilities = data.householdExpense.utilities
      this.householdFacilities = data.householdExpense.household
      this.nonFoodItems = data.householdExpense.nonFoodItems
      this.healthExpenses = data.householdExpense.healthExpenses
      this.transportation = data.householdExpense.transportation
      this.communication = data.householdExpense.communication
      this.recreation = data.householdExpense.recreation
      this.education = data.householdExpense.education
      this.specialOccasions = data.householdExpense.specialOccasions
      this.otherExpenses = data.householdExpense.others
      this.otherExpensesSpecify = data.householdExpense.otherSpecified
    } else {
      this.food = 0
      this.clothing = 0
      this.utilities = 0
      this.householdFacilities = 0
      this.nonFoodItems = 0
      this.healthExpenses = 0
      this.transportation = 0
      this.communication = 0
      this.recreation = 0
      this.education = 0
      this.specialOccasions = 0
      this.otherExpenses = 0
    }
  },
}
</script>
