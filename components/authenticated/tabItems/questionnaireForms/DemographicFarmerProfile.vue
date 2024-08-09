<template>
	<v-form ref="form" v-model="valid">
		<v-container>
			<v-row>
				<v-col cols="12" sm="4">
					<v-text-field
						v-model="farmerFirstName"
						:rules="requiredRule"
						label="* Farmer's Firstname"
						required
					></v-text-field>
				</v-col>

				<v-col cols="12" sm="4">
					<v-text-field
						v-model="farmerSurName"
						:rules="requiredRule"
						label="* Farmer's Surname"
						required
					></v-text-field>
				</v-col>

				<v-col cols="12" sm="4">
					<v-text-field
						v-model="farmerMiddileInitial"
						label="Farmer's Middle Initial"
						counter="1"
						maxlength="1"
					></v-text-field>
				</v-col>

				<v-col cols="12" sm="6">
					<v-text-field
						v-model="contactNumber"
						:rules="contactNumberRule"
						label="Farmer's Phone Number"
						counter="11"
						maxlength="11"
					></v-text-field>
				</v-col>

				<v-col cols="12" sm="6">
					<v-text-field
						v-model="dialectSpoken"
						:rules="requiredRule"
						label="* Dialect Spoken"
					></v-text-field>
				</v-col>
				
				<v-col cols="12" sm="2">
					<v-text-field
						v-model="age"
						:rules="ageRule"
						label="* Age"
						type="number"
						required
					></v-text-field>
				</v-col>
				<v-spacer />
				<v-col cols="12" sm="2">
					<v-row justify="center">
						<form-radio-container title="Sex" :required="true">
							<v-radio-group :rules="requiredRule" v-model="sex" class="pa-0 ma-0" row>
								<v-radio
								v-for="item in sexItems"
								:key="item"
								:label="item"
								:value="item"
								class="display: inline-block"
								></v-radio>
							</v-radio-group>
						</form-radio-container>						
					</v-row>
				</v-col>
				<v-spacer />
				<v-col cols="12" sm="6">
					<v-row justify="center">
						<form-radio-container title="Civil Status" :required="true">
							<v-radio-group
								:rules="requiredRule"
								v-model="civilStatus"
								class="pa-0 ma-0"
								row
							>
								<v-radio
								v-for="item in civilStatusItems"
								:key="item"
								:label="item"
								:value="item"
								></v-radio>
							</v-radio-group>
						</form-radio-container>					
					</v-row>
				</v-col>
					
				<v-col cols="12" sm="6">
					<v-text-field
						v-model="religion"
						:rules="requiredRule"
						label="* Religion"
						required
					></v-text-field>
				</v-col>

				<v-col cols="12" sm="6">
					<v-select
						:items="highestEducationAttainedItems"
						v-model="highestEducationAttained"
						:rules="requiredRule"
						label="* Highest Educational Attainment"
						required
						class="text-capitalize"
					></v-select>
				</v-col>

				<v-col cols="12" sm="4">
					<v-select
						v-model="regionProvince"
						:items="regionProvinceItems"
						label="* Province"
						dense
						class="text-capitalize"
						:rules="requiredRule"
						required
					></v-select>
				</v-col>

				<v-col cols="12" sm="4">
					<v-select
						v-model="cityMunicipality"
						:items="cities"
						label="* City/Municipality"
						dense
						class="text-capitalize"
						:rules="requiredRule"
						required
					></v-select>
				</v-col>

				<v-col cols="12" sm="4">
					<v-select
						v-model="barangay"
						:items="barangays"
						label="* Barangay"
						dense
						class="text-capitalize"
						:rules="requiredRule"
						required
					></v-select>
				</v-col>

				<v-col cols="12">
					<v-text-field
						v-model="farmerCode"
						label="Farmer's Code Number (If registered)"
					></v-text-field>
				</v-col>

				<form-radio-container
					title="Belongs to the Marginalized Sector"
					:required="true"
					>
					<v-radio-group
						:rules="requiredRule"
						v-model="isBelongMarginalizedSector"
						class="py-0 my-0"
						row
					>
						<v-radio
						v-for="item in isBelongMarginalizedSectorItems"
						:key="item"
						:label="item"
						:value="item"
						></v-radio>
					</v-radio-group>
				</form-radio-container>

				<form-checkbox-container
					v-if="isBelongMarginalizedSector == 'no'"
					title="If you answered 'no' to the previous question: please specify"
					:required="true"
					>
					<v-checkbox
						v-for="item in nonMarginalizedSectorItems"
						v-model="nonMarginalizedSector"
						:key="item"
						:value="item"
						:label="item"
						class="ma-0 pa-0"
					></v-checkbox>
					<v-text-field
						v-if="isOtherTicked(nonMarginalizedSector)"
						v-model="nonMarginalizedSectorOthers"
						label="* please specify"
					></v-text-field>
				</form-checkbox-container>

				<form-radio-container
					title="Member of a farmer organization or cooperative?"
					:required="true"
					>
					<v-radio-group
						:rules="requiredRule"
						v-model="isMemberOrgranization"
						class="py-0 my-0"
						row
					>
						<v-radio
						v-for="item in isMemberOrgranizationItems"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						></v-radio>
					</v-radio-group>
				</form-radio-container>

				<form-radio-container
					v-if="isMemberOrgranization == 'yes'"
					title=" If you answered 'yes' to the previous question, select type of Membership"
					:required="true"
					:rules="requiredRule"
					>
					<v-radio-group v-model="typeMembership" :rules="requiredRule" class="py-0 my-0" row>
						<v-radio
						v-for="item in typeMembershipItems"
						:key="item"
						:label="item"
						:value="item"
						></v-radio>
					</v-radio-group>
					</form-radio-container>

					<form-input-container v-if="isMemberOrgranization == 'yes'">
					<v-text-field
						:rules="requiredRule"
						v-model="organizationName"
						label="* Name of Organization/Cooperative:"
					></v-text-field>
				</form-input-container>

				<form-radio-container
					title="Any household member affiliated to any farming organization/association?"
					:required="true"
					row
					>
					<v-radio-group v-model="isAnyHouseholdMemberOrg" :rules="requiredRule" class="py-0 my-0" row>
						<v-radio
						v-for="item in isAnyHouseholdMemberOrgItems"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						></v-radio>
					</v-radio-group>
				</form-radio-container>

				<!-- <form-radio-container title="Classification" :required="true">
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

				<form-input-container v-if="status == 'inactive'">
					<v-textarea
						v-model="reasonForStopCoffeeFarm"
						:rules="requiredRule"
						label="* Reason for Stopping Farming"
						required
						rows="2"
					/>
				</form-input-container>
				
				<v-col cols="12" sm="6">
					<v-text-field
						v-model="confirmedBy"
						:rules="requiredRule"
						label="* Confirmed by (Name):"
						required
					></v-text-field>
				</v-col>

				<v-col cols="12" sm="6">
					<v-text-field
						v-model="position"
						:rules="requiredRule"
						label="* Confirmed by (Position):"
						required
					></v-text-field>
				</v-col> -->
			</v-row>
		</v-container>
		<!-- <v-btn @click="validate">Validate</v-btn> -->
	</v-form>
</template>

<script>
import formInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import { capitalizeEachWordAdvanced, concatOtherValueToList, isOtherValueTickedCheckbox, extractUnmatchedValueCheck } from '~/reusableFunctions/questionnaireValidation'
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
		// classification: '',
		// classificationItems: [],
		// status: '',
		// statusItems: [],
		// reasonForStopCoffeeFarm: '',
		farmerFirstName: '',
		farmerSurName: '',
		farmerMiddileInitial: '',
		// confirmedBy: '',
		// position: '',
		requiredRule: [(v) => !!v || 'this field is required'],
		contactNumber: '',
		farmerCode: '',
		contactNumberRule: [
			(v) => {
				if (v) {
				if (v.length == 11 && v[0] == '0' && v[1] == '9') {
					return true
				} else {
					return 'must be (09123456789) format'
				}
				} else {
				return true
				}
			}
		],
		age: 35,
    ageRule: [
      (v) => {
        if (v) {
          if (v > 0 && v < 100) {
            return true
          }
          return 'Age must be more than 0 and less than 100'
        }
        return 'Age is required'
      },
    ],
    sex: '',
    sexItems: [],
    civilStatus: '',
    civilStatusItems: [],
    religion: '',
    highestEducationAttained: '',
    highestEducationAttainedItems: [],
    isBelongMarginalizedSector: '',
    isBelongMarginalizedSectorItems: ['yes', 'no'],
    nonMarginalizedSector: [],
    nonMarginalizedSectorOthers: '',
    nonMarginalizedSectorItems: [],
    dialectSpoken: '',
    isMemberOrgranization: '',
    isMemberOrgranizationItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    typeMembership: '',
    typeMembershipItems: [],
    organizationName: '',
    isAnyHouseholdMemberOrg: '',
    isAnyHouseholdMemberOrgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    listRule: [(v) => v.length > 0 || 'This field is required'],
	}),
	methods: {
		/* test if the form is valid, return boolean */
		async validate() {				
			const textRadioValid = this.$refs.form.validate();
			const checkboxValid = this.validateCheckbox()
			const conditialFieldValid = this.validateConditionalFields()
			if (textRadioValid && checkboxValid && conditialFieldValid) {
				this.$store.commit('questionnaire/saveData', {
					keyName: 'interview',
					data: this.getData(),
				})
				const fullname = this.concatFullName(this.farmerFirstName,this.farmerMiddileInitial,this.farmerSurName)
				this.$store.commit('questionnaire/saveSelfFarmerFullname',fullname)
				this.$store.commit('questionnaire/saveIsHouseMemberAffiliatedToOrg',this.isAnyHouseholdMemberOrg)
				this.$store.commit('questionnaire/saveSelfFarmerOrganization',{
					isMemberFarmerOrganization: this.isMemberOrgranization,
					organizationTypeMembership: this.typeMembership,
					organizationName: this.organizationName,
				})
			}
			this.$store.commit('questionnaire/toggleNextTab', {
				tabName: 'DemographicFarmerProfile',
				valid: true,
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
			let obj = {
				regionProvince : this.regionProvince,
				cityMunicipality : this.cityMunicipality,
				barangay : this.barangay,
				// classification : this.classification,
				// status : this.status,
				// reasonForStopCoffeeFarm: this.reasonForStopCoffeeFarm,
				firstName : this.farmerFirstName,
				lastName : this.farmerSurName,
				middleInitial : this.farmerMiddileInitial,
				// confirmedByName : this.confirmedBy,
				// confirmedByPosition : this.position,
				contactNumber: this.contactNumber,
        		farmerCode: this.farmerCode ? this.farmerCode : '',	
				age: parseInt(this.age),
				sex: this.sex,
				civilStatus: this.civilStatus,
				religion: this.religion,
				highestEducationAttained: this.highestEducationAttained,
				isBelongMarginalizedSector: this.isBelongMarginalizedSector,
				ifNoMarginalizedSectorName: concatOtherValueToList(
				this.nonMarginalizedSector,
				this.nonMarginalizedSectorOthers
				),
				dialectSpoken: this.dialectSpoken,
				isMemberFarmerOrganization: this.isMemberOrgranization,
				organizationTypeMembership: this.typeMembership,
				organizationName: this.organizationName,
				isHouseMemberAffiliatedToOrg: this.isAnyHouseholdMemberOrg,	
			}

			/* tests if we already save an inteview details data into the store inside the surveyInformation tab*/
			// const existingInterviewDetails = this.$store.getters['questionnaire/form'].interview
			// if(existingInterviewDetails && existingInterviewDetails.dateOfInterview){
			// 	obj = {
			// 		...obj,
			// 		dateOfInterview: existingInterviewDetails.dateOfInterview,
			// 		surveyNo: existingInterviewDetails.surveyNo,
			// 		validatorName: existingInterviewDetails.validatorName,
			// 		interviewStart: existingInterviewDetails.interviewStart,
			// 		interviewEnd: existingInterviewDetails.interviewEnd
			// 	}
				
			// }
			return obj
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
		/* validate checkbox if empty or not */
		validateCheckbox() {
			if (
				this.isBelongMarginalizedSector == 'no' &&
				this.nonMarginalizedSector.length == 0
			) {
				return false
			} else if (
				this.nonMarginalizedSector.includes('others') &&
				!this.nonMarginalizedSectorOthers
			) {
				return false
			} else {
				return true
			}
		},
		/* validate conditional fields if empty or not */
		validateConditionalFields() {
			if (
				this.isMemberOrgranization == 'yes' &&
				(this.typeMembership == '' || this.organizationName == '')
			) {
				return false
			}
			return true
		},
		/* call the this.validate if the dom was done rendering the form  */
		validteAfterVueTick(){
			this.$nextTick(async () => {
				await this.validate();
			});
		},
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
			this.validteAfterVueTick()
		},
		cityMunicipality(val,oldVal){
			this.$store.commit('questionnaireCode/generateDynamicBarangay',{
				city: val,
				province: this.regionProvince
			})
			if(!!oldVal){
				this.barangay = ''			
			}
			this.validteAfterVueTick()
		},
		barangay(){
			this.validteAfterVueTick()
		},
		classification(){
			this.validteAfterVueTick()
		},
		// status(val){
		// 	if(val !== 'active'){
		// 		this.$store.commit('questionnaire/toggleIsSelfFarmerActive',false)
		// 	}else{
		// 		this.$store.commit('questionnaire/toggleIsSelfFarmerActive',true)
		// 	}
		// 	this.$store.commit('questionnaire/resetTabsValidity')
		// 	this.validteAfterVueTick()
		// },
		reasonForStopCoffeeFarm(){
			this.validteAfterVueTick()
		},
		farmerFirstName(){
			this.validteAfterVueTick()
		},
		farmerSurName(){
			this.validteAfterVueTick()
		},
		farmerMiddileInitial(){
			this.validteAfterVueTick()
		},
		confirmedBy(){
			this.validteAfterVueTick()
		},
		position(){
			this.validteAfterVueTick()
		},
		isBelongMarginalizedSector(value) {
			if (value == 'yes') {
				this.nonMarginalizedSector = []
			}
			this.validteAfterVueTick()
		},
		isMemberOrgranization(value) {
			if (value == 'no') {
				this.typeMembership = ''
				this.organizationName = ''
			}
			this.validteAfterVueTick()
		},
		age() {
			this.validteAfterVueTick()
		},
		sex() {
			this.validteAfterVueTick()
		},
		civilStatus() {
			this.validteAfterVueTick()
		},
		religion() {
			this.validteAfterVueTick()
		},
		highestEducationAttained() {
			this.validteAfterVueTick()
		},
		nonMarginalizedSector() {
			this.validteAfterVueTick()
		},
		dialectSpoken() {
			this.validteAfterVueTick()
		},
		typeMembership() {
			this.validteAfterVueTick()
		},
		organizationName(val) {
			this.validteAfterVueTick()
		},
		isAnyHouseholdMemberOrg() {
			this.validteAfterVueTick()
		},
		contactNumber() {
			this.validteAfterVueTick()
		},
		farmerCode() {
			this.validteAfterVueTick()
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

	async beforeMount() {
		this.nonMarginalizedSectorItems =
		this.$store.getters['questionnaireCode/MarginalizedSector']
		this.highestEducationAttainedItems =
		this.$store.getters['questionnaireCode/HighestEducationalAttainment']
		this.civilStatusItems = this.$store.getters['questionnaireCode/CivilStatus']
		this.sexItems = this.$store.getters['questionnaireCode/Sex']
		this.typeMembershipItems =
		this.$store.getters['questionnaireCode/MembershipType']
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
				this.regionProvince = capitalizeEachWordAdvanced(data.interview.regionProvince)
				this.cityMunicipality = capitalizeEachWordAdvanced(data.interview.cityMunicipality)
				this.barangay = capitalizeEachWordAdvanced(data.interview.barangay)
				// this.classification = data.interview.classification
				// this.status = data.interview.status
				this.farmerFirstName = data.profile.firstName
				this.farmerSurName = data.profile.lastName
				this.farmerMiddileInitial = data.profile.middleInitial
				// this.confirmedBy = data.interview.confirmedByName
				// this.position = data.interview.confirmedByPosition
				this.contactNumber = data.profile.contactNumber
      			this.farmerCode = data.profile.farmerCode
				this.age = data.profileGeneralInfo.age
				this.sex = data.profileGeneralInfo.sex
				this.civilStatus = data.profileGeneralInfo.civilStatus
				this.religion = data.profileGeneralInfo.religion
				this.highestEducationAttained =
				data.profileGeneralInfo.highestEducationAttained
				this.isBelongMarginalizedSector =
				data.profileGeneralInfo.isBelongMarginalizedSector
				this.nonMarginalizedSector = isOtherValueTickedCheckbox(
				data.profileGeneralInfo.ifNoMarginalizedSectorName,
				this.nonMarginalizedSectorItems
				)
				this.nonMarginalizedSectorOthers = extractUnmatchedValueCheck(
				data.profileGeneralInfo.ifNoMarginalizedSectorName,
				this.nonMarginalizedSectorItems
				)
				this.dialectSpoken = data.profileGeneralInfo.dialectSpoken
				this.isMemberOrgranization =
				data.profileGeneralInfo.isMemberFarmerOrganization
				this.typeMembership = data.profileGeneralInfo.organizationTypeMembership
				this.organizationName = data.profileGeneralInfo.organizationName
				this.isAnyHouseholdMemberOrg =
				data.profileGeneralInfo.isHouseMemberAffiliatedToOrg
			}
		}else{
			this.regionProvince = ''
			this.cityMunicipality = ''
			this.barangay = ''
			// this.classification = ''
			// this.status = ''
			this.farmerFirstName = ''
			this.farmerSurName = ''
			this.farmerMiddileInitial = ''
			this.confirmedBy = ''
			// this.position = ''
			// this.contactNumber = ''
     	 	this.farmerCode = ''
			this.age = ''
			this.sex = ''
			this.civilStatus = ''
			this.religion = ''
			this.highestEducationAttained = ''
			this.isBelongMarginalizedSector = ''
			this.nonMarginalizedSector = []
			this.dialectSpoken = ''
			this.isMemberOrgranization = ''
			this.typeMembership = ''
			this.organizationName = ''
			this.isAnyHouseholdMemberOrg = ''
		}
	},
}
</script>
