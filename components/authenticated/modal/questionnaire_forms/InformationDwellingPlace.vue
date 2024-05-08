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
          ></v-text-field>
        </form-input-container>

        <form-radio-container title="House Ownership">
          <v-radio-group v-model="houseOwernship" class="ma-0">
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
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!houseOwernship" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </form-radio-container>

        <form-input-container>
          <v-text-field
            v-model="numberRooms"
            :rules="numberRules"
            label="* Number of rooms"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-radio-container title="Materials Roof Made">
          <v-radio-group v-model="typeRoofMade" class="ma-0">
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
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!typeRoofMade" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Materials Wall Made">
          <v-radio-group v-model="typeWallMade" class="ma-0">
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
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!typeWallMade" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Kind toilet facility">
          <v-radio-group v-model="kindToilet" class="ma-0">
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
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!kindToilet" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Kind lighting facility">
          <v-radio-group v-model="lightingFacility" class="ma-0">
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
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!lightingFacility" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Source cooking fuel">
          <v-radio-group v-model="sourceCooking" class="ma-0">
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
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!sourceCooking" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </form-radio-container>

        <form-radio-container title="Drinking water supply">
          <v-radio-group v-model="sourceWaterDrink" class="ma-0">
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
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!sourceWaterDrink" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </form-radio-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormInputContainer from '../../cards/formInputContainer.vue'
import FormRadioContainer from '../../cards/formRadioContainer.vue'
export default {
  components: { FormInputContainer, FormRadioContainer },
  data: () => ({
    valid: false,
    items: 1,
    yearsResidence: '',
    houseOwernship: '',
    houseOwernshipItems: [],
    houseOwernshipOther: '',
    numberRooms: '',
    typeRoofMade: '',
    typeRoofMadeItems: [],
    typeRoofMadeOther: '',
    typeWallMade: '',
    typeWallMadeItems: [],
    typeWallMadeOther: '',
    kindToilet: '',
    kindToiletItems: [],
    kindToiletOther: '',
    lightingFacility: '',
    lightingFacilityItems: [],
    lightingFacilityOther: '',
    sourceCooking: '',
    sourceCookingItems: [],
    sourceCookingOther: '',
    sourceWaterDrink: '',
    sourceWaterDrinkItems: [],
    sourceWaterDrinkOther: '',
    numberRules: [
      (v) => !!v || 'this field is required',
      (v) => parseInt(v) > 0 || 'invalid value',
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
        if (
          !this.houseOwernship ||
          !this.typeRoofMade ||
          !this.typeWallMade ||
          !this.kindToilet ||
          !this.lightingFacility ||
          !this.sourceCooking ||
          !this.sourceWaterDrink
        ) {
          return false
        }
      }
      return true
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        number_year: this.yearsResidence,
        house_ownerhsip: this.concatinateValues(
          this.houseOwernship,
          this.houseOwernshipOther
        ),
        number_of_rooms: this.numberRooms,
        roof_materials_made: this.concatinateValues(
          this.typeRoofMade,
          this.typeRoofMadeOther
        ),
        walls_materials_made: this.concatinateValues(
          this.typeWallMade,
          this.typeWallMadeOther
        ),
        kind_toilet_facilty: this.concatinateValues(
          this.kindToilet,
          this.kindToiletOther
        ),
        kind_lighting_facility: this.concatinateValues(
          this.lightingFacility,
          this.lightingFacilityOther
        ),
        source_cooking_fuel: this.concatinateValues(
          this.sourceCooking,
          this.sourceCookingOther
        ),
        source_drinking_supply: this.concatinateValues(
          this.sourceWaterDrink,
          this.sourceWaterDrinkOther
        ),
      }
    },
    /* concatenate two value holders for field that has others (ex: kindToilet, kindToiletOthers)*/
    concatinateValues(original, other) {
      let text = original
      if (!!other) {
        text += ' ' + other
      }
      return text
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
  },
}
</script>
