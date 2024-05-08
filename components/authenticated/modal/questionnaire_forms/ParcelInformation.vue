<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row class="mb-1 pa-4">
        <v-col cols="12" md="6" class="d-flex pa-0 ma-0 mb-2">
          <v-btn block small color="success" @click="items += 1"
            >Add <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="12" md="6" class="d-flex pa-0 ma-0">
          <v-btn
            block
            small
            color="warning"
            @click="decrement"
            class="black--text"
            >Remove last item <v-icon>mdi-minus</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <form-card v-for="i in items" :key="i">
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="parcelNumber[i - 1]"
              :rules="requiredRule"
              label="* Parcel Number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="area[i - 1]"
              :rules="numberRule"
              label="* Area (ha)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0 my-0">
            <div class="mt-3">
              <v-select
                v-model="tenure[i - 1]"
                :items="tenureItems"
                menu-props="auto"
                hide-details
                label="* Tenure"
                dense
              ></v-select>
              <v-text-field
                v-if="tenure[i - 1] == 'others'"
                v-model="tenureOther[i - 1]"
                :rules="requiredRule"
                label="* Please Specify"
              ></v-text-field>
              <p
                v-if="!tenure[i - 1]"
                class="red--text caption mt-1"
              >
                This field is required!
              </p>
            </div>
          </v-col>
          <v-col cols="12" class="py-0 my-0">
            <div class="mt-3">
              <v-select
                v-model="topography[i - 1]"
                :items="topographyItems"
                menu-props="auto"
                hide-details
                label="* Topography"
                dense
              ></v-select>
              <v-text-field
                v-if="topography[i - 1] == 'others'"
                v-model="topographyOther[i - 1]"
                :rules="requiredRule"
                label="* Please Specify"
              ></v-text-field>
              <p
                v-if="!topography[i - 1]"
                class="red--text caption mt-1"
              >
                This field is required!
              </p>
            </div>
          </v-col>
          <v-col cols="12" class="py-0 my-0">
            <div class="mt-3">
              <v-select
                v-model="soilFertility[i - 1]"
                :items="soilFertilityItems"
                menu-props="auto"
                hide-details
                label="* Soil Fertility"
                dense
              ></v-select>
              <v-text-field
                v-if="soilFertility[i - 1] == 'others'"
                v-model="soilFertilityOther[i - 1]"
                :rules="requiredRule"
                label="* Please Specify"
              ></v-text-field>
              <p
                v-if="!soilFertility[i - 1]"
                class="red--text caption mt-1"
              >
                This field is required!
              </p>
            </div>
          </v-col>
        </v-row>
      </form-card>
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
		parcelNumber: [],
		area: [],
		tenure: [],
		tenureItems: [],
		tenureOther: [],
		topography: [],
		topographyItems: [],
		topographyOther: [],
		soilFertility: [],
		soilFertilityItems: [],
		croppingSystem: [],
		croppingSystemItems: [],
		croppingSystemOther: [],
		sourceWater: [],
		sourceWaterItems: [],
		sourceWaterOther: [],
		landUseStatus: [],
		landUseStatusItems: [],
		landUseStatusOther: [],
		cropsPlanted: [],

		numberRule: [
			(v) => !!v || 'This field is required',
			(v) => parseFloat(v) > 0 || 'invalid value',
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
			if (!this.isThereStoppedFarming) {
				return false
			}
			return true
		},
		/* get the data and convert it into expected key/value formats in BackEnd */
		getData() {
			return {}
		},
	},
    beforeMount(){
        this.tenureItems = this.$store.getters['questionnaireCode/Code13']
        this.topographyItems = this.$store.getters['questionnaireCode/Code14']
        this.soilFertilityItems = this.$store.getters['questionnaireCode/Code15']
    }
}
</script>
