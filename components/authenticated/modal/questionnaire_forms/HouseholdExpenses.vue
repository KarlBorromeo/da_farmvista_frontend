<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
        <v-row>  
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="food"
                    :rules="requiredRule"
                    label="* Food in a week"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="clothing"
                    :rules="requiredRule"
                    label="* Clothing in a year"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="utilities"
                    :rules="requiredRule"
                    label="* Utilities in a month"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="householdFacilities"
                    :rules="requiredRule"
                    label="* Household Facilities in a year"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="nonFoodItems"
                    :rules="requiredRule"
                    label="* Non-Food Items in a month"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="healthExpenses"
                    :rules="requiredRule"
                    label="* Health Expenses in a year"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="transportation"
                    :rules="requiredRule"
                    label="* Transportation in a month"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="communication"
                    :rules="requiredRule"
                    label="* Communication in a month"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="recreation"
                    :rules="requiredRule"
                    label="* Recreation in a month"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="education"
                    :rules="requiredRule"
                    label="* Education in a semester"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="specialOccasions"
                    :rules="requiredRule"
                    label="* Special Occasions in a year"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="otherExpenses"
                    :rules="otherExpensesRule"
                    label="* Other expenses in a week"
                ></v-text-field>
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
    food: '',
    clothing: '',
    utilities: '',
    householdFacilities: '',
    nonFoodItems: '',
    healthExpenses: '',
    transportation: '',
    communication: '',
    recreation: '',
    education: '',
    specialOccasions: '',
    otherExpenses: '',
    otherExpensesRule: [ (v) => !!v || 'This field is required, put n/a if none' ],
    requiredRule: [
        (v) => !!v || 'This field is required',
        (v) => v >= 0 || 'invalid value'
    ],
  }),
  methods:{
    /* test if the form is valid, return boolean */
    validate(){
      console.log('validated: ',this.$refs.form.validate());
    },
  },
}
</script>
