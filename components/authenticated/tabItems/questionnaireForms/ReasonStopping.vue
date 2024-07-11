<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-textarea
            v-model="reason"
            :rules="requiredRule"
            label="* Reason/s for stoppping"
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
  components: {
    FormInputContainer,
  },
  data() {
    return {
      valid: false,
      reason: '',
      requiredRule: [(v) => !!v || 'this field is required'],
    }
  },
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
        const valid = this.$refs.form.validate()

        this.$store.commit('questionnaire/toggleNextTab', {
            tabName: 'ReasonStopping',
            valid,
        })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'reason',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        reason: this.reason
      }
    },
  },
  watch: {
    reason(){
        this.validate()
    }
  },
  beforeMount() {

  },
}
</script>
