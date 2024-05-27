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
              v-model="toolName[i - 1]"
              :items="toolNameItems"
              :rules="requiredRule"
              append-icon="mdi-tools"
              label="* Tool Items"
              dense
            ></v-select>
          </form-select-container>

          <form-input-container>
            <v-text-field
              v-model="toolQuantity[i - 1]"
              :rules="numberRule"
              label="* How many currently own"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container
            title="Did acquire through government or programs"
          >
            <v-radio-group
              :rules="requiredRule"
              v-model="isToolAquiredGovtProg[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isToolAquiredGovtProgItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="toolAge[i - 1]"
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
import { convertNumbers } from '~/reusableFunctions/questionnaireValidation'
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
    toolName: ['hand hoe', 'watering can'],
    toolNameItems: [],
    toolQuantity: [2, 4],
    isToolAquiredGovtProg: ['no', 'no'],
    isToolAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    toolAge: [1, 1],
    numberRule: [
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
          tabName: 'AssetsFarmToolsValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveAssetsData', {
          keyName: 'farmTool',
          data: this.getEmptyData(),
        })
        return
      }
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'AssetsFarmToolsValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveAssetsData', {
          keyName: 'farmTool',
          data: this.getData(),
        })
      }
    },
    /* create an object that is an empty values */
    getEmptyData() {
      return {
        farmtoolName: [],
        farmtoolQuantity: [],
        isAcquiredGovtProgram: [],
        farmtoolAge: [],
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        farmtoolName: this.toolName,
        farmtoolQuantity: convertNumbers(this.toolQuantity),
        isAcquiredGovtProgram: this.isToolAquiredGovtProg,
        farmtoolAge: convertNumbers(this.toolAge)
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 0) {
        this.items--
        this.toolName.pop()
        this.toolQuantity.pop()
        this.isToolAquiredGovtProg.pop()
        this.toolAge.pop()
      }
    },
    increment() {
      this.items++
    },
    resetData() {
      this.items = 0
      this.toolName = []
      this.toolQuantity = []
      this.isToolAquiredGovtProg = []
      this.toolAge = []
    },
  },
  watch: {
    toolName() {
      this.validate()
    },
    toolQuantity() {
      this.validate()
    },
    isToolAquiredGovtProg() {
      this.validate()
    },
    toolAge() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
  beforeMount() {
    this.toolNameItems =
      this.$store.getters['questionnaireCode/Code5FarmImplementsTools']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      const length = data.farmHouseholdAsset.farmTool.length
      if (length > 0) {
        this.items = length
        for (let i = 0; i < length; i++) {
          this.toolName[i] = data.farmHouseholdAsset.farmTool[i].farmtoolName
          this.toolQuantity[i] =
            data.farmHouseholdAsset.farmTool[i].farmtoolQuantity
          this.isToolAquiredGovtProg[i] =
            data.farmHouseholdAsset.farmTool[i].isAcquiredGovtProgram
          this.toolAge[i] = data.farmHouseholdAsset.farmTool[i].farmtoolAge
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
