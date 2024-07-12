<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-text-field
            v-model="contactNumber"
            :rules="contactNumberRule"
            label="Farmer's Phone Number"
            counter="11"
            maxlength="11"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="farmerCode"
            label="Farmer's Code Number"
          ></v-text-field>
        </form-input-container>
      </v-row>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formInputContainer from '~/components/authenticated/form/formInputContainer.vue'
export default {
  components: { formInputContainer },
  activated(){
    this.validate()
  },
  data: () => ({
    valid: false,
    contactNumber: '',
    farmerCode: '',
    contactNumberRule: [
      (v) => {
        if (v) {
          if (v.length == 11 && v[0] == '0' && v[1] == '9') {
            return true
          } else {
            return 'must be (09123456789) format'
          }
        } else {
          return true
        }
      },
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'BasicInformationValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'profile',
          data: this.getData(),
        })
      }
    },
    getData() {
      return {
        contactNumber: this.contactNumber,
        farmerCode: this.farmerCode ? this.farmerCode : '',
      }
    },
  },
  watch: {
    contactNumber() {
      this.validate()
    },
    farmerCode() {
      this.validate()
    },
  },
  beforeMount() {
    const data = this.$store.getters['profiling/selectedRecord']

    if (Object.keys(data).length > 0) {
      this.contactNumber = data.profile.contactNumber
      this.farmerCode = data.profile.farmerCode
    } else {
      this.contactNumber = ''
      this.farmerCode = ''
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'BasicInformationValidated',
        valid:true,
      })
      this.$store.commit('questionnaire/saveData', {
        keyName: 'profile',
        data: this.getData(),
      })
    }
  },
}
</script>
