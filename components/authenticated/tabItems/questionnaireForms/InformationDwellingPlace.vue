<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-text-field
            v-model="yearsResidence"
            :rules="numberRules"
            label="* years resided in current residence"
            type="number"
            min="0"
          ></v-text-field>
        </form-input-container>

        <form-radio-container title="House Ownership" :required="true">
          <v-radio-group
            :rules="requiredRule"
            v-model="houseOwernship"
            class="ma-0"
          >
            <v-radio
              v-for="item in houseOwernshipItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
            <v-text-field
              v-if="houseOwernship === 'others'"
              v-model="houseOwernshipOther"
              :rules="requiredRule"
              label="* Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
          </v-radio-group>
        </form-radio-container>

        <form-input-container>
          <v-text-field
            v-model="numberRooms"
            :rules="numberRules"
            label="* Number of rooms"
            type="number"
            min="0"
          ></v-text-field>
        </form-input-container>

        <form-radio-container title="Materials Roof Made" :required="true">
          <v-radio-group
            :rules="requiredRule"
            v-model="typeRoofMade"
            class="ma-0"
          >
            <v-radio
              v-for="item in typeRoofMadeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
            <v-text-field
              v-if="typeRoofMade === 'others'"
              v-model="typeRoofMadeOther"
              :rules="requiredRule"
              label="* Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Materials Wall Made" :required="true">
          <v-radio-group
            :rules="requiredRule"
            v-model="typeWallMade"
            class="ma-0"
          >
            <v-radio
              v-for="item in typeWallMadeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
            <v-text-field
              v-if="typeWallMade === 'others'"
              v-model="typeWallMadeOther"
              :rules="requiredRule"
              label="* Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Kind toilet facility" :required="true">
          <v-radio-group
            :rules="requiredRule"
            v-model="kindToilet"
            class="ma-0"
          >
            <v-radio
              v-for="item in kindToiletItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
            <v-text-field
              v-if="kindToilet === 'others'"
              v-model="kindToiletOther"
              :rules="requiredRule"
              label="* Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Kind lighting facility" :required="true">
          <v-radio-group
            :rules="requiredRule"
            v-model="lightingFacility"
            class="ma-0"
          >
            <v-radio
              v-for="item in lightingFacilityItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
            <v-text-field
              v-if="lightingFacility === 'others'"
              v-model="lightingFacilityOther"
              :rules="requiredRule"
              label="* Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Source cooking fuel" :required="true">
          <v-radio-group
            :rules="requiredRule"
            v-model="sourceCooking"
            class="ma-0"
          >
            <v-radio
              v-for="item in sourceCookingItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
            <v-text-field
              v-if="sourceCooking === 'others'"
              v-model="sourceCookingOther"
              :rules="requiredRule"
              label="* Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Drinking water supply" :required="true">
          <v-radio-group
            :rules="requiredRule"
            v-model="sourceWaterDrink"
            class="ma-0"
          >
            <v-radio
              v-for="item in sourceWaterDrinkItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
            <v-text-field
              v-if="sourceWaterDrink === 'others'"
              v-model="sourceWaterDrinkOther"
              :rules="requiredRule"
              label="* Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
          </v-radio-group>
        </form-radio-container>
      </v-row>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import {
  concatinateOtherValueToString,
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
} from '~/reusableFunctions/questionnaireValidation'
export default {
  activated(){
    this.validate()
  },
  components: { FormInputContainer, FormRadioContainer },
  data: () => ({
    valid: false,
    items: 1,
    yearsResidence: '35',
    houseOwernship: 'own or owner-like possession of house and lot',
    houseOwernshipItems: [],
    houseOwernshipOther: '',
    numberRooms: '2',
    typeRoofMade: 'strong materials',
    typeRoofMadeItems: [],
    typeRoofMadeOther: '',
    typeWallMade: 'light materials',
    typeWallMadeItems: [],
    typeWallMadeOther: '',
    kindToilet: 'none',
    kindToiletItems: [],
    kindToiletOther: '',
    lightingFacility: 'kerosene lamp',
    lightingFacilityItems: [],
    lightingFacilityOther: '',
    sourceCooking: 'collected firewood',
    sourceCookingItems: [],
    sourceCookingOther: '',
    sourceWaterDrink: 'spring',
    sourceWaterDrinkItems: [],
    sourceWaterDrinkOther: '',
    numberRules: [(v) => parseInt(v) >= 0 || 'invalid value'],
    requiredRule: [(v) => !!v || 'This field is required'],
    tempValue: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'InformationDwellingPlaceValidated',
        valid,
      })
      if (valid) {
        const obj = { numberYear: parseFloat(this.yearsResidence) }
        this.$store.commit('questionnaire/saveData', {
          keyName: 'yearCurrentResidence',
          data: obj,
        })
        this.$store.commit('questionnaire/saveData', {
          keyName: 'detailDwellingPlace',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        houseOwnership: concatinateOtherValueToString(
          this.houseOwernship,
          this.houseOwernshipOther
        ),
        numberOfRooms: parseInt(this.numberRooms),
        roofMaterialsMade: concatinateOtherValueToString(
          this.typeRoofMade,
          this.typeRoofMadeOther
        ),
        wallsMaterialsMade: concatinateOtherValueToString(
          this.typeWallMade,
          this.typeWallMadeOther
        ),
        kindToiletFacility: concatinateOtherValueToString(
          this.kindToilet,
          this.kindToiletOther
        ),
        kindLightingFacility: concatinateOtherValueToString(
          this.lightingFacility,
          this.lightingFacilityOther
        ),
        sourceCookingFuel: concatinateOtherValueToString(
          this.sourceCooking,
          this.sourceCookingOther
        ),
        sourceDrinkingSupply: concatinateOtherValueToString(
          this.sourceWaterDrink,
          this.sourceWaterDrinkOther
        ),
      }
    },
  },
  beforeMount() {
    this.houseOwernshipItems = this.$store.getters['questionnaireCode/Code6']
    this.typeRoofMadeItems = this.$store.getters['questionnaireCode/Code7_8']
    this.typeWallMadeItems = this.$store.getters['questionnaireCode/Code7_8']
    this.kindToiletItems = this.$store.getters['questionnaireCode/Code9']
    this.lightingFacilityItems = this.$store.getters['questionnaireCode/Code10']
    this.sourceCookingItems = this.$store.getters['questionnaireCode/Code11']
    this.sourceWaterDrinkItems = this.$store.getters['questionnaireCode/Code12']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.yearsResidence = data.yearCurrentResidence.numberYear
      this.houseOwernship = isOtherValueDefinedRadio(
        data.detailDwellingPlace.houseOwnership,
        this.houseOwernshipItems
      )
      this.houseOwernshipOther = extractUnmatchedValueRadio(
        data.detailDwellingPlace.houseOwnership,
        this.houseOwernshipItems
      )
      this.numberRooms = data.detailDwellingPlace.numberOfRooms
      this.typeRoofMade = isOtherValueDefinedRadio(
        data.detailDwellingPlace.roofMaterialsMade,
        this.typeRoofMadeItems
      )
      this.typeRoofMadeOther = extractUnmatchedValueRadio(
        data.detailDwellingPlace.roofMaterialsMade,
        this.typeRoofMadeItems
      )
      this.typeWallMade = isOtherValueDefinedRadio(
        data.detailDwellingPlace.wallsMaterialsMade,
        this.typeWallMadeItems
      )
      this.typeWallMadeOther = extractUnmatchedValueRadio(
        data.detailDwellingPlace.wallsMaterialsMade,
        this.typeWallMadeItems
      )
      this.kindToilet = isOtherValueDefinedRadio(
        data.detailDwellingPlace.kindToiletFacility,
        this.kindToiletItems
      )
      this.kindToiletOther = extractUnmatchedValueRadio(
        data.detailDwellingPlace.kindToiletFacility,
        this.kindToiletItems
      )
      this.lightingFacility = isOtherValueDefinedRadio(
        data.detailDwellingPlace.kindLightingFacility,
        this.lightingFacilityItems
      )
      this.lightingFacilityOther = extractUnmatchedValueRadio(
        data.detailDwellingPlace.kindLightingFacility,
        this.lightingFacilityItems
      )
      this.sourceCooking = isOtherValueDefinedRadio(
        data.detailDwellingPlace.sourceCookingFuel,
        this.sourceCookingItems
      )
      this.sourceCookingOther = extractUnmatchedValueRadio(
        data.detailDwellingPlace.sourceCookingFuel,
        this.sourceCookingItems
      )
      this.sourceWaterDrink = isOtherValueDefinedRadio(
        data.detailDwellingPlace.sourceDrinkingSupply,
        this.sourceWaterDrinkItems
      )
      this.sourceWaterDrinkOther = extractUnmatchedValueRadio(
        data.detailDwellingPlace.sourceDrinkingSupply,
        this.sourceWaterDrinkItems
      )
    } else {
      this.yearsResidence = ''
      this.houseOwernship = ''
      this.houseOwernshipOther = ''
      this.numberRooms = ''
      this.typeRoofMade = ''
      this.typeRoofMadeOther = ''
      this.typeWallMade = ''
      this.typeWallMadeOther = ''
      this.kindToilet = ''
      this.kindToiletOther = ''
      this.lightingFacility = ''
      this.lightingFacilityOther = ''
      this.sourceCooking = ''
      this.sourceCookingOther = ''
      this.sourceWaterDrink = ''
      this.sourceWaterDrinkOther = ''
    }
    this.tempValue = 'tempValue'
  },
  watch: {
    houseOwernship(value) {
      this.validate()
      if (value !== 'others') {
        this.houseOwernshipOther = ''
      }
    },
    typeRoofMade(value) {
      this.validate()
      if (value !== 'others') {
        this.typeRoofMadeOther = ''
      }
    },
    typeWallMade(value) {
      this.validate()
      if (value !== 'others') {
        this.typeWallMadeOther = ''
      }
    },
    kindToilet(value) {
      this.validate()
      if (value !== 'others') {
        this.kindToiletOther = ''
      }
    },
    lightingFacility(value) {
      this.validate()
      if (value !== 'others') {
        this.lightingFacilityOther = ''
      }
    },
    sourceCooking(value) {
      this.validate()
      if (value !== 'others') {
        this.sourceCookingOther = ''
      }
    },
    sourceWaterDrink(value) {
      this.validate()
      if (value !== 'others') {
        this.sourceWaterDrinkOther = ''
      }
    },
    houseOwernshipOther() {
      this.validate()
    },
    numberRooms() {
      this.validate()
    },
    typeRoofMadeOther() {
      this.validate()
    },
    typeWallMadeOther() {
      this.validate()
    },
    kindToiletOther() {
      this.validate()
    },
    lightingFacilityOther() {
      this.validate()
    },
    sourceCookingOther() {
      this.validate()
    },

    sourceWaterDrinkOther() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
}
</script>
