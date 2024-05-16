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
              v-model="poultryLivestockName[i - 1]"
              :items="poultryLivestockNameItems"
              :rules="requiredRule"
              append-icon="mdi-cow"
              label="* Livestock/Poultry Items"
              dense
            ></v-select>
          </form-select-container>

          <form-input-container>
            <v-text-field
              v-model="poultryLivestockQuantity[i - 1]"
              :rules="numberRule"
              label="* How many currently own"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container
            title="Did acquire through government or programs?"
          >
            <v-radio-group
              :rules="requiredRule"
              v-model="ispoultryLivestockAquiredGovtProg[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in ispoultryLivestockAquiredGovtProgItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="poultryLivestockAge[i - 1]"
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
    poultryLivestockName: [],
    poultryLivestockNameItems: [],
    poultryLivestockQuantity: [],
    ispoultryLivestockAquiredGovtProg: [],
    ispoultryLivestockAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    poultryLivestockAge: [],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab',{tabName: 'AssetsFarmPoultryLivestockValidated',valid});
      if(valid){
        this.$store.commit('questionnaire/saveAssetsData',{keyName: 'poultryLivestock',data: this.getData()})
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        poultryLivestockName: this.poultryLivestockName,
        poultryLivestockQuantity: this.poultryLivestockQuantity,
        isAcquiredGovtProgram: this.ispoultryLivestockAquiredGovtProg,
        poultryLivestockAge: this.poultryLivestockAge,
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--
        this.poultryLivestockName.pop()
        this.poultryLivestockQuantity.pop()
        this.ispoultryLivestockAquiredGovtProg.pop()
        this.poultryLivestockAge.pop()
      }
    },
    increment() {
      this.items++
    },
  },
  beforeMount() {
    this.poultryLivestockNameItems =
      this.$store.getters['questionnaireCode/Code5PoultryAndLivestock']
  },
  watch: {
    poultryLivestockName(){
      this.validate()
    },
poultryLivestockQuantity(){
  this.validate()
},
ispoultryLivestockAquiredGovtProg(){
  this.validate()
},
poultryLivestockAge(){
  this.validate()
},
  }
}
</script>
