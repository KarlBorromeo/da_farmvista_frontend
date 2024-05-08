<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row class="mb-1 pa-4">
        <v-col cols="12" md="6" class="d-flex pa-0 ma-0 mb-2">
          <v-btn block small color="success" @click="items += 1"
            >Add <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="12" md="6" class="d-flex pa-0 ma-0">
          <v-btn
            block
            small
            color="warning"
            @click="decrement"
            class="black--text"
            >Remove last item <v-icon>mdi-minus</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <form-card
        v-for="i in items"
        :key="i"
      >
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="name[i-1]"
              :rules="requiredRule"
              label="* Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="age[i-1]"
              :rules="requiredRule"
              label="* Age"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 my-0">
            <v-radio-group v-model="sex[i-1]" class="pa-0 ma-0">
              <p class="pa-0 ma-0">* Sex:</p>
              <v-radio
                v-for="item in sexItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
              <div v-if="!sex[i-1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="roleFamily[i-1]"
              :rules="requiredRule"
              label="* Role in the family"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="educationsAttainment[i-1]"
              :rules="requiredRule"
              label="* Educational Attainment"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="contributionAmount[i-1]"
              :rules="requiredRule"
              label="* Contributiong (PHP) income/month"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 my-0">
            <v-radio-group v-model="involveCoffeefarm[i-1]" class="pa-0 ma-0">
              <p class="pa-0 ma-0">* Involved in coffee farm:</p>
              <v-radio
                v-for="item in involveCoffeefarmItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
              <div v-if="!involveCoffeefarm[i-1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </v-col>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../cards/formCard.vue'
export default {
  components:{ formCard },
  data: () => ({
    valid: false,
    items: 1,
    name: [],
    age: [],
    sex: [],
    sexItems: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
    roleFamily: [],
    educationsAttainment: [],
    contributionAmount: [],
    involveCoffeefarm: [],
    involveCoffeefarmItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate();
      const radioValid = this.validateRadio();
      if(valid && radioValid){
        const data = this.getData()
        console.log(data);
      }else{
        alert('invalid')
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData(){
      return{
        full_name: this.name,
        age: this.age,
        sex: this.sex,
        role_in_family: this.roleFamily,
        education_attainment: this.educationsAttainment,
        estimated_contribution: this.contributionAmount,
        is_involved_cofeeFarm: this.involveCoffeefarm,
      }
    },
    /* check if radio inputs are not empty */
    validateRadio(){
      for(let i=0; i<this.items; i++){
        if(!this.name[i] || 
          !this.age[i] || 
          !this.sex[i] || 
          !this.roleFamily[i] ||
          !this.educationsAttainment[i] ||
          !this.contributionAmount[i] ||
          !this.involveCoffeefarm[i]
        ){
          return false
        }  
      }
      return true;
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--;
        this.name.pop();
        this.age.pop();
        this.sex.pop();
        this.roleFamily.pop();
        this.educationsAttainment.pop();
        this.contributionAmount.pop();
        this.involveCoffeefarm.pop();
      }
    },
  },
}
</script>
