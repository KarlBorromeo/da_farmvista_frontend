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
              type="number"
              min="0"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group v-model="farmToNearestRoad.unit" class="pa-0 ma-0">
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
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
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
              type="number"
              min="0"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group v-model="farmToResidence.unit" class="pa-0 ma-0">
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
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
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
              v-model="farmToOutputMarket.qty"
              :rules="numberRule"
              type="number"
              min="0"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group v-model="farmToOutputMarket.unit" class="pa-0 ma-0">
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
              v-model="farmToOutputMarket.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToOutputMarket.dominantTransportation == 'others'"
                v-model="farmToOutputMarket.dominantTransportationOther"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              v-model="farmToOutputMarket.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToOutputMarket.dominantRoad == 'others'"
                v-model="farmToOutputMarket.dominantRoadOther"
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
              v-model="residenceToOutputMarket.qty"
              :rules="numberRule"
              type="number"
              min="0"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group
              v-model="residenceToOutputMarket.unit"
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
              v-model="residenceToOutputMarket.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="
                  residenceToOutputMarket.dominantTransportation == 'others'
                "
                v-model="residenceToOutputMarket.dominantTransportationOther"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              v-model="residenceToOutputMarket.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="residenceToOutputMarket.dominantRoad == 'others'"
                v-model="residenceToOutputMarket.dominantRoadOther"
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
              v-model="farmToInputsSupply.qty"
              :rules="numberRule"
              type="number"
              min="0"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group v-model="farmToInputsSupply.unit" class="pa-0 ma-0">
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
              v-model="farmToInputsSupply.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToInputsSupply.dominantTransportation == 'others'"
                v-model="farmToInputsSupply.dominantTransportationOther"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              v-model="farmToInputsSupply.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="farmToInputsSupply.dominantRoad == 'others'"
                v-model="farmToInputsSupply.dominantRoadOther"
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
              v-model="residenceToInputsSupply.qty"
              :rules="numberRule"
              type="number"
              min="0"
              label="* Details"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Distance in (b) Unit">
            <v-radio-group
              v-model="residenceToInputsSupply.unit"
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
              v-model="residenceToInputsSupply.dominantTransportation"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in transportationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="
                  residenceToInputsSupply.dominantTransportation == 'others'
                "
                v-model="residenceToInputsSupply.dominantTransportationOther"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
              v-model="residenceToInputsSupply.dominantRoad"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in roadItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="residenceToInputsSupply.dominantRoad == 'others'"
                v-model="residenceToInputsSupply.dominantRoadOther"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import {
  concatinateOtherValueToString,
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
} from '~/reusableFunctions/questionnaireValidation'
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
    farmToOutputMarket: {
      qty: 1,
      unit: 'meter',
      dominantTransportation: 'walk',
      dominantTransportationOther: '',
      dominantRoad: 'dirt road',
      dominantRoadOther: '',
    },
    residenceToOutputMarket: {
      qty: 1,
      unit: 'meter',
      dominantTransportation: 'walk',
      dominantTransportationOther: '',
      dominantRoad: 'dirt road',
      dominantRoadOther: '',
    },
    farmToInputsSupply: {
      qty: 1,
      unit: 'meter',
      dominantTransportation: 'walk',
      dominantTransportationOther: '',
      dominantRoad: 'dirt road',
      dominantRoadOther: '',
    },
    residenceToInputsSupply: {
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
    numberRule: [(v) => parseFloat(v) >= 0 || 'invalid value'],
    tempValue: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'InfrastructureDistanceAccessibilityValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'infraDistanceAccessibility',
          data: this.getData(),
        })
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
          distanceQty: parseInt(this.farmToNearestRoad.qty),
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
          distanceQty: parseInt(this.farmToResidence.qty),
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
          distanceQty: parseInt(this.farmToOutputMarket.qty),
          distanceUnit: this.farmToOutputMarket.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.farmToOutputMarket.dominantTransportation,
            this.farmToOutputMarket.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.farmToOutputMarket.dominantRoad,
            this.farmToOutputMarket.dominantRoadOther
          ),
        },
        residenceToOutputMarket: {
          distanceQty: parseInt(this.residenceToOutputMarket.qty),
          distanceUnit: this.residenceToOutputMarket.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.residenceToOutputMarket.dominantTransportation,
            this.residenceToOutputMarket.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.residenceToOutputMarket.dominantRoad,
            this.residenceToOutputMarket.dominantRoadOther
          ),
        },
        farmToInputsSupply: {
          distanceQty: parseInt(this.farmToInputsSupply.qty),
          distanceUnit: this.farmToInputsSupply.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.farmToInputsSupply.dominantTransportation,
            this.farmToInputsSupply.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.farmToInputsSupply.dominantRoad,
            this.farmToInputsSupply.dominantRoadOther
          ),
        },
        residenceToInputsSupply: {
          distanceQty: parseInt(this.residenceToInputsSupply.qty),
          distanceUnit: this.residenceToInputsSupply.unit,
          dominantTransportation: concatinateOtherValueToString(
            this.residenceToInputsSupply.dominantTransportation,
            this.residenceToInputsSupply.dominantTransportationOther
          ),
          dominantTypeRoad: concatinateOtherValueToString(
            this.residenceToInputsSupply.dominantRoad,
            this.residenceToInputsSupply.dominantRoadOther
          ),
        },
      }
    },
  },
  beforeMount() {
    this.unitItems = this.$store.getters['questionnaireCode/Code17']
    this.transportationItems = this.$store.getters['questionnaireCode/Code18']
    this.roadItems = this.$store.getters['questionnaireCode/Code19']

    const rootKeyNames = [
      'farmToNearestRoad',
      'farmToResidence',
      'farmToOutputMarket',
      'residenceToOutputMarket',
      'farmToInputsSupply',
      'residenceToInputsSupply',
    ]
    const localNestedKeyNames = [
      'qty',
      'unit',
      'dominantTransportation',
      'dominantTransportationOther',
      'dominantRoad',
      'dominantRoadOther',
    ]
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      const reponseNestedKeyNames = [
        'distanceQty',
        'distanceUnit',
        'dominantTransportation',
        'dominantTransportation',
        'dominantTypeRoad',
        'dominantTypeRoad',
      ]
      rootKeyNames.forEach((rootKey) => {
        localNestedKeyNames.forEach((nestedKey, i) => {
          const responseNestedKey = reponseNestedKeyNames[i]
          if (nestedKey == 'dominantTransportation') {
            this[rootKey][nestedKey] = isOtherValueDefinedRadio(
              data.infraDistanceAccessibility[rootKey][responseNestedKey],
              this.transportationItems
            )
          } else if (nestedKey == 'dominantTransportationOther') {
            this[rootKey][nestedKey] = extractUnmatchedValueRadio(
              data.infraDistanceAccessibility[rootKey][responseNestedKey],
              this.transportationItems
            )
          } else if (nestedKey == 'dominantRoad') {
            this[rootKey][nestedKey] = isOtherValueDefinedRadio(
              data.infraDistanceAccessibility[rootKey][responseNestedKey],
              this.roadItems
            )
          } else if (nestedKey == 'dominantRoadOther') {
            this[rootKey][nestedKey] = extractUnmatchedValueRadio(
              data.infraDistanceAccessibility[rootKey][responseNestedKey],
              this.roadItems
            )
          } else {
            this[rootKey][nestedKey] =
              data.infraDistanceAccessibility[rootKey][responseNestedKey]
          }
        })
      })
    } else {
      rootKeyNames.forEach((rootKey) => {
        localNestedKeyNames.forEach((nestedKey, i) => {
          if (nestedKey == 'qty') {
            this[rootKey][nestedKey] = 0
          } else {
            this[rootKey][nestedKey] = ''
          }
        })
      })
    }
    this.tempValue = 'tempValue'
  },
  watch: {
    farmToNearestRoad: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
    farmToResidence: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
    farmToOutputMarket: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
    residenceToOutputMarket: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
    farmToInputsSupply: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
    residenceToInputsSupply: {
      handler: function () {
        this.validate()
      },
      deep: true,
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
    'farmToOutputMarket.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.farmToOutputMarket.dominantTransportationOther = ''
      }
    },
    'farmToOutputMarket.dominantRoad': function (value) {
      if (value !== 'others') {
        this.farmToOutputMarket.dominantRoadOther = ''
      }
    },
    'residenceToOutputMarket.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.residenceToOutputMarket.dominantTransportationOther = ''
      }
    },
    'residenceToOutputMarket.dominantRoad': function (value) {
      if (value !== 'others') {
        this.residenceToOutputMarket.dominantRoadOther = ''
      }
    },
    'farmToInputsSupply.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.farmToInputsSupply.dominantTransportationOther = ''
      }
    },
    'farmToInputsSupply.dominantRoad': function (value) {
      if (value !== 'others') {
        this.residenceToInputsSupply.dominantTransportationOther = ''
      }
    },
    'residenceToInputsSupply.dominantRoad': function (value) {
      if (value !== 'others') {
        this.residenceToInputsSupply.dominantRoadOther = ''
      }
    },
    'residenceToInputsSupply.dominantTransportation': function (value) {
      if (value !== 'others') {
        this.residenceToInputsSupplyOther = ''
      }
    },
    tempValue() {
      this.validate()
    },
  },
}
</script>
