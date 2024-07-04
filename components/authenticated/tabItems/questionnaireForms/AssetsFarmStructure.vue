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
              min="0"
            ></v-text-field>
          </form-input-container>

          <form-radio-container
            title="Did acquire through government or programs?"
          >
            <v-radio-group
              :rules="requiredRule"
              v-model="isstructureBldgAquiredGovtProg[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isstructureBldgAquiredGovtProgItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="structureBldgAge[i - 1]"
              :rules="numberRule"
              label="* age of the item"
              type="number"
              min="0"
              hint=".6 for 6 months, 1 for 1 year and so on"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import FormSelectContainer from '~/components/authenticated/form/formSelectContainer.vue'
import {
  concatinateEachIndexes,
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
  convertNumbers
} from '~/reusableFunctions/questionnaireValidation'
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
    structureBldgName: ['ownland'],
    structureBldgNameItems: [],
    structureBldgNameOther: [],
    structureBldgQuantity: [1],
    isstructureBldgAquiredGovtProg: ['no'],
    isstructureBldgAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    structureBldgAge: [5],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
    tempValue: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      if (this.items == 0) {
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'AssetsFarmStructureValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveAssetsData', {
          keyName: 'structureBldgLand',
          data: this.getEmptyData(),
        })
        return
      }
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'AssetsFarmStructureValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveAssetsData', {
          keyName: 'structureBldgLand',
          data: this.getData(),
        })
      }
    },
    /* create an object that is an empty values */
    getEmptyData() {
      return {
        structureBldgLandName: [],
        structureBldgLandQuantity: [],
        isAcquiredGovtProgram: [],
        structureBldgLandAge: [],
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        structureBldgLandName: concatinateEachIndexes(
          this.structureBldgName,
          this.structureBldgNameOther
        ),
        structureBldgLandQuantity: convertNumbers(this.structureBldgQuantity),
        isAcquiredGovtProgram: this.isstructureBldgAquiredGovtProg,
        structureBldgLandAge: convertNumbers(this.structureBldgAge),
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 0) {
        this.items--
        this.structureBldgName.pop()
        this.structureBldgNameOther.pop()
        this.structureBldgQuantity.pop()
        this.isstructureBldgAquiredGovtProg.pop()
        this.structureBldgAge.pop()
      }
    },
    increment() {
      this.items++
    },
    resetData() {
      this.items = 0
      this.structureBldgName = []
      this.structureBldgNameOther = []
      this.structureBldgQuantity = []
      this.isstructureBldgAquiredGovtProg = []
      this.structureBldgAge = []
    },
  },
  watch: {
    structureBldgName(value) {
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.structureBldgNameOther[index] = ''
        }
      })
    },
    structureBldgName() {
      this.validate()
    },
    structureBldgNameOther() {
      this.validate()
    },
    structureBldgQuantity() {
      this.validate()
    },
    isstructureBldgAquiredGovtProg() {
      this.validate()
    },
    structureBldgAge() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
  beforeMount() {
    this.structureBldgNameItems =
      this.$store.getters['questionnaireCode/Code5StructuresBuilding']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      const length = data.farmHouseholdAsset.structureBldgLand.length
      if (length > 0) {
        this.items = length
        for (let i = 0; i < length; i++) {
          this.structureBldgName[i] = isOtherValueDefinedRadio(
            data.farmHouseholdAsset.structureBldgLand[i].structureBldgLandName,
            this.structureBldgNameItems
          )
          this.structureBldgNameOther[i] = extractUnmatchedValueRadio(
            data.farmHouseholdAsset.structureBldgLand[i].structureBldgLandName,
            this.structureBldgNameItems
          )
          this.structureBldgQuantity[i] =
            data.farmHouseholdAsset.structureBldgLand[
              i
            ].structureBldgLandQuantity
          this.isstructureBldgAquiredGovtProg[i] =
            data.farmHouseholdAsset.structureBldgLand[i].isAcquiredGovtProgram
          this.structureBldgAge[i] =
            data.farmHouseholdAsset.structureBldgLand[i].structureBldgLandAge
        }
      } else {
        this.resetData()
      }
    } else {
      this.resetData()
    }
    this.tempValue = 'tempvalue'
  },
}
</script>
