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
          <v-col cols="12" class="py-0 my-0">
            <div class="mt-3">
              <v-select
                v-model="structureBldgName[i-1]"
                :items="structureBldgNameItems"
                menu-props="auto"
                hide-details
                label="* Items/Farm Asset"
                dense
              ></v-select>
              <v-text-field
                v-if="structureBldgName[i-1] == 'others'"
                v-model="structureBldgNameOther[i-1]"
                :rules="structureBldgNameOtherRule"
                label="* Please Specify"
              ></v-text-field>
              <p v-if="!structureBldgName[i-1]" class="red--text caption mt-1">
                This field is required!
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 pt-4 my-0">
            <v-text-field
              v-model="structureBldgQuantity[i-1]"
              :rules="requiredRule"
              label="* How many currently own"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 my-0">
            <v-radio-group v-model="isstructureBldgAquiredGovtProg[i-1]" class="pa-0 ma-0">
              <p class="pa-0 ma-0">
                * Did acquire through government or programs:
              </p>
              <v-radio
                v-for="item in isstructureBldgAquiredGovtProgItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
              <div v-if="!isstructureBldgAquiredGovtProg[i-1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="structureBldgAge[i-1]"
              :rules="requiredRule"
              label="* age of the item"
            ></v-text-field>
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
  components: { formCard },
  data: () => ({
    valid: false,
    items: 1,
    structureBldgName: [],
    structureBldgNameItems: [],
    structureBldgNameOther: [],
    structureBldgNameOtherRule: [
      (v) => !!v || 'this field is required'
    ],
    structureBldgQuantity: [],
    isstructureBldgAquiredGovtProg: [],
    isstructureBldgAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    structureBldgAge: [],
    requiredRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate();
      const radioCheckboxValid = this.validateRadioCheckbox();
      if(valid && radioCheckboxValid){
        const data = this.getData()
        console.log(data);
      }
    },
    /* check if radio inputs are not empty */
    validateRadioCheckbox(){
      for(let i=0; i<this.items; i++){
        if(!this.structureBldgName[i] || !this.isstructureBldgAquiredGovtProg[i]){
          return false
        }
      }
      return true;
    },
    /* concatenate each indexes and return new array (ex: structureBldgName, structureBldgNameOther)*/
    concatinateEachIndexes(originalList,otherList){
      const arr = [];
      for(let i=0; i<this.items; i++){
        let other = '';
        if(otherList[i]){
          other = ' '+ otherList[i]
        }
        arr.push(originalList[i] + other )
      }
      return arr;
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData(){
      return{
        structure_bldg_land_name: this.concatinateEachIndexes(this.structureBldgName,this.structureBldgNameOther),
        structure_bldg_land_quantity: this.structureBldgQuantity,
        is_acquired_govt_program: this.isstructureBldgAquiredGovtProg,
        structure_bldg_land_age: this.structureBldgAge
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--;
        this.structureBldgName.pop();
        this.structureBldgNameItems.pop();
        this.structureBldgQuantity.pop();
        this.isstructureBldgAquiredGovtProg.pop();
        this.structureBldgAge.pop();
      }
    },
  },
  beforeMount(){
    this.structureBldgNameItems = this.$store.getters['questionnaireCode/Code5StructuresBuilding']
  }
}
</script>
