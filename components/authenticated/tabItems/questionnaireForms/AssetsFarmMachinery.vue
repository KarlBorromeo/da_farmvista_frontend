<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="i in items" :key="i">
        <v-btn icon class="formCardDeleteBtn" @click="deleteFormCard(i-1)"><v-icon class="red--text">mdi-trash-can</v-icon></v-btn>
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <form-select-container>
            <v-select
              v-model="machineName[i - 1]"
              :items="machineNameItems"
              :rules="requiredRule"
              append-icon="mdi-tractor"
              label="* Machine Items"
              dense
            ></v-select>
            <v-text-field
              v-if="machineName[i - 1] == 'others'"
              v-model="machineNameOther[i - 1]"
              :rules="requiredRule"
              label="* Specify other machinery"
            ></v-text-field>
          </form-select-container>

          <form-input-container>
            <v-text-field
              v-model="machineQuantity[i - 1]"
              :rules="numberRule"
              label="* How many currently own"
              type="number"
              min="0"
            ></v-text-field>
          </form-input-container>

          <form-radio-container
            title="Did acquire through government or programs?"
            :required="true"
          >
            <v-radio-group
              :rules="requiredRule"
              v-model="ismachineAquiredGovtProg[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in ismachineAquiredGovtProgItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="machineAge[i - 1]"
              :rules="numberRule"
              label="* age of the item"
              type="number"
              min="0"
              hint=".6 for 6 months, 1 for 1 year and so on"
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
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import FormSelectContainer from '~/components/authenticated/form/formSelectContainer.vue'
import {
  convertNumbers,
  concatinateEachIndexes,
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
} from '~/reusableFunctions/questionnaireValidation'
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
    machineName: ['tractor'],
    machineNameItems: [],
    machineNameOther: [],
    machineQuantity: [1],
    ismachineAquiredGovtProg: ['yes'],
    ismachineAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    machineAge: [0.6],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
    tempValue: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
      if (this.items == 0) {
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'AssetsFarmMachineryValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveAssetsData', {
          keyName: 'farmMachinery',
          data: this.getEmptyData(),
        })
        return
      }
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'AssetsFarmMachineryValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveAssetsData', {
          keyName: 'farmMachinery',
          data: this.getData(),
        })
      }
    },
    /* create an object that is an empty values */
    getEmptyData() {
      return {
        farmMachineryName: [],
        farmMachineryQuantity: [],
        isAcquiredGovtProgram: [],
        farmMachineryAge: [],
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        farmMachineryName: concatinateEachIndexes(
          this.machineName,
          this.machineNameOther,
          this.items
        ),
        farmMachineryQuantity: convertNumbers(this.machineQuantity),
        isAcquiredGovtProgram: this.ismachineAquiredGovtProg,
        farmMachineryAge: convertNumbers(this.machineAge),
      }
    },
    increment() {
      this.items++
    },
    resetData() {
      this.items = 0
      this.machineName = []
      this.machineNameOther = []
      this.machineQuantity = []
      this.ismachineAquiredGovtProg = []
      this.machineAge = []
    },
    /* delete the record of card existing record */
    deleteFormCard(index) {
      this.items--
      this.machineName.splice(index,1)
      this.machineNameOther.splice(index,1)
      this.machineQuantity.splice(index,1)
      this.ismachineAquiredGovtProg.splice(index,1)
      this.machineAge.splice(index,1)
    },
  },
  watch: {
    machineName() {
      this.validate()
    },
    machineNameOther() {
      this.validate()
    },
    machineQuantity() {
      this.validate()
    },
    ismachineAquiredGovtProg() {
      this.validate()
    },
    machineAge() {
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
      const length = data.farmHouseholdAsset.farmMachinery.length
      if (length > 0) {
        this.items = length
        for (let i = 0; i < length; i++) {
          this.machineName[i] = isOtherValueDefinedRadio(
            data.farmHouseholdAsset.farmMachinery[i].farmMachineryName,
            this.machineNameItems
          )
          data.farmHouseholdAsset.farmMachinery[i].farmMachineryName
          this.machineNameOther[i] = extractUnmatchedValueRadio(
            data.farmHouseholdAsset.farmMachinery[i].farmMachineryName,
            this.machineNameItems
          )
          this.machineQuantity[i] =
            data.farmHouseholdAsset.farmMachinery[i].farmMachineryQuantity
          this.ismachineAquiredGovtProg[i] =
            data.farmHouseholdAsset.farmMachinery[i].isAcquiredGovtProgram
          this.machineAge[i] =
            data.farmHouseholdAsset.farmMachinery[i].farmMachineryAge
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
