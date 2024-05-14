<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card-button @emitIncrement="increment" @emitDecrement="decrement" />
      <form-card v-for="i in items" :key="i">
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <form-select-container>
              <v-select
                v-model="structureBldgName[i - 1]"
                :items="structureBldgNameItems"
                :rules="requiredRule"
                append-icon="mdi-barn"
                label="* Structure Items"
                class="pb-0 mb-0"
              ></v-select>
              <v-text-field
                v-if="structureBldgName[i - 1] == 'others'"
                v-model="structureBldgNameOther[i - 1]"
                :rules="requiredRule"
                label="* Others Please Specify"
                class="my-0 py-0"
              ></v-text-field>
          </form-select-container>

          <form-input-container>
            <v-text-field
              v-model="structureBldgQuantity[i - 1]"
              :rules="numberRule"
              label="* How many currently own"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container
            title="Did acquire through government or programs?"
          >
              <v-text-field
                v-model="isstructureBldgAquiredGovtProg[i - 1]"
                :rules="requiredRule"
                required
                class="hiddenRequiredField"
            /> 
            <v-radio-group
              v-model="isstructureBldgAquiredGovtProg[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isstructureBldgAquiredGovtProgItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
              <div
                v-if="!isstructureBldgAquiredGovtProg[i - 1]"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="structureBldgAge[i - 1]"
              :rules="numberRule"
              label="* age of the item"
              type="number"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../form/formCard.vue'
import formCardButton from '../../form/formCardButton.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
import FormSelectContainer from '../../form/formSelectContainer.vue'
export default {
  components: {
    formCard,
    formCardButton,
    FormInputContainer,
    FormRadioContainer,
    FormSelectContainer,
  },
  data: () => ({
    valid: false,
    items: 1,
    structureBldgName: [],
    structureBldgNameItems: [],
    structureBldgNameOther: [],
    structureBldgQuantity: [],
    isstructureBldgAquiredGovtProg: [],
    isstructureBldgAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    structureBldgAge: [],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
    requiredRule: [ (v) => !!v || 'This field is required' ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      console.log(valid);
    },
    /* concatenate each indexes and return new array (ex: structureBldgName, structureBldgNameOther)*/
    concatinateEachIndexes(originalList, otherList) {
      const arr = []
      for (let i = 0; i < this.items; i++) {
        let other = ''
        if (otherList[i]) {
          other = ' ' + otherList[i]
        }
        arr.push(originalList[i] + other)
      }
      return arr
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        structureBldgLandName: this.concatinateEachIndexes(
          this.structureBldgName,
          this.structureBldgNameOther
        ),
      structureBldgLandQuantity: this.structureBldgQuantity,
      isAcquiredGovtProgram: this.isstructureBldgAquiredGovtProg,
      structureBldgLandAge: this.structureBldgAge,

      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--
        this.structureBldgName.pop()
        this.structureBldgQuantity.pop()
        this.isstructureBldgAquiredGovtProg.pop()
        this.structureBldgAge.pop()
      }
    },
    increment() {
      this.items++
    },
  },
  beforeMount() {
    this.structureBldgNameItems =
      this.$store.getters['questionnaireCode/Code5StructuresBuilding']
  },
  watch:{
    structureBldgName(value){
      value.forEach((element,index) => {
        if(element !== 'others'){
          this.structureBldgNameOther[index] = '';
        }
      });
    },
  }
}
</script>
