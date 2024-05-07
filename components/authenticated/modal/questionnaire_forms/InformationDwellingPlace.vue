<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" class="pt-3 pb-5 my-0">
          <v-text-field
            v-model="yearsResidence"
            :rules="yearsResidenceRule"
            label="* years resided in current residence"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="pa-0 ma-0">* House Ownership:</p>
          <v-radio-group v-model="houseOwernship" class="ma-0">
            <v-radio
              v-for="item in houseOwernshipItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <v-text-field
              v-if="houseOwernship === 'other'"
              v-model="houseOwernshipOther"
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!houseOwernship" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="pa-0 ma-0">* Materials roof made:</p>
          <v-radio-group v-model="typeRoofMade" class="ma-0">
            <v-radio
              v-for="item in typeRoofMadeItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!typeRoofMade" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="pa-0 ma-0">* Materials wall made:</p>
          <v-radio-group v-model="typeWallMade" class="ma-0">
            <v-radio
              v-for="item in typeWallMadeItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <div v-if="!typeWallMade" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="pa-0 ma-0">* Kind toilet facility:</p>
          <v-radio-group v-model="kindToilet" class="ma-0">
            <v-radio
              v-for="item in kindToiletItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <v-text-field
              v-if="kindToilet === 'other'"
              v-model="kindToiletOther"
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!kindToilet" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="pa-0 ma-0">* Kind lighting facility:</p>
          <v-radio-group v-model="lightingFacility" class="ma-0">
            <v-radio
              v-for="item in lightingFacilityItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <v-text-field
              v-if="lightingFacility === 'other'"
              v-model="lightingFacilityOther"
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!lightingFacility" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="pa-0 ma-0">* Source cooking fuel:</p>
          <v-radio-group v-model="sourceCooking" class="ma-0">
            <v-radio
              v-for="item in sourceCookingItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <v-text-field
              v-if="sourceCooking === 'other'"
              v-model="sourceCookingOther"
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!sourceCooking" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="pa-0 ma-0">* Drinking water supply:</p>
          <v-radio-group v-model="sourceWaterDrink" class="ma-0">
            <v-radio
              v-for="item in sourceWaterDrinkItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></v-radio>
            <v-text-field
              v-if="sourceWaterDrink === 'other'"
              v-model="sourceWaterDrinkOther"
              label="Other:"
              class="my-0 py-0 pt-1"
            ></v-text-field>
            <div v-if="!sourceWaterDrink" class="red--text caption">
              You must select an option!
            </div>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../cards/formCard.vue'
export default {
  components: { formCard },
  data: () => ({
    valid: false,
    items: 1,
    yearsResidence: '',
    yearsResidenceRule: [
      (v) => !!v || 'this field is required',
      (v) => parseInt(v) > 0 || 'invalid value',
    ],
    houseOwernship: '',
    houseOwernshipOther: '',
    houseOwernshipItems: [
      { label: 'Own House1', value: 'own house1' },
      { label: 'Own House2', value: 'own house2' },
      { label: 'Other', value: 'other' },
    ],
    numberRooms: '',
    typeRoofMade: '',
    typeRoofMadeItems: [
      { label: 'type roof made1', value: 'type roof made1' },
      { label: 'type roof made2', value: 'type roof made2' },
      { label: 'type roof made3', value: 'type roof made3' },
      { label: 'type roof made4', value: 'type roof made4' },
    ],
    typeWallMade: '',
    typeWallMadeItems: [
      { label: 'type wall made1', value: 'type wall made1' },
      { label: 'type wall made2', value: 'type wall made2' },
      { label: 'type wall made3', value: 'type wall made3' },
      { label: 'type wall made4', value: 'type wall made4' },
    ],
    kindToilet: '',
    kindToiletOther: '',
    kindToiletItems: [
      { label: 'kind toilet1', value: 'kind toilet1' },
      { label: 'kind toilet2', value: 'kind toilet2' },
      { label: 'Other', value: 'other' },
    ],
    lightingFacility: '',
    lightingFacilityOther: '',
    lightingFacilityItems: [
      { label: 'lighting facility1', value: 'lighting facility1' },
      { label: 'lighting facility2', value: 'lighting facility2' },
      { label: 'Other', value: 'other' },
    ],
    sourceCooking: '',
    sourceCookingOther: '',
    sourceCookingItems: [
      { label: 'source cooking1', value: 'source cooking1' },
      { label: 'source cooking2', value: 'source cooking2' },
      { label: 'Other', value: 'other' },
    ],
    sourceWaterDrink: '',
    sourceWaterDrinkOther: '',
    sourceWaterDrinkItems: [
      { label: 'water drinking1', value: 'water drinking1' },
      { label: 'water drinking2', value: 'water drinking2' },
      { label: 'Other', value: 'other' },
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      console.log('validated: ', this.$refs.form.validate())
    },
  },
}
</script>
