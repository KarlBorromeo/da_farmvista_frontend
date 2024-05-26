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
              min="0"
              hint=".6 for 6 months, 1 for 1 year and so on"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import FormSelectContainer from '~/components/authenticated/form/formSelectContainer.vue'

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
    items: 2,
    poultryLivestockName: ['carabao', 'cow'],
    poultryLivestockNameItems: [],
    poultryLivestockQuantity: [4, 2],
    ispoultryLivestockAquiredGovtProg: ['no', 'no'],
    ispoultryLivestockAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    poultryLivestockAge: [3, 2],
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
          tabName: 'AssetsFarmPoultryLivestockValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveAssetsData', {
          keyName: 'poultryLivestock',
          data: this.getEmptyData(),
        })
        return
      }
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'AssetsFarmPoultryLivestockValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveAssetsData', {
          keyName: 'poultryLivestock',
          data: this.getData(),
        })
      }
    },
    /* create an object that is an empty values */
    getEmptyData() {
      return {
        poultryLivestockName: [],
        poultryLivestockQuantity: [],
        isAcquiredGovtProgram: [],
        poultryLivestockAge: [],
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
      if (this.items > 0) {
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
    resetData() {
      this.items = 0
      this.poultryLivestockName = []
      this.poultryLivestockQuantity = []
      this.ispoultryLivestockAquiredGovtProg = []
      this.poultryLivestockAge = []
    },
  },
  watch: {
    poultryLivestockName() {
      this.validate()
    },
    poultryLivestockQuantity() {
      this.validate()
    },
    ispoultryLivestockAquiredGovtProg() {
      this.validate()
    },
    poultryLivestockAge() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
  beforeMount() {
    this.poultryLivestockNameItems =
      this.$store.getters['questionnaireCode/Code5PoultryAndLivestock']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      const length = data.farmHouseholdAsset.poultryLivestock.length
      if (length > 0) {
        this.items = length
        for (let i = 0; i < length; i++) {
          this.poultryLivestockName[i] =
            data.farmHouseholdAsset.poultryLivestock[i].poultryLivestockName
          this.poultryLivestockQuantity[i] =
            data.farmHouseholdAsset.poultryLivestock[i].poultryLivestockQuantity
          this.ispoultryLivestockAquiredGovtProg[i] =
            data.farmHouseholdAsset.poultryLivestock[i].isAcquiredGovtProgram
          this.poultryLivestockAge[i] =
            data.farmHouseholdAsset.poultryLivestock[i].poultryLivestockAge
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
