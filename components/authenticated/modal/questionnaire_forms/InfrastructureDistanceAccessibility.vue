<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Farm to nearest road</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="farmToNearestRoad.qty"
              :rules="numberRule"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToNearestRoad.unit"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToNearestRoad.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToNearestRoad.dominantTransportation == 'others'"
                v-model="farmToNearestRoad.dominantTransportationOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToNearestRoad.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToNearestRoad.dominantRoad == 'others'"
                v-model="farmToNearestRoad.dominantRoadOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>

      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Farm to residence</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="farmToResidence.qty"
              :rules="numberRule"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToResidence.unit"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToResidence.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToResidence.dominantTransportation == 'others'"
                v-model="farmToResidence.dominantTransportationOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToResidence.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToResidence.dominantRoad == 'others'"
                v-model="farmToResidence.dominantRoadOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>

      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Farm to output market</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="farmToMarket.qty"
              :rules="numberRule"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToMarket.unit"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToMarket.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToMarket.dominantTransportation == 'others'"
                v-model="farmToMarket.dominantTransportationOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToMarket.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToMarket.dominantRoad == 'others'"
                v-model="farmToMarket.dominantRoadOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>

      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Residence to output market</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="residenceToMarket.qty"
              :rules="numberRule"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group
              :rules="requiredRule"
              v-model="residenceToMarket.unit"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
              :rules="requiredRule"
              v-model="residenceToMarket.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="residenceToMarket.dominantTransportation == 'others'"
                v-model="residenceToMarket.dominantTransportationOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              :rules="requiredRule"
              v-model="residenceToMarket.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="residenceToMarket.dominantRoad == 'others'"
                v-model="residenceToMarket.dominantRoadOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>

      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Farm to inputs supply</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="farmToInputSupply.qty"
              :rules="numberRule"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToInputSupply.unit"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToInputSupply.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToInputSupply.dominantTransportation == 'others'"
                v-model="farmToInputSupply.dominantTransportationOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              :rules="requiredRule"
              v-model="farmToInputSupply.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToInputSupply.dominantRoad == 'others'"
                v-model="farmToInputSupply.dominantRoadOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>

      <form-card>
        <p class="my-2 pb-0 font-weight-medium">Residence to inputs supply</p>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="residenceToInputSupply.qty"
              :rules="numberRule"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group
              :rules="requiredRule"
              v-model="residenceToInputSupply.unit"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
              :rules="requiredRule"
              v-model="residenceToInputSupply.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="residenceToInputSupply.dominantTransportation == 'others'"
                v-model="residenceToInputSupply.dominantTransportationOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              :rules="requiredRule"
              v-model="residenceToInputSupply.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="residenceToInputSupply.dominantRoad == 'others'"
                v-model="residenceToInputSupply.dominantRoadOther"
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../form/formCard.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
import { concatinateOtherValueToString } from '~/reusableFunctions/questionnaireValidation'
export default {
  components: {
    formCard,
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    farmToNearestRoad: {
      qty: 1,
      unit: 'meter',
      dominantTransportation: 'walk',
      dominantTransportationOther: '',
      dominantRoad: 'dirt road',
      dominantRoadOther: '',
    },
    farmToResidence: {
      qty: 1,
      unit: 'meter',
      dominantTransportation: 'walk',
      dominantTransportationOther: '',
      dominantRoad: 'dirt road',
      dominantRoadOther: '',
    },
    farmToMarket: {
      qty: 1,
      unit: 'meter',
      dominantTransportation: 'walk',
      dominantTransportationOther: '',
      dominantRoad: 'dirt road',
      dominantRoadOther: '',
    },
    residenceToMarket: {
      qty: 1,
      unit: 'meter',
      dominantTransportation: 'walk',
      dominantTransportationOther: '',
      dominantRoad: 'dirt road',
      dominantRoadOther: '',
    },
    farmToInputSupply: {
      qty: 1,
      unit: 'meter',
      dominantTransportation: 'walk',
      dominantTransportationOther: '',
      dominantRoad: 'dirt road',
      dominantRoadOther: '',
    },
    residenceToInputSupply: {
      qty: 1,
      unit: 'meter',
      dominantTransportation: 'walk',
      dominantTransportationOther: '',
      dominantRoad: 'dirt road',
      dominantRoadOther: '',
    },
    unitItems: [],
    transportationItems: [],
    roadItems: [],
    requiredRule: [(v) => !!v || 'This field is required'],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab',{tabName: 'InfrastructureDistanceAccessibilityValidated',valid});
      if(valid){
        this.$store.commit('questionnaire/saveData',{keyName: 'infraDistanceAccessibility',data: this.getData()})
      }
    },
    /* concatenate two value holders for field that has others (ex: variable, variableOther)*/
    concatinateValues(original, other) {
      let text = original
      if (!!other) {
        text += ' ' + other
      }
      return text
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        farmToNearestRoad: {
          distanceQty: this.farmToNearestRoad.qty,
          distanceUnit: this.farmToNearestRoad.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.farmToNearestRoad.dominantTransportation,
            this.farmToNearestRoad.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.farmToNearestRoad.dominantRoad,
            this.farmToNearestRoad.dominantRoadOther
          ),
        },
        farmToResidence: {
          distanceQty: this.farmToResidence.qty,
          distanceUnit: this.farmToResidence.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.farmToResidence.dominantTransportation,
            this.farmToResidence.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.farmToResidence.dominantRoad,
            this.farmToResidence.dominantRoadOther
          ),
        },
        farmToOutputMarket: {
          distanceQty: this.farmToMarket.qty,
          distanceUnit: this.farmToMarket.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.farmToMarket.dominantTransportation,
            this.farmToMarket.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.farmToMarket.dominantRoad,
            this.farmToMarket.dominantRoadOther
          ),
        },
        residenceToOutputMarket: {
          distanceQty: this.residenceToMarket.qty,
          distanceUnit: this.residenceToMarket.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.residenceToMarket.dominantTransportation,
            this.residenceToMarket.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.residenceToMarket.dominantRoad,
            this.residenceToMarket.dominantRoadOther
          ),
        },
        farmToInputsSupply: {
          distanceQty: this.farmToInputSupply.qty,
          distanceUnit: this.farmToInputSupply.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.farmToInputSupply.dominantTransportation,
            this.farmToInputSupply.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.farmToInputSupply.dominantRoad,
            this.farmToInputSupply.dominantRoadOther
          ),
        },
        residenceToInputsSupply: {
          distanceQty: this.residenceToInputSupply.qty,
          distanceUnit: this.residenceToInputSupply.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.residenceToInputSupply.dominantTransportation,
            this.residenceToInputSupply.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.residenceToInputSupply.dominantRoad,
            this.residenceToInputSupply.dominantRoadOther
          ),
        },
      }
    },
  },
  beforeMount() {
    this.unitItems = this.$store.getters['questionnaireCode/Code17']
    this.transportationItems = this.$store.getters['questionnaireCode/Code18']
    this.roadItems = this.$store.getters['questionnaireCode/Code19']
  },
  watch: {
    'farmToNearestRoad': {
      handler: function(){
        this.validate()
      },
      deep: true
    },
    'farmToResidence': {
      handler: function(){
        this.validate()
      },
      deep: true
    },
    'farmToMarket': {
      handler: function(){
        this.validate()
      },
      deep: true
    },
    'residenceToMarket': {
      handler: function(){
        this.validate()
      },
      deep: true
    },
    'farmToInputSupply': {
      handler: function(){
        this.validate()
      },
      deep: true
    },
    'residenceToInputSupply': {
      handler: function(){
        this.validate()
      },
      deep: true
    },
    'farmToNearestRoad.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.farmToNearestRoad.dominantTransportationOther = ''
      }
    },
    'farmToNearestRoad.dominantRoad': function (value) {
      if (value !== 'others') {
        this.farmToNearestRoad.dominantRoadOther = ''
      }
    },
    'farmToResidence.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.farmToResidence.dominantTransportationOther = ''
      }
    },
    'farmToResidence.dominantRoad': function (value) {
      if (value !== 'others') {
        this.farmToResidence.dominantRoadOther = ''
      }
    },
    'farmToMarket.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.farmToMarket.dominantTransportationOther = ''
      }
    },
    'farmToMarket.dominantRoad': function (value) {
      if (value !== 'others') {
        this.farmToMarket.dominantRoadOther = ''
      }
    },
    'residenceToMarket.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.residenceToMarket.dominantTransportationOther = ''
      }
    },
    'residenceToMarket.dominantRoad': function (value) {
      if (value !== 'others') {
        this.residenceToMarket.dominantRoadOther = ''
      }
    },
    'farmToInputSupply.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.farmToInputSupply.dominantTransportationOther = ''
      }
    },
    'farmToInputSupply.dominantRoad': function (value) {
      if (value !== 'others') {
        this.residenceToInputSupply.dominantTransportationOther = ''
      }
    },
    'residenceToInputSupply.dominantRoad': function (value) {
      if (value !== 'others') {
        this.residenceToInputSupply.dominantRoadOther = ''
      }
    },
    'residenceToInputSupply.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.residenceToInputSupplyOther = ''
      }
    },
  },
}
</script>
