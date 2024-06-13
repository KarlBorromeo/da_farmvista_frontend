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
              v-model="cropsGrown[i - 1]"
              :rules="specialCharactersRule"
              label="* Crops grown in the area"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="kindsWasteProduced[i - 1]"
              :rules="requiredRule"
              label="* Kinds of waste produced"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="volumeWaste[i - 1]"
              :rules="numberRule"
              label="* Volume of Waste(kg)"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Utilized?">
            <v-radio-group
              :rules="requiredRule"
              v-model="isUtilized[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isUtilizedItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
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
import { extractUnmatchedValueCheck, convertNumbers } from '~/reusableFunctions/questionnaireValidation'
export default {
  components: {
    formCard,
    formCardButton,
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    items: 1,
    cropsGrown: ['coffee', 'banana'],
    kindsWasteProduced: ['branch', 'leaves'],
    volumeWaste: [2, 1],
    isUtilized: ['yes', 'yes'],
    isUtilizedItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
    specialCharactersRule: [
      (v) => !!v || 'This field is required',
      (v) => {
        const regex = /^[a-zA-Z0-9,\/]*$/
        if (regex.test(v)) {
          return true
        }
        return 'Special characters are not allowed except comma and slash'
      },
    ],
    tempValue: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      if (this.items == 0) {
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'FarmWasteManagementValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveData', {
          keyName: 'farmWasteManagement',
          data: this.getEmptyData(),
        })
        return
      }
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'FarmWasteManagementValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'farmWasteManagement',
          data: this.getData(),
        })
      }
    },
    /* create an object that is an empty values */
    getEmptyData() {
      return {
        cropsGrown: [],
        kindWasteProduced: [],
        volumeWasteKg: [],
        isUtilized: [],
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        cropsGrown: this.cropsGrown,
        kindWasteProduced: this.kindsWasteProduced,
        volumeWasteKg: convertNumbers(this.volumeWaste),
        isUtilized: this.isUtilized,
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 0) {
        this.items--
        this.cropsGrown.pop()
        this.kindsWasteProduced.pop()
        this.volumeWaste.pop()
        this.isUtilized.pop()
      }
    },
    increment() {
      this.items++
    },
    resetData() {
      this.items = 0
      this.cropsGrown = []
      this.kindsWasteProduced = []
      this.volumeWaste = []
      this.isUtilized = []
    },
  },
  watch: {
    cropsGrown() {
      this.validate()
    },
    kindsWasteProduced() {
      this.validate()
    },
    volumeWaste() {
      this.validate()
    },
    isUtilized() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
  beforeMount() {
    this.machineNameItems =
      this.$store.getters['questionnaireCode/Code5FarmMachinery']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      const length = data.farmWasteManagement.length
      if (length > 0) {
        this.items = length
        for (let i = 0; i < length; i++) {
          this.cropsGrown[i] = extractUnmatchedValueCheck(
            data.farmWasteManagement[i].cropsGrown,
            []
          )
          this.kindsWasteProduced[i] = extractUnmatchedValueCheck(
            data.farmWasteManagement[i].kindWasteProduced,
            []
          )
          this.volumeWaste[i] = data.farmWasteManagement[i].volumeWasteKg
          this.isUtilized[i] = data.farmWasteManagement[i].isUtilized
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
