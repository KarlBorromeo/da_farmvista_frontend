<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card-button @emitIncrement="increment" @emitDecrement="decrement" />
      <form-card v-for="i in items" :key="i">
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <form-input-container>
            <v-text-field
              v-model="parcelNumber[i - 1]"
              :rules="requiredRule"
              label="* Parcel Number"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="area[i - 1]"
              :rules="numberRule"
              label="* Area (ha)"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Tenure">
            <v-radio-group v-model="tenure[i - 1]" class="pa-0 ma-0">
              <v-radio
                v-for="item in tenureItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="tenure[i - 1] == 'others'"
                v-model="tenureOther[i - 1]"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div v-if="!tenure[i - 1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Topography">
            <v-radio-group v-model="topography[i - 1]" class="pa-0 ma-0">
              <v-radio
                v-for="item in topographyItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="topography[i - 1] == 'others'"
                v-model="topographyOther[i - 1]"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div v-if="!topography[i - 1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          
          <form-radio-container title="Soil Fertility">
            <v-radio-group v-model="soilFertility[i - 1]" class="pa-0 ma-0">
              <v-radio
                v-for="item in soilFertilityItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="soilFertility[i - 1] == 'others'"
                v-model="soilFertilityOther[i - 1]"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div v-if="!soilFertility[i - 1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Cropping System">
            <v-radio-group v-model="croppingSystem[i - 1]" class="pa-0 ma-0">
              <v-radio
                v-for="item in croppingSystemItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="croppingSystem[i - 1] == 'others'"
                v-model="croppingSystemOther[i - 1]"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div v-if="!croppingSystem[i - 1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Source Water">
            <v-radio-group v-model="sourceWater[i - 1]" class="pa-0 ma-0">
              <v-radio
                v-for="item in sourceWaterItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="sourceWater[i - 1] == 'others'"
                v-model="sourceWaterOther[i - 1]"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div v-if="!sourceWater[i - 1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Land Use Status">
            <v-radio-group v-model="landUseStatus[i - 1]" class="pa-0 ma-0">
              <v-radio
                v-for="item in landUseStatusItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="landUseStatus[i - 1] == 'others'"
                v-model="landUseStatusOther[i - 1]"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div v-if="!landUseStatus[i - 1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="cropsPlanted[i - 1]"
              :rules="requiredRule"
              label="* Crops Planted (coffee,corn)"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../cards/formCard.vue'
import formCardButton from '../../cards/formCardButton.vue'
import FormInputContainer from '../../cards/formInputContainer.vue'
import FormRadioContainer from '../../cards/formRadioContainer.vue'
import FormSelectContainer from '../../cards/formSelectContainer.vue'
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
    parcelNumber: [],
    area: [],
    tenure: [],
    tenureItems: [],
    tenureOther: [],
    topography: [],
    topographyItems: [],
    topographyOther: [],
    soilFertility: [],
    soilFertilityItems: [],
    croppingSystem: [],
    croppingSystemItems: [],
    croppingSystemOther: [],
    sourceWater: [],
    sourceWaterItems: [],
    sourceWaterOther: [],
    landUseStatus: [],
    landUseStatusItems: [],
    landUseStatusOther: [],
    cropsPlanted: [],

    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) > 0 || 'invalid value',
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      const validRadio = this.validateRadio()
      if (valid && validRadio) {
        const data = this.getData()
        console.log(data)
      } else {
        alert('invalid')
      }
    },
    /* check if radio inputs are not empty */
    validateRadio() {
      for (let i = 0; i < this.items; i++) {
        if (!this.tenure[i] ||
          !this.topography[i] ||
          !this.soilFertility[i] ||
          !this.croppingSystem[i] ||
          !this.sourceWater[i] ||
          !this.landUseStatus[i] ||
          !this.cropsPlanted[i]) {
          return false
        }
      }
      return true
    },
    /* concatenate each indexes and return new array (ex: tenure, tenureOthers)*/
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
        parcel_number: this.parcelNumber,
        area: this.area,
        tenure: this.concatinateEachIndexes(this.tenure,this.tenureOther),
        topography: this.concatinateEachIndexes(this.topography,this.topographyOther),
        soil_fertility: this.soilFertility,
        cropping_system: this.concatinateEachIndexes(this.croppingSystem,this.croppingSystemOther),
        source_of_water: this.concatinateEachIndexes(this.sourceWater,this.sourceWaterOther),
        land_use_status: this.concatinateEachIndexes(this.landUseStatus,this.landUseStatusOther),
        crops_planted: this.cropsPlanted,
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--;
        this.tenure.pop();
        this.topography.pop();
        this.soilFertility.pop();
        this.croppingSystem.pop();
        this.sourceWater.pop();
        this.landUseStatus.pop();
        this.cropsPlanted.pop();
      }
    },
    increment(){
      this.items++;
    }
  },
  beforeMount() {
    this.tenureItems = this.$store.getters['questionnaireCode/Code13']
    this.topographyItems = this.$store.getters['questionnaireCode/Topography']
    this.soilFertilityItems = this.$store.getters['questionnaireCode/SoilFertility']
    this.croppingSystemItems = this.$store.getters['questionnaireCode/CroppingSystem']
    this.sourceWaterItems = this.$store.getters['questionnaireCode/Code14']
    this.landUseStatusItems = this.$store.getters['questionnaireCode/Code15']
  },
}
</script>
