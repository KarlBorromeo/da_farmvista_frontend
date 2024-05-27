<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-text-field
            v-model="surename"
            :rules="requiredRules"
            label="* Farmer's Surename"
            required
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="firstname"
            :rules="requiredRules"
            label="* Farmer's Firstname"
            required
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="middleInitial"
            label="Farmer's Middle Initial"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="contactNumber"
            :rules="contactNumberRule"
            label="Farmer's Phone Number"
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
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formInputContainer from '~/components/authenticated/form/formInputContainer.vue'
export default {
  components: { formInputContainer },
  data: () => ({
    valid: false,
    surename: 'a',
    firstname: 'a',
    requiredRules: [(v) => !!v || 'This field is required'],
    middleInitial: 'a',
    contactNumber: '09277494592',
    farmerCode: '00004ZuIp',
    contactNumberRule: [
      (v) => {
        if(v){
          if(v.length == 11 && v[0] == '0' && v[1] == '9'){
            return true
          }else{
            return 'must be (09123456789) format'
          }
        }else{
          return true
        }
      }
    ]
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      const valid = this.$refs.form.validate()
      console.log('validated', valid)
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
        lastName: this.surename,
        firstName: this.firstname,
        middleInitial: this.middleInitial,
        contactNumber: this.contactNumber,
        farmerCode: this.farmerCode,
      }
    },
  },
  watch: {
    surename() {
      this.validate()
    },
    firstname() {
      this.validate()
    },
    middleInitial() {
      this.validate()
    },
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
      this.firstname = data.profile.firstName
      this.surename = data.profile.lastName
      this.middleInitial = data.profile.middleInitial
      this.contactNumber = data.profile.contactNumber
      this.farmerCode = data.profile.farmerCode
    } else {
      this.firstname = ''
      this.surename = ''
      this.middleInitial = ''
      this.contactNumber = ''
      this.farmerCode = ''
    }
  },
}
</script>
