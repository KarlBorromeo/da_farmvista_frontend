<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-textarea
            v-model="goodAgriculturalPracticeUsedCoffee"
            :rules="requiredRule"
            label="* What are good agricultural practicies in planting coffee"
            required
            rows="3"
          />
        </form-input-container>
        <form-input-container>
          <v-textarea
            v-model="challengesEncounteredCoffee"
            :rules="requiredRule"
            label="* What are the challenges encountered in planting coffee"
            required
            rows="3"
          />
        </form-input-container>
        <form-input-container>
          <v-textarea
            v-model="proposedInterventionCoffee"
            :rules="requiredRule"
            label="* What proposed intervention can be developed for planting coffee"
            required
            rows="3"
          />
        </form-input-container>
      </v-row>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
export default {
  activated(){
    this.validate()
  },
  components: {
    FormInputContainer,
  },
  data() {
    return {
      valid: false,
      goodAgriculturalPracticeUsedCoffee: ' sample open ended questions essay',
      challengesEncounteredCoffee: ' sample open ended questions essay',
      proposedInterventionCoffee: ' sample open ended questions essay',
      requiredRule: [(v) => !!v || 'This field is required'],
    }
  },
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'OpenEndedQuestionsValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'openEndedQuestion',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        goodAgriculturalPracticeUsedCoffee:
          this.goodAgriculturalPracticeUsedCoffee,
        challengesEncounteredCoffee: this.challengesEncounteredCoffee,
        proposedInterventionCoffee: this.proposedInterventionCoffee,
      }
    },
  },
  watch: {
    goodAgriculturalPracticeUsedCoffee() {
      this.validate()
    },
    challengesEncounteredCoffee() {
      this.validate()
    },
    proposedInterventionCoffee() {
      this.validate()
    },
  },
  beforeMount() {
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.goodAgriculturalPracticeUsedCoffee =
        data.openEndedQuestion.goodAgriculturalPracticeUsedCoffee
      this.proposedInterventionCoffee =
        data.openEndedQuestion.proposedInterventionCoffee
      this.challengesEncounteredCoffee =
        data.openEndedQuestion.challengesEncounteredCoffee
    } else {
      this.goodAgriculturalPracticeUsedCoffee = ''
      this.proposedInterventionCoffee = ''
      this.challengesEncounteredCoffee = ''
    }
  },
}
</script>
