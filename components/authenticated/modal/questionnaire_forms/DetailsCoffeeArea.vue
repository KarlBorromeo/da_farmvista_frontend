<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-container>
			<form-card>
				<p class="my-2 pb-0 font-weight-medium">
					Classification of crops
				</p>
				<v-row>
					<form-input-container>
						<v-text-field
							v-model="classificationCropsDetails"
							:rules="requiredRule"
							label="* Details"
						></v-text-field>
					</form-input-container>
					<form-input-container>
						<v-text-field
							v-model="classificationCropsReasons"
							:rules="requiredRule"
							label="* Reason for using"
						></v-text-field>
					</form-input-container>
				</v-row>
			</form-card>

			<form-card>
				<p class="my-2 pb-0 font-weight-medium">Year Planted</p>
				<v-row>
					<form-input-container>
						<v-text-field
							v-model="yearPlantedDetails"
							:rules="yearRule"
							label="* Details"
							type="number"
						></v-text-field>
					</form-input-container>
					<form-input-container>
						<v-text-field
							v-model="yearPlantedReasons"
							:rules="requiredRule"
							label="* Reason for using"
						></v-text-field>
					</form-input-container>
				</v-row>
			</form-card>

			<form-card>
				<p class="my-2 pb-0 font-weight-medium">Planting Distance</p>
				<v-row>
					<form-input-container>
						<v-text-field
							v-model="plantingDistanceDetails"
							:rules="requiredRule"
							label="* Details"
						></v-text-field>
					</form-input-container>
					<form-radio-container title="Reason for Using">
						<v-radio-group
							v-model="plantingDistanceReasons"
							class="pa-0 ma-0"
						>
							<v-radio
								v-for="item in reasonUsingItems"
								:key="item"
								:label="item"
								:value="item"
							></v-radio>
							<v-text-field
								v-if="plantingDistanceReasons == 'others'"
								v-model="plantingDistanceReasonsOther"
								:rules="requiredRule"
								label="* Please Specify"
								class="my-0 py-0 pt-1"
							></v-text-field>
							<div
								v-if="!plantingDistanceReasons"
								class="red--text caption"
							>
								You must select an option!
							</div>
						</v-radio-group>
					</form-radio-container>
				</v-row>
			</form-card>

			<form-card>
				<p class="my-2 pb-0 font-weight-medium">
					Number of Plants or stands
				</p>
				<v-row>
					<form-input-container>
						<v-text-field
							v-model="numberPlantsDetails"
							:rules="requiredRule"
							label="* Details"
						></v-text-field>
					</form-input-container>
					<form-input-container>
						<v-text-field
							v-model="numberPlantsReasons"
							:rules="requiredRule"
							label="* Reason for using"
						></v-text-field>
					</form-input-container>
				</v-row>
			</form-card>

			<form-card>
				<p class="my-2 pb-0 font-weight-medium">
					Intercrop and Variety
				</p>
				<v-row>
					<form-input-container>
						<v-text-field
							v-model="intercropVarietyDetails"
							:rules="requiredRule"
							label="* Details"
						></v-text-field>
					</form-input-container>
					<form-radio-container title="Reason for Using">
						<v-radio-group
							v-model="intercropVarietyReasons"
							class="pa-0 ma-0"
						>
							<v-radio
								v-for="item in reasonUsingItems"
								:key="item"
								:label="item"
								:value="item"
							></v-radio>
							<v-text-field
								v-if="intercropVarietyReasons == 'others'"
								v-model="intercropVarietyReasonsOther"
								:rules="requiredRule"
								label="* Please Specify"
								class="my-0 py-0 pt-1"
							></v-text-field>
							<div
								v-if="!intercropVarietyReasons"
								class="red--text caption"
							>
								You must select an option!
							</div>
						</v-radio-group>
					</form-radio-container>
				</v-row>
			</form-card>
			<form-card>
				<p class="my-2 pb-0 font-weight-medium">Total Area (ha)</p>
				<v-row>
					<form-input-container>
						<v-text-field
							v-model="totalAreaDetails"
							:rules="numberRule"
							label="* Details"
						></v-text-field>
					</form-input-container>
					<form-input-container>
						<v-text-field
							v-model="totalAreaReasons"
							:rules="requiredRule"
							label="* Reason for using"
						></v-text-field>
					</form-input-container>
				</v-row>
			</form-card>
			<form-card>
				<p class="my-2 pb-0 font-weight-medium">Seed Source</p>
				<v-row>
					<form-radio-container title="Details">
						<v-radio-group
							v-model="seedSourceDetails"
							class="pa-0 ma-0"
						>
							<v-radio
								v-for="item in seedSourceItems"
								:key="item"
								:label="item"
								:value="item"
							></v-radio>
							<v-text-field
								v-if="seedSourceDetails == 'others'"
								v-model="seedSourceDetailsOther"
								:rules="requiredRule"
								label="* Please Specify"
								class="my-0 py-0 pt-1"
							></v-text-field>
							<div
								v-if="!seedSourceDetails"
								class="red--text caption"
							>
								You must select an option!
							</div>
						</v-radio-group>
					</form-radio-container>

					<form-radio-container title="Reason for Using">
						<v-radio-group
							v-model="seedSourceReasons"
							class="pa-0 ma-0"
						>
							<v-radio
								v-for="item in reasonUsingItems"
								:key="item"
								:label="item"
								:value="item"
							></v-radio>
							<v-text-field
								v-if="seedSourceReasons == 'others'"
								v-model="seedSourceReasonsOther"
								:rules="requiredRule"
								label="* Please Specify"
								class="my-0 py-0 pt-1"
							></v-text-field>
							<div
								v-if="!seedSourceReasons"
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
		classificationCropsDetails: '',
		classificationCropsReasons: '',
		yearPlantedDetails: '',
		yearPlantedReasons: '',
		plantingDistanceDetails: '',
		plantingDistanceReasons: '',
		plantingDistanceReasonsOther: '',
		numberPlantsDetails: '',
		numberPlantsReasons: '',
		intercropVarietyDetails: '',
		intercropVarietyReasons: '',
		intercropVarietyReasonsOther: '',
		totalAreaDetails: '',
		totalAreaReasons: '',
		seedSourceDetails: '',
		seedSourceDetailsOther: '',
		seedSourceReasons: '',
		seedSourceReasonsOther: '',
		seedSourceItems: [],
		reasonUsingItems: [],
		requiredRule: [(v) => !!v || 'This field is required, n/a if none'],
		numberRule: [
			(v) => !!v || 'This field is required',
			(v) => parseFloat(v) >= 0 || 'invalid value',
		],
		yearRule: [
			(v) => !!v || 'This field is required',
			(v) => {
				const value = parseInt(v)
				const currentDate = new Date()
				const currentYear = currentDate.getFullYear()
				if (value > 1900 && value <= currentYear) {
					return true
				}
				return 'invalid year value'
			},
		],
	}),
	methods: {
		/* test if the form is valid, return boolean */
		validate() {
			const valid = this.$refs.form.validate()
			const validRadio = this.validateRadio()
			console.log(
				this.concatinateValues(
					this.seedSourceReasons,
					this.seedSourceReasonsOther
				)
			)
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
				(!this.plantingDistanceReasons,
				!this.intercropVarietyReasons,
				!this.seedSourceDetails,
				!this.seedSourceReasons)
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
				classification_crops: {
					details: this.classificationCropsDetails,
					reason_using: this.classificationCropsReasons,
				},
				year_planted: {
					details: this.yearPlantedDetails,
					reason_using: this.yearPlantedReasons,
				},
				planting_distance: {
					details: this.plantingDistanceDetails,
					reason_using: this.concatinateValues(
						this.plantingDistanceReasons,
						this.plantingDistanceReasonsOther
					),
				},
				number_plants_stands: {
					details: this.numberPlantsDetails,
					reason_using: this.numberPlantsReasons,
				},
				intercrop_variety: {
					details: this.intercropVarietyDetails,
					reason_using: this.concatinateValues(
						this.intercropVarietyReasons,
						this.intercropVarietyReasonsOther
					),
				},
				total_area: {
					details: this.totalAreaDetails,
					reason_using: this.totalAreaReasons,
				},
				seed_source: {
					details: this.concatinateValues(
						this.seedSourceDetails,
						this.seedSourceDetailsOther
					),
					reason_using: this.concatinateValues(
						this.seedSourceReasons,
						this.seedSourceReasonsOther
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
		this.reasonUsingItems = this.$store.getters['questionnaireCode/Code16B']
		this.seedSourceItems = this.$store.getters['questionnaireCode/Code16A']
	},
}
</script>
