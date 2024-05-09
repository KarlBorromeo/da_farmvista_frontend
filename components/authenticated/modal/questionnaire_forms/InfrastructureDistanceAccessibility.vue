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
            <v-radio-group v-model="farmToNearestRoad.unit" class="pa-0 ma-0">
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <div v-if="!farmToNearestRoad.unit" class="red--text caption">
                You must select an option!
              </div>
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
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div
                v-if="!farmToNearestRoad.dominantTransportation"
                class="red--text caption"
              >
                You must select an option!
              </div>
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
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div
                v-if="!farmToNearestRoad.dominantRoad"
                class="red--text caption"
              >
                You must select an option!
              </div>
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
            <v-radio-group v-model="farmToResidence.unit" class="pa-0 ma-0">
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <div v-if="!farmToResidence.unit" class="red--text caption">
                You must select an option!
              </div>
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
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div
                v-if="!farmToResidence.dominantTransportation"
                class="red--text caption"
              >
                You must select an option!
              </div>
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
                :rules="requiredRule"
                label="* Please Specify"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div
                v-if="!farmToResidence.dominantRoad"
                class="red--text caption"
              >
                You must select an option!
              </div>
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
            <v-radio-group v-model="farmToMarket.unit" class="pa-0 ma-0">
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <div v-if="!farmToMarket.unit" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
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
              <div
                v-if="!farmToMarket.dominantTransportation"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
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
              <div v-if="!farmToMarket.dominantRoad" class="red--text caption">
                You must select an option!
              </div>
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
            <v-radio-group v-model="residenceToMarket.unit" class="pa-0 ma-0">
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <div v-if="!residenceToMarket.unit" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
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
              <div
                v-if="!residenceToMarket.dominantTransportation"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
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
              <div
                v-if="!residenceToMarket.dominantRoad"
                class="red--text caption"
              >
                You must select an option!
              </div>
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
            <v-radio-group v-model="farmToInputSupply.unit" class="pa-0 ma-0">
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <div v-if="!farmToInputSupply.unit" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
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
              <div
                v-if="!farmToInputSupply.dominantTransportation"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
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
              <div
                v-if="!farmToInputSupply.dominantRoad"
                class="red--text caption"
              >
                You must select an option!
              </div>
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
              v-model="residenceToInputSupply.unit"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in unitItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <div
                v-if="!residenceToInputSupply.unit"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Mode of Transportation">
            <v-radio-group
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
              <div
                v-if="!residenceToInputSupply.dominantTransportation"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          <form-radio-container title="Dominant Type of Road">
            <v-radio-group
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
              <div
                v-if="!residenceToInputSupply.dominantRoad"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../cards/formCard.vue'
import FormInputContainer from '../../cards/formInputContainer.vue'
import FormRadioContainer from '../../cards/formRadioContainer.vue'
export default {
  components: {
    formCard,
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    farmToNearestRoad: {
      qty: '',
      unit: '',
      dominantTransportation: '',
      dominantTransportationOther: '',
      dominantRoad: '',
      dominantRoadOther: '',
    },
    farmToResidence: {
      qty: '',
      unit: '',
      dominantTransportation: '',
      dominantTransportationOther: '',
      dominantRoad: '',
      dominantRoadOther: '',
    },
    farmToMarket: {
      qty: '',
      unit: '',
      dominantTransportation: '',
      dominantTransportationOther: '',
      dominantRoad: '',
      dominantRoadOther: '',
    },
    residenceToMarket: {
      qty: '',
      unit: '',
      dominantTransportation: '',
      dominantTransportationOther: '',
      dominantRoad: '',
      dominantRoadOther: '',
    },
    farmToInputSupply: {
      qty: '',
      unit: '',
      dominantTransportation: '',
      dominantTransportationOther: '',
      dominantRoad: '',
      dominantRoadOther: '',
    },
    residenceToInputSupply: {
      qty: '',
      unit: '',
      dominantTransportation: '',
      dominantTransportationOther: '',
      dominantRoad: '',
      dominantRoadOther: '',
    },
    unitItems: [],
    transportationItems: [],
    roadItems: [],
    requiredRule: [(v) => !!v || 'This field is required, n/a if none'],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
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
      if (
        !this.farmToNearestRoad.unit ||
        !this.farmToNearestRoad.dominantTransportation ||
        !this.farmToNearestRoad.dominantRoad ||
        !this.farmToResidence.unit ||
        !this.farmToResidence.dominantTransportation ||
        !this.farmToResidence.dominantRoad ||
        !this.farmToMarket.unit ||
        !this.farmToMarket.dominantTransportation ||
        !this.farmToMarket.dominantRoad ||
        !this.residenceToMarket.unit ||
        !this.residenceToMarket.dominantTransportation ||
        !this.residenceToMarket.dominantRoad ||
        !this.farmToInputSupply.unit ||
        !this.farmToInputSupply.dominantTransportation ||
        !this.farmToInputSupply.dominantRoad ||
        !this.residenceToInputSupply.unit ||
        !this.residenceToInputSupply.dominantTransportation ||
        !this.residenceToInputSupply.dominantRoad
      ) {
        return false
      }
      return true
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
        farm_to_nearest_road: {
          distance_qty: this.farmToNearestRoad.qty,
          distance_unit: this.farmToNearestRoad.unit,
          dominant_transportation: this.concatinateValues(
            this.farmToNearestRoad.dominantTransportation,
            this.farmToNearestRoad.dominantTransportationOther
          ),
          dominant_type_road: this.concatinateValues(
            this.farmToNearestRoad.dominantRoad,
            this.farmToNearestRoad.dominantRoadOther
          ),
        },
        farm_to_residence: {
          distance_qty: this.farmToResidence.qty,
          distance_unit: this.farmToResidence.unit,
          dominant_transportation: this.concatinateValues(
            this.farmToResidence.dominantTransportation,
            this.farmToResidence.dominantTransportationOther
          ),
          dominant_type_road: this.concatinateValues(
            this.farmToResidence.dominantRoad,
            this.farmToResidence.dominantRoadOther
          ),
        },
        farm_to_output_market: {
          distance_qty: this.farmToMarket.qty,
          distance_unit: this.farmToMarket.unit,
          dominant_transportation: this.concatinateValues(
            this.farmToMarket.dominantTransportation,
            this.farmToMarket.dominantTransportationOther
          ),
          dominant_type_road: this.concatinateValues(
            this.farmToMarket.dominantRoad,
            this.farmToMarket.dominantRoadOther
          ),
        },
        residence_to_output_market: {
          distance_qty: this.residenceToMarket.qty,
          distance_unit: this.residenceToMarket.unit,
          dominant_transportation: this.concatinateValues(
            this.residenceToMarket.dominantTransportation,
            this.residenceToMarket.dominantTransportationOther
          ),
          dominant_type_road: this.concatinateValues(
            this.residenceToMarket.dominantRoad,
            this.residenceToMarket.dominantRoadOther
          ),
        },
        farm_to_inputs_supply: {
          distance_qty: this.farmToInputSupply.qty,
          distance_unit: this.farmToInputSupply.unit,
          dominant_transportation: this.concatinateValues(
            this.farmToInputSupply.dominantTransportation,
            this.farmToInputSupply.dominantTransportationOther
          ),
          dominant_type_road: this.concatinateValues(
            this.farmToInputSupply.dominantRoad,
            this.farmToInputSupply.dominantRoadOther
          ),
        },
        residence_to_inputs_supply: {
          distance_qty: this.residenceToInputSupply.qty,
          distance_unit: this.residenceToInputSupply.unit,
          dominant_transportation: this.concatinateValues(
            this.residenceToInputSupply.dominantTransportation,
            this.residenceToInputSupply.dominantTransportationOther
          ),
          dominant_type_road: this.concatinateValues(
            this.residenceToInputSupply.dominantRoad,
            this.residenceToInputSupply.dominantRoadOther
          ),
        },
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--
      }
    },
  },
  beforeMount() {
    this.unitItems = this.$store.getters['questionnaireCode/Code17']
    this.transportationItems = this.$store.getters['questionnaireCode/Code18']
    this.roadItems = this.$store.getters['questionnaireCode/Code19']
  },
}
</script>
