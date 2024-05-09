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

					<form-input-container>
						<v-text-field
							v-model="cropsGrown[i - 1]"
							:rules="requiredRule"
							label="* Crops grown in the area"
						></v-text-field>
					</form-input-container>

          <form-input-container>
						<v-text-field
							v-model="kindsWasteProduced[i - 1]"
							:rules="requiredRule"
							label="* Kinds of waste produced"
						></v-text-field>
					</form-input-container>

          <form-input-container>
						<v-text-field
							v-model="volumeWaste[i - 1]"
							:rules="numberRule"
							label="* Volume of Waste(kg)"
              type="number"
						></v-text-field>
					</form-input-container>

					<form-radio-container title="Utilized?">
						<v-radio-group
							v-model="isUtilized[i - 1]"
							class="pa-0 ma-0"
						>
							<v-radio
								v-for="item in isUtilizedItems"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></v-radio>
							<div
								v-if="!isUtilized[i - 1]"
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
		items: 1,
		cropsGrown: [],
		kindsWasteProduced: [],
		volumeWaste: [],
		isUtilized: [],
		isUtilizedItems: [
			{ value: 'yes', label: 'Yes' },
			{ value: 'no', label: 'No' },
		],
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
			const radioCheckboxValid = this.validateRadioCheckbox()
			if (valid && radioCheckboxValid) {
				const data = this.getData()
				console.log(data)
			}
		},
		/* check if radio inputs are not empty */
		validateRadioCheckbox() {
			for (let i = 0; i < this.items; i++) {
				if (!this.isUtilized[i]) {
					return false
				}
			}
			return true
		},
		/* get the data and convert it into expected key/value formats in BackEnd */
		getData() {
			return {
				cropsGrown: this.cropsGrown,
				kindWasteProduced: this.kindsWasteProduced,
				volumeWasteKg: this.volumeWaste,
				isUtilized: this.isUtilized,
			}
		},
		// decrement the count of items
		decrement() {
			if (this.items > 1) {
				this.items--
				this.cropsGrown.pop()
				this.kindsWasteProduced.pop()
				this.volumeWaste.pop()
				this.isUtilized.pop()
			}
		},
	},
}
</script>
