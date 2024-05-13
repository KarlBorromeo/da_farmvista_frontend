<template>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <form-input-container>
            <v-textarea
              v-model="goodAgriculturalPracticeUsedCoffee"
              :rules="requiredRule"
              label="What are good agricultural practicies in planting coffee"
              required
              rows="3"
            />
          </form-input-container>
          <form-input-container>
            <v-textarea
              v-model="challengesEncounteredCoffee"
              :rules="requiredRule"
              label="what are the challenges encountered in planting coffee"
              required
              rows="3"
            />
          </form-input-container>
          <form-input-container>
            <v-textarea
              v-model="proposedInterventionCoffee"
              :rules="requiredRule"
              label="What proposed intervention can be developed for planting coffee"
              required
              rows="3"
            />
          </form-input-container>
        </v-row>
      </v-container>
      <v-btn @click="validate">Validate</v-btn>
    </v-form>
  </template>
  
  <script>
  import FormCheckboxContainer from '../../cards/formCheckboxContainer.vue'
  import FormInputContainer from '../../cards/formInputContainer.vue'
  import FormRadioContainer from '../../cards/formRadioContainer.vue'
  export default {
    components: {
      FormCheckboxContainer,
      FormInputContainer,
      FormRadioContainer,
    },
    data(){
      return {
        valid: false,
        goodAgriculturalPracticeUsedCoffee: '',
        challengesEncounteredCoffee: '',
        proposedInterventionCoffee: '',
        requiredRule: [(v) => !!v || 'This field is required' ],
      }
    },
    methods: {
      /* test if the form is valid, return boolean */
      validate() {
        const valid = this.$refs.form.validate()
        if (valid) {
          const data = this.getData()
          console.log('data: ',data)
        }
      },
      /* get the data and convert it into expected key/value formats in BackEnd */
      getData() {
        return {
          goodAgriculturalPracticeUsedCoffee: this.goodAgriculturalPracticeUsedCoffee,
          challengesEncounteredCoffee: this.challengesEncounteredCoffee,
          proposedInterventionCoffee: this.proposedInterventionCoffee
        }
      },
    }
  }
  </script>
  