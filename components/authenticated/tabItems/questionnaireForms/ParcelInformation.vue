<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="i in items" :key="i">
        <v-btn icon class="formCardDeleteBtn" @click="deleteFormCard(i-1)"><v-icon class="red--text">mdi-trash-can</v-icon></v-btn>
        <v-row>
          <v-col cols="12" class="mb-0 pb-0"> </v-col>
          <form-input-container>
            <v-text-field
              v-model="parcelNumber[i - 1]"
              :rules="requiredRule"
              label="* Parcel Number"
              :disabled="true"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="area[i - 1]"
              :rules="numberRule"
              label="* Area (ha)"
              type="number"
              min="0"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Tenure" :required="true">
            <v-radio-group
              :rules="requiredRule"
              v-model="tenure[i - 1]"
              class="pa-0 ma-0"
            >
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
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Topography" :required="true">
            <v-radio-group
              :rules="requiredRule"
              v-model="topography[i - 1]"
              class="pa-0 ma-0"
            >
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
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Soil Fertility" :required="true">
            <v-radio-group
              :rules="requiredRule"
              v-model="soilFertility[i - 1]"
              class="pa-0 ma-0"
            >
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
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Cropping System" :required="true">
            <v-radio-group
              :rules="requiredRule"
              v-model="croppingSystem[i - 1]"
              class="pa-0 ma-0"
            >
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
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Source Water" :required="true">
            <v-radio-group
              :rules="requiredRule"
              v-model="sourceWater[i - 1]"
              class="pa-0 ma-0"
            >
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
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Land Use Status" :required="true">
            <v-radio-group
              :rules="requiredRule"
              v-model="landUseStatus[i - 1]"
              class="pa-0 ma-0"
            >
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
            </v-radio-group>
          </form-radio-container>

          <form-input-container class="mt-2">
            <v-text-field
              v-model="cropsPlanted[i - 1]"
              :rules="regexRule"
              label="* Crops Planted (coffee,corn)"
              hint="Separate with comma ' , ' if multiple crops"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
      <form-card-button @emitIncrement="increment"/>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import {
  concatinateEachIndexes,
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
  convertNumbers,
} from '~/reusableFunctions/questionnaireValidation'
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import FormSelectContainer from '~/components/authenticated/form/formSelectContainer.vue'
export default {
  activated(){
    this.validate()
  },
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
    tenure: ['land owner'],
    tenureItems: [],
    tenureOther: [],
    topography: ['hilly/rolling'],
    topographyItems: [],
    topographyOther: [],
    soilFertility: ['moderate'],
    soilFertilityItems: [],
    croppingSystem: ['others'],
    croppingSystemItems: [],
    croppingSystemOther: ['secret kasayod palang mo'],
    sourceWater: ['deep wells'],
    sourceWaterItems: [],
    sourceWaterOther: [],
    landUseStatus: ['cultivated'],
    landUseStatusItems: [],
    landUseStatusOther: [],
    cropsPlanted: ['coffee,banana, coconut'],

    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) > 0 || 'invalid value',
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
    regexRule: [
      (v) => {
        if (!v) {
          return 'This field is required'
        }
        const regex =
          /^[a-zA-Z0-9,\/ ]*(?![!@#$%^&*()_+={}[\]:;"'<>,.?~`\\|]).$/
        if (regex.test(v)) {
          const arrayVal = v.split(',')
          for (let i = 0; i < arrayVal.length; i++) {
            let val = arrayVal[i]
            let counter = 0
            for (let j = 0; j < arrayVal.length; j++) {
              if (arrayVal[j] === val) {
                counter++
              }
            }
            if (counter > 1) {
              return 'duplicated inputs not allowed'
            }
          }
          return true
        }
        return 'Strictly need to follow the format separated with comma if multiple values'
      },
    ],
    tempValue: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
      if (this.items == 0) {
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'ParcelInformationValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveData', {
          keyName: 'parcelInfo',
          data: this.getEmptyData(),
        })
        this.$store.commit('questionnaire/saveParcelInfo',{
            parcelNumbers: [],
            cropsPlanted: []
        })
        return
      }
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'ParcelInformationValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'parcelInfo',
          data: this.getData(),
        })
        this.$store.commit('questionnaire/saveParcelInfo',{
            parcelNumbers: [...this.parcelNumber],
            cropsPlanted: [...this.cropsPlanted]
        })
      }
    },
    /* create an object that is an empty values */
    getEmptyData() {
      return {
        parcelNumber: [],
        area: [],
        tenure: [],
        topography: [],
        soilFertility: [],
        croppingSystem: [],
        sourceOfWater: [],
        landUseStatus: [],
        cropsPlanted: [],
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        parcelNumber: this.parcelNumber,
        area: convertNumbers(this.area),
        tenure: concatinateEachIndexes(this.tenure, this.tenureOther),
        topography: concatinateEachIndexes(
          this.topography,
          this.topographyOther
        ),
        soilFertility: this.soilFertility,
        croppingSystem: concatinateEachIndexes(
          this.croppingSystem,
          this.croppingSystemOther
        ),
        sourceOfWater: concatinateEachIndexes(
          this.sourceWater,
          this.sourceWaterOther
        ),
        landUseStatus: concatinateEachIndexes(
          this.landUseStatus,
          this.landUseStatusOther
        ),
        cropsPlanted: this.cropsPlanted,
      }
    },
     /* delete the record of card existing record */
     deleteFormCard(index) {
      this.items--
      this.parcelNumber.splice(index,1)
      this.area.splice(index,1)
      this.tenure.splice(index,1)
      this.topography.splice(index,1)
      this.soilFertility.splice(index,1)
      this.croppingSystem.splice(index,1)
      this.sourceWater.splice(index,1)
      this.landUseStatus.splice(index,1)
      this.cropsPlanted.splice(index,1)
      this.tenureOther.splice(index,1)
      this.topographyOther.splice(index,1)
      this.croppingSystemOther.splice(index,1)
      this.sourceWaterOther.splice(index,1)
      this.landUseStatusOther.splice(index,1)
    },
    increment() {
      this.items++
    },
    resetData() {
      this.items = 0
      this.parcelNumber = []
      this.area = []
      this.tenure = []
      this.topography = []
      this.soilFertility = []
      this.croppingSystem = []
      this.sourceWater = []
      this.landUseStatus = []
      this.cropsPlanted = []
      this.tenureOther = []
      this.topographyOther = []
      this.croppingSystemOther = []
      this.sourceWaterOther = []
      this.landUseStatusOther = []
    },
  },
  beforeMount() {
    this.tenureItems = this.$store.getters['questionnaireCode/Code13']
    this.topographyItems = this.$store.getters['questionnaireCode/Topography']
    this.soilFertilityItems =
      this.$store.getters['questionnaireCode/SoilFertility']
    this.croppingSystemItems =
      this.$store.getters['questionnaireCode/CroppingSystem']
    this.sourceWaterItems = this.$store.getters['questionnaireCode/Code14']
    this.landUseStatusItems = this.$store.getters['questionnaireCode/Code15']
    const isEditing = this.$store.getters['profiling/isEditingMode']
    if (isEditing) {
      const data = this.$store.getters['profiling/selectedRecord']
      const length = data.parcelInfo.length
      if (length > 0) {
        this.items = length
        for (let i = 0; i < length; i++) {
          // this.parcelNumber[i] = data.parcelInfo[i].parcelNumber
          this.area[i] = data.parcelInfo[i].area
          this.tenure[i] = isOtherValueDefinedRadio(
              data.parcelInfo[i].tenure,
              this.tenureItems
            )
          this.tenureOther[i] = extractUnmatchedValueRadio(
            data.parcelInfo[i].tenure,
            this.tenureItems
          )
          this.topography[i] = isOtherValueDefinedRadio(
            data.parcelInfo[i].topography,
            this.topographyItems
          )
          this.topographyOther[i] = extractUnmatchedValueRadio(
            data.parcelInfo[i].topography,
            this.topographyItems
          )
          this.soilFertility[i] = data.parcelInfo[i].soilFertility
          this.croppingSystem[i] = isOtherValueDefinedRadio(
            data.parcelInfo[i].croppingSystem,
            this.croppingSystemItems
          )
          this.croppingSystemOther[i] = extractUnmatchedValueRadio(
            data.parcelInfo[i].croppingSystem,
            this.croppingSystemItems
          )
          this.sourceWater[i] = isOtherValueDefinedRadio(
            data.parcelInfo[i].sourceOfWater,
            this.sourceWaterItems
          )
          this.sourceWaterOther[i] = extractUnmatchedValueRadio(
            data.parcelInfo[i].sourceOfWater,
            this.sourceWaterItems
          )
          this.landUseStatus[i] = isOtherValueDefinedRadio(
            data.parcelInfo[i].landUseStatus,
            this.landUseStatusItems
          )
          this.landUseStatusOther[i] = extractUnmatchedValueRadio(
            data.parcelInfo[i].landUseStatus,
            this.landUseStatusItems
          )
          this.cropsPlanted[i] = data.parcelInfo[i].cropsPlanted
        }
      } else {
        this.resetData()
      }
    } else {
      this.resetData()
    }
    this.tempValue = 'tempvalue'
  },
  watch: {
    tenure(value) {
      this.validate()
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.tenureOther[index] = ''
        }
      })
    },
    topography(value) {
      this.validate()
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.topographyOther[index] = ''
        }
      })
    },
    croppingSystem(value) {
      this.validate()
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.croppingSystemOther[index] = ''
        }
      })
    },
    sourceWater(value) {
      this.validate()
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.sourceWaterOther[index] = ''
        }
      })
    },
    landUseStatus(value) {
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.landUseStatusOther[index] = ''
        }
      })
    },
    parcelNumber() {
      this.validate()
    },
    area() {
      this.validate()
    },
    tenureOther() {
      this.validate()
    },
    topographyOther() {
      this.validate()
    },
    soilFertility() {
      this.validate()
    },
    croppingSystemOther() {
      this.validate()
    },
    sourceWaterOther() {
      this.validate()
    },
    landUseStatusOther() {
      this.validate()
    },
    cropsPlanted() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
    items(value) {
      let arr = []
      for (let i = 1; i <= value; i++) {
        arr.push(i)
      }
      this.parcelNumber = arr
    },
  },
}
</script>
