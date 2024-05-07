<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="pb-0">
          <v-text-field
            v-model="surename"
            :rules="requiredRules"
            label="* Farmer's Surename"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="pb-0">
          <v-text-field
            v-model="firstname"
            :rules="requiredRules"
            label="* Farmer's Firstname"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="pb-0">
          <v-text-field
            v-model="middileInnitial"
            :rules="middleInitialRules"
            label="* Farmer's Middle Initial"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="pb-0">
          <v-text-field
            v-model="constactNumber"
            :rules="constactNumberRules"
            label="* Farmer's Phone Number"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="pb-0">
          <v-text-field
            v-model="farmerCode"
            label="Farmer's Code Number"
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
    surename: '',
    firstname: '',
    requiredRules: [
      (v) => !!v || 'This field is required'
    ], 
    middleInitial:'',
    middleInitialRules:[,
      (v) => {
        if(v){
            if(v.length==1){
              return true
            } 
            return 'Must be 1 characters or fewer'
        }
        return 'This field is required'
      },
    ],
    constactNumber:'',
    constactNumberRules: [
       (v) => {
        if(v){
            if(v.length==11 && v[0]=='0' && v[1]=='9'){
              return true
            }
            return 'Invalid Phone Number'
        }
        return 'This field is required'
      },
    ],
    farmerCode: '',
  }),
  methods:{
    /* test if the form is valid, return boolean */
    validate() {
      console.log('validated: ',this.$refs.form.validate());
    },
  }
}
</script>
