<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-container>
			<v-row>
				<form-checkbox-container title="Agricultural System">
					<v-checkbox
						v-for="item in agriculturalSystemItems"
						v-model="agriculturalSystem"
						:key="item"
						:value="item"
						:label="item"
						class="ma-0 pa-0"
					></v-checkbox>
					<v-text-field
						v-if="isOtherTicked(agriculturalSystem)"
						v-model="agriculturalSystemOther"
						:rules="requiredRule"
						label="* please specify"
					></v-text-field>
				</form-checkbox-container>

				<form-radio-container
					title="Did know proper reutilization of agri-waste?"
				>
					<v-radio-group
						:rules="requiredRule"
						v-model="didKnowProperReutilization"
						class="pa-0 ma-0"
					>
						<v-radio
							v-for="item in didKnowProperReutilizationItems"
							:key="item"
							:label="item"
							:value="item"
						></v-radio>
					</v-radio-group>
				</form-radio-container>

				<form-checkbox-container
					v-if="didKnowProperReutilization == 'no'"
					title="If No, where diposed the unutilzied agir-waste?"
				>
					<v-checkbox
						v-for="item in whereDisposedUnutilizedAgriwasteItems"
						v-model="whereDisposedUnutilizedAgriwaste"
						:key="item"
						:value="item"
						:label="item"
						class="ma-0 pa-0"
					></v-checkbox>
					<v-text-field
						v-if="isOtherTicked(whereDisposedUnutilizedAgriwaste)"
						v-model="whereDisposedUnutilizedAgriwasteOther"
						:rules="requiredRule"
						label="* please specify"
					></v-text-field>
				</form-checkbox-container>

				<form-checkbox-container
					title="Where heared about reutilization of agri-waste"
				>
					<v-checkbox
						v-for="item in whereHearAboutReutilizationItems"
						v-model="whereHearAboutReutilization"
						:key="item"
						:value="item"
						:label="item"
						class="ma-0 pa-0"
					></v-checkbox>
					<v-text-field
						v-if="isOtherTicked(whereHearAboutReutilization)"
						v-model="whereHearAboutReutilizationOther"
						:rules="requiredRule"
						label="* please specify"
					></v-text-field>
				</form-checkbox-container>
			</v-row>
		</v-container>
		<v-btn @click="validate">Validate</v-btn>
	</v-form>
</template>

<script>
import FormCheckboxContainer from '../../form/formCheckboxContainer.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
import { concatOtherValueToList } from '~/reusableFunctions/questionnaireValidation'
export default {
	components: {
		FormInputContainer,
		FormRadioContainer,
		FormCheckboxContainer,
	},
	data: () => ({
		valid: false,
		agriculturalSystem: ['crop production','agroforestry'],
		agriculturalSystemItems: [],
		agriculturalSystemOther: '',
		didKnowProperReutilization: 'yes',
		didKnowProperReutilizationItems: ['yes', 'no'],
		// if no
		whereDisposedUnutilizedAgriwaste: [],
		whereDisposedUnutilizedAgriwasteItems: [],
		whereDisposedUnutilizedAgriwasteOther: '',
		whereHearAboutReutilization: ['social media','training'],
		whereHearAboutReutilizationItems: [],
		whereHearAboutReutilizationOther: '',
		requiredRule: [(v) => !!v || 'This field is required'],
		listRule: [(v) => v.length > 0 || 'Must select at least one one'],
	}),
	methods: {
		/* test if the form is valid, return boolean */
		validate() {
			const textRadioValid = this.$refs.form.validate()
			const checkboxValid = this.validateCheckbox()
			let valid = false
			if (textRadioValid && checkboxValid) {
				valid = true
			}
			this.$store.commit('questionnaire/toggleNextTab', {
				tabName: 'FarmActivitiesValidated',
				valid,
			})
			if (valid) {
				this.$store.commit('questionnaire/saveData', {
					keyName: 'farmActivity',
					data: this.getData(),
				})
			}
		},
		/* check if checkbox are empty or not */
		validateCheckbox() {
			if (
				this.agriculturalSystem.length == 0 ||
        this.whereHearAboutReutilization.length == 0
			) {
				return false
			} else if( this.didKnowProperReutilization == 'no' &&
				this.whereDisposedUnutilizedAgriwaste.length == 0){
        return false
      }
      else {
				return true
			}
		},
		/* check if 'other' checkbox is ticked */
		isOtherTicked(list) {
			for (let i = 0; i < list.length; i++) {
				if (list[i] == 'others') {
					return true
				}
			}
			return false
		},
		/* get the data and convert it into expected key/value formats in BackEnd */
		getData() {
			return {
				agriculturalSystem: concatOtherValueToList(
					this.agriculturalSystem,
					this.agriculturalSystemOther
				),
				knowProperReutilizationAgriwaste:
					this.didKnowProperReutilization,
				whereDisposedUnutilizedAgriwaste: concatOtherValueToList(
					this.whereDisposedUnutilizedAgriwaste,
					this.whereDisposedUnutilizedAgriwasteOther
				),
				whereHearAboutReutilization: concatOtherValueToList(
					this.whereHearAboutReutilization,
					this.whereHearAboutReutilizationOther
				),
			}
		},
	},
	beforeMount() {
		this.agriculturalSystemItems =
			this.$store.getters['questionnaireCode/AgriculturalSystem']
		this.whereDisposedUnutilizedAgriwasteItems =
			this.$store.getters['questionnaireCode/WasteDisposalMethod']
		this.whereHearAboutReutilizationItems =
			this.$store.getters[
				'questionnaireCode/AgriWasteReutilizationInformationSource'
			]
	},
	watch: {
		agriculturalSystem(value) {
      this.validate()
			if (value != 'others') {
				this.agriculturalSystemOther = ''
			}
		},
		whereDisposedUnutilizedAgriwaste(value) {
      this.validate()
			if (value != 'others') {
				this.whereDisposedUnutilizedAgriwasteOther = ''
			}
		},
		whereHearAboutReutilization(value) {
      this.validate()
			if (value != 'others') {
				this.whereHearAboutReutilizationOther = ''
			}
		},
		agriculturalSystemOther() {
			this.validate()
		},
		didKnowProperReutilization(value) {
      this.validate()
      if(value == 'yes'){
        this.whereDisposedUnutilizedAgriwaste = [];
      }		
		},
		whereDisposedUnutilizedAgriwasteOther() {
			this.validate()
		},
		whereHearAboutReutilizationOther() {
			this.validate()
		},
	},
}
</script>
