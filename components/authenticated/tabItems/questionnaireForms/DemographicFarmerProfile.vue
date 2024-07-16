<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-container>
			<v-row>
				<form-select-container>
					<v-select
						v-model="regionProvince"
						:items="regionProvinceItems"
						label="* Region/Pronvince"
						dense
						class="text-capitalize"
						:rules="requiredRule"
						required
					></v-select>
				</form-select-container>
				<form-select-container>
					<v-select
						v-model="cityMunicipality"
						:items="cities"
						label="* City/Municipality"
						dense
						class="text-capitalize"
						:rules="requiredRule"
						required
					></v-select>
				</form-select-container>
				<form-select-container>
					<v-select
						v-model="barangay"
						:items="barangays"
						label="* Barangay"
						dense
						class="text-capitalize"
						:rules="requiredRule"
						required
					></v-select>
				</form-select-container>
				<form-radio-container title="Classification" :required="true">
					<v-radio-group
						:rules="requiredRule"
						v-model="classification"
						class="pa-0 ma-0"
						row
					>
						<v-radio
							v-for="item in classificationItems"
							:key="item"
							:label="item"
							:value="item"
							class="text-capitalize"
						></v-radio>
					</v-radio-group>
				</form-radio-container>
				<form-radio-container title="Status" :required="true">
					<v-radio-group
						:rules="requiredRule"
						v-model="status"
						class="pa-0 ma-0"
						row
					>
						<v-radio
							v-for="item in statusItems"
							:key="item"
							:label="item"
							:value="item"
							class="text-capitalize"
						></v-radio>
					</v-radio-group>
				</form-radio-container>
				<form-radio-container title="Is interviewed" :required="true">
					<v-radio-group
						:rules="requiredRule"
						v-model="isInterviewed"
						class="pa-0 ma-0"
						row
					>
						<v-radio
							v-for="item in isInterviewedItems"
							:key="item"
							:label="item"
							:value="item"
							class="text-capitalize"
						></v-radio>
					</v-radio-group>
				</form-radio-container>
				<form-input-container>
					<v-text-field
						v-model="farmerFirstName"
						:rules="requiredRule"
						label="* Farmer's Firstname"
						required
					></v-text-field>
				</form-input-container>
				<form-input-container>
					<v-text-field
						v-model="farmerSurName"
						:rules="requiredRule"
						label="* Farmer's Surname"
						required
					></v-text-field>
				</form-input-container>
				<form-input-container>
					<v-text-field
						v-model="farmerMiddileInitial"
						label="Farmer's Middle Initial"
						counter="1"
						maxlength="1"
					></v-text-field>
				</form-input-container>
				<form-input-container>
					<v-text-field
						v-model="confirmedBy"
						:rules="requiredRule"
						label="* Confirmed by (Name):"
						required
					></v-text-field>
				</form-input-container>
				<form-input-container>
					<v-text-field
						v-model="position"
						:rules="requiredRule"
						label="* Confirmed by (Position):"
						required
					></v-text-field>
				</form-input-container>
			</v-row>
		</v-container>
		<!-- <v-btn @click="validate">Validate</v-btn> -->
	</v-form>
</template>

<script>
import formInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import formRadioContainer from '../../form/formRadioContainer.vue'
import formSelectContainer from '../../form/formSelectContainer.vue'
export default {
	activated(){
		this.validate()
	},
	components: { formInputContainer, formSelectContainer, formRadioContainer },
	data: () => ({
		valid: false,
		regionProvince: '',
		regionProvinceItems: [],
		cityMunicipality: '',
		cityMunicipalityItems: [],
		barangay: '',
		barangayItems: [],
		classification: '',
		classificationItems: [],
		status: '',
		statusItems: [],
		isInterviewed: '',
		isInterviewedItems: ['yes','no'],
		farmerFirstName: '',
		farmerSurName: '',
		farmerMiddileInitial: '',
		confirmedBy: '',
		position: '',
		requiredRule: [(v) => !!v || 'this field is required'],
	}),
	methods: {
		/* test if the form is valid, return boolean */
		async validate() {		
			const textValid = this.$refs.form.validate()
			await new Promise(resolve => setTimeout(resolve,300))
			let valid = false;
			if(textValid && this.regionProvince && this.cityMunicipality && this.barangay){
				valid = true
			}

			if (valid) {
				this.$store.commit('questionnaire/saveData', {
					keyName: 'interview',
					data: this.getData(),
				})
				const fullname = this.concatFullName(this.farmerFirstName,this.farmerMiddileInitial,this.farmerSurName)
				this.$store.commit('questionnaire/saveSelfFarmerFullname',fullname)
				this.$store.commit('questionnaire/toggleIsSelfFarmerActive',this.status === 'active')
				this.$store.commit('questionnaire/toggleIsInterviewed', this.isInterviewed === 'yes')
			}
			this.$store.commit('questionnaire/toggleNextTab', {
				tabName: 'DemographicFarmerProfile',
				valid,
			})
		},
		/* concat fullname, return full name string */
		concatFullName(firstName, middleInitial, lastName) {
			const first = firstName + ' '
			const middle = middleInitial ? middleInitial + '. ' : ''
			const last = lastName
			const fullName = first + middle + last
			return fullName
		},
		getData(){
			return {
				regionProvince : this.regionProvince,
				cityMunicipality : this.cityMunicipality,
				barangay : this.barangay,
				classification : this.classification,
				status : this.status,
				isInterviewed : this.isInterviewed,
				firstName : this.farmerFirstName,
				lastName : this.farmerSurName,
				middleInitial : this.farmerMiddileInitial,
				confirmedByName : this.confirmedBy,
				confirmedByPosition : this.position
			}
		}
	},
	watch: {
		regionProvince(val,oldVal){
			this.$store.commit('questionnaireCode/generateDynamicCities',val)
			this.$store.commit('questionnaireCode/generateDynamicBarangay',{
				city: '',
				province: val
			})
			if(!!oldVal){
				this.cityMunicipality = ''
				this.barangay = ''			
			}
	
			this.validate()
		},
		cityMunicipality(val,oldVal){
			this.$store.commit('questionnaireCode/generateDynamicBarangay',{
				city: val,
				province: this.regionProvince
			})
			if(!!oldVal){
				this.barangay = ''			
			}
			this.validate()
		},
		barangay(){
			this.validate()
		},
		classification(){
			this.validate()
		},
		status(val){
			if(val !== 'active'){
				this.$store.commit('questionnaire/toggleIsSelfFarmerActive',true)
			}else{
				this.$store.commit('questionnaire/toggleIsSelfFarmerActive',false)
			}
			this.$store.commit('questionnaire/resetTabsValidity')
			this.validate()
		},
		isInterviewed(val){		
			if (val === 'yes') {
				this.$store.commit('questionnaire/toggleIsInterviewed', true)
			} else {
				this.$store.commit('questionnaire/toggleIsInterviewed', false)
      		}
			this.$store.commit('questionnaire/resetTabsValidity')
			this.validate()
		},
		farmerFirstName(){
			this.validate()
		},
		farmerSurName(){
			this.validate()
		},
		farmerMiddileInitial(){
			this.validate()
		},
		confirmedBy(){
			this.validate()
		},
		position(){
			this.validate()
		},
	},
	computed:{
		cities(){
			return this.$store.getters['questionnaireCode/cities']
		},
		barangays(){
			return this.$store.getters['questionnaireCode/barangays']
		}
	},
	beforeMount() {
		this.statusItems =
			this.$store.getters['questionnaireCode/ProfileStatus']
		this.classificationItems =
			this.$store.getters['questionnaireCode/ProfileClassification']
		this.regionProvinceItems = this.$store.getters['questionnaireCode/RegionProvince']
		const isEditing = this.$store.getters['profiling/isEditingMode']
		if(isEditing){
			const data = this.$store.getters['profiling/selectedRecord']
			if(data.interview){
				this.$store.commit('questionnaireCode/generateDynamicCities',data.interview.regionProvince)
				this.$store.commit('questionnaireCode/generateDynamicBarangay',{
					city: data.interview.cityMunicipality,
					province: data.interview.regionProvince
				})
				this.regionProvince = data.interview.regionProvince
				this.cityMunicipality = data.interview.cityMunicipality
				this.barangay = data.interview.barangay
				this.classification = data.interview.classification
				this.status = data.interview.status
				this.isInterviewed = data.interview.isInterviewed
				this.farmerFirstName = data.profile.firstName
				this.farmerSurName = data.profile.lastName
				this.farmerMiddileInitial = data.profile.middleInitial
				this.confirmedBy = data.interview.confirmedByName
				this.position = data.interview.confirmedByPosition
			}
		}else{
			this.regionProvince = ''
			this.cityMunicipality = ''
			this.barangay = ''
			this.classification = ''
			this.status = ''
			this.isInterviewed = ''
			this.farmerFirstName = ''
			this.farmerSurName = ''
			this.farmerMiddileInitial = ''
			this.confirmedBy = ''
			this.position = ''
		}
	},
}
</script>
