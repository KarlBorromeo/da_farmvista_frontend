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
import FormInputContainer from '../../form/formInputContainer.vue'
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
      (v) => !!v || 'This field is required',
      (v) => v >= 0 || 'invalid value',
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
        food: this.food,
        clothing: this.clothing,
        utilities: this.utilities,
        household: this.householdFacilities,
        nonFoodItems: this.nonFoodItems,
        healthExpenses: this.healthExpenses,
        transportation: this.transportation,
        communication: this.communication,
        recreation: this.recreation,
        education: this.education,
        specialOccasions: this.specialOccasions,
        others: this.otherExpenses,
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
}
</script>
