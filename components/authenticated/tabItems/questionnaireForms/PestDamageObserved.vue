<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="i in items" :key="i">
        <v-btn icon class="formCardDeleteBtn" @click="deleteFormCard(i-1)"><v-icon class="red--text">mdi-trash-can</v-icon></v-btn>
        <v-row class="pb-3">
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="pestDiseaseDamagesPlants[i - 1]"
              :items="pestDiseaseDamagesPlantsItems"
              :rules="requiredRule"
              label="* Pest and Diseases Damage in Plants"
              dense
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="stageOccurence[i - 1]"
              :items="stageOccurenceItems"
              :rules="requiredRule"
              label="* Stage of Occurence"
              dense
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="management[i - 1]"
              :items="managementItems"
              :rules="requiredRule"
              label="* Management"
              dense
            ></v-select>
            <v-text-field
              v-if="management[i - 1] == 'others'"
              v-model="managementOther[i - 1]"
              :rules="requiredRule"
              label="Please Specify"
              class="my-0 py-0 pt-1"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="perceivedEffectiveness[i - 1]"
              :items="perceivedEffectivenessItems"
              :rules="requiredRule"
              label="* Perceived Effectiveness"
              dense
            ></v-select>
          </v-col>
        </v-row>
      </form-card>
      <form-card-button @emitIncrement="increment" />
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import {
  concatinateEachIndexes,
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
} from '~/reusableFunctions/questionnaireValidation'
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import FormSelectContainer from '../../form/formSelectContainer.vue'
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
    pestDiseaseDamagesPlants: ['fruit borer'],
    pestDiseaseDamagesPlantsItems: [],
    stageOccurence: ['fruiting'],
    stageOccurenceItems: [],
    management: ['chemical'],
    managementItems: [],
    managementOther: [],
    perceivedEffectiveness: ['highly effective'],
    perceivedEffectivenessItems: [],
    requiredRule: [(v) => !!v || 'This field is required'],
    tempValue: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
      if (this.items == 0) {
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'PestDamageObservedValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveData', {
          keyName: 'pestDamageObserved',
          data: this.getEmptyData(),
        })
        return
      }
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'PestDamageObservedValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'pestDamageObserved',
          data: this.getData(),
        })
      }
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
    getEmptyData() {
      return {
        pestsDiseasesPlants: [],
        stageOccurrence: [],
        management: [],
        perceivedEffectiveness: [],
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        pestsDiseasesPlants: this.pestDiseaseDamagesPlants,
        stageOccurrence: this.stageOccurence,
        management: concatinateEachIndexes(
          this.management,
          this.managementOther,
          this.items
        ),
        perceivedEffectiveness: this.perceivedEffectiveness,
      }
    },
    /* delete the record of card existing record */
    deleteFormCard(index) {
      this.items--
      this.pestDiseaseDamagesPlants.splice(index,1)
      this.stageOccurence.splice(index,1)
      this.management.splice(index,1)
      this.managementOther.splice(index,1)
      this.perceivedEffectiveness.splice(index,1)
    },
    increment() {
      this.items++
    },
    resetData() {
      this.items = 0
      this.pestDiseaseDamagesPlants = []
      this.stageOccurence = []
      this.management = []
      this.managementOther = []
      this.perceivedEffectiveness = []
    },
  },
  beforeMount() {
    this.pestDiseaseDamagesPlantsItems =
      this.$store.getters['questionnaireCode/Code23']
    this.stageOccurenceItems = this.$store.getters['questionnaireCode/Code24']
    this.managementItems = this.$store.getters['questionnaireCode/Code25']
    this.perceivedEffectivenessItems =
      this.$store.getters['questionnaireCode/Code26']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      const length = data.pestDamageObserved.length
      if (length > 0) {
        this.items = length
        for (let i = 0; i < length; i++) {
          this.pestDiseaseDamagesPlants[i] =
            data.pestDamageObserved[i].pestsDiseasesPlants
          this.stageOccurence[i] = data.pestDamageObserved[i].stageOccurrence
          this.management[i] = isOtherValueDefinedRadio(
            data.pestDamageObserved[i].management,
            this.managementItems
          )
          this.managementOther[i] = extractUnmatchedValueRadio(
            data.pestDamageObserved[i].management,
            this.managementItems
          )
          this.perceivedEffectiveness[i] =
            data.pestDamageObserved[i].perceivedEffectiveness
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
    management(value) {
      this.validate()
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.managementOther[index] = ''
        }
      })
    },
    pestDiseaseDamagesPlants() {
      this.validate()
    },
    stageOccurence() {
      this.validate()
    },
    management() {
      this.validate()
    },
    managementOther() {
      this.validate()
    },
    perceivedEffectiveness() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
}
</script>
