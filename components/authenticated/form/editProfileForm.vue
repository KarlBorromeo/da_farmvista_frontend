<template>
	<v-card light class="pa-4">
		<div class="d-flex align-center justify-space-between pa-4">
			<h2 class="pa-0 ma-0 headline font-weight-bold">Edit Profile</h2>
		</div>
		<v-divider />
		<v-form ref="form" v-model="valid">
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-text-field
							v-model="username"
							:rules="requiredRule"
							label="username"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="email"
							:rules="requiredRule"
							label="Email"
							required
							type="email"
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="firstName"
							:rules="requiredRule"
							label="First Name"
							required
						></v-text-field>
					</v-col>
					<v-col cols="6">
						<v-text-field
							v-model="lastName"
							:rules="requiredRule"
							label="Last Name"
							required
							type="email"
						></v-text-field>
					</v-col>
					<v-col cols="6">
						<v-text-field
							v-model="middleName"
							:rules="requiredRule"
							label="Middle initial"
							required
						></v-text-field>
					</v-col>
					<form-radio-container title="Gender">
						<v-radio-group
							:rules="requiredRule"
							v-model="gender"
							class="pa-0 ma-0"
							row
						>
							<v-radio
								v-for="item in genderItems"
								:key="item"
								:label="item"
								:value="item"
								class="text-capitalize"
							></v-radio>
						</v-radio-group>
					</form-radio-container>
					<v-col cols="12">
						<v-text-field
							v-model="dateOfBirth"
							:rules="requiredRule"
							label="Date of birth"
							required
							type="date"
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="mobileNumber"
							:rules="mobileNumberRule"
							label="Mobile Number"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="address"
							:rules="requiredRule"
							label="Address"
							required
						></v-text-field>
					</v-col>
					<v-col cols="6">
						<v-text-field
							v-model="company"
							:rules="requiredRule"
							label="Company Name"
							required
						></v-text-field>
					</v-col>
					<v-col cols="6">
						<v-text-field
							v-model="jobPosition"
							:rules="requiredRule"
							label="jobPosition"
							required
						></v-text-field>
					</v-col>
				</v-row>
				<v-btn color="success" @click="validate" :disabled="!isModify"
					>Save</v-btn
				>
			</v-container>
			<snackbar ref="snackbar" />
		</v-form>
	</v-card>
</template>

<script>
import Snackbar from '~/components/snackbar.vue'
import formInputContainer from './formInputContainer.vue'
import formRadioContainer from './formRadioContainer.vue'
export default {
	components: { formInputContainer, Snackbar, formRadioContainer },
	data() {
		return {
			valid: false,
			username: '',
			email: '',
			firstName: '',
			lastName: '',
			middleName: '',
			mobileNumber: '',
			gender: '',
			dateOfBirth: '',
			address: '',
			company: '',
			jobPosition: '',
			genderItems: ['male', 'female', 'others'],
			requiredRule: [(v) => !!v || 'this field is required'],
			mobileNumberRule: [
				(v) => !!v || 'this field is required',
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
				},
			],
			isModify: false,
		}
	},
	methods: {
		async validate() {
			const valid = this.$refs.form.validate()
			if (valid) {
				try {
					const res = await this.$store.dispatch(
						'profile/updateProfileDetails',
						this.getData()
					)
					await this.fetchProfileDetails()
					this.$store.commit('auth/updateFirstname', this.firstName)
					this.$refs.snackbar.showBar(res, 'success')
				} catch (error) {
					this.$refs.snackbar.showBar(error, 'red')
				}
			}
		},
		getData() {
			return {
				username: this.username,
				email: this.email,
				firstName: this.firstName,
				lastName: this.lastName,
				middleName: this.middleName,
				mobileNumber: this.mobileNumber,
				gender: this.gender,
				dateOfBirth: this.dateOfBirth,
				address: this.address,
				company: this.company,
				jobPosition: this.jobPosition,
			}
		},
		toggleModify(bool) {
			this.isModify = bool
		},
		async fetchProfileDetails() {
			try {
				await this.$store.dispatch('profile/fetchCurrenUserDetails')
				const myProfile = this.$store.getters['profile/myProfileDetails']
				this.myProfile = myProfile
				this.username = myProfile.username
				this.email = myProfile.email
				this.firstName = myProfile.firstName
				this.lastName = myProfile.lastName
				this.middleName = myProfile.middleName
				this.mobileNumber = myProfile.mobileNumber
				this.gender = myProfile.gender
				this.dateOfBirth = myProfile.dateOfBirth
				this.address = myProfile.address
				this.company = myProfile.company
				this.jobPosition = myProfile.jobPosition
			} catch (error) {
				console.error(error)
				this.$refs.snackbar.showBar(error, 'red')
			}
		},
	},
	async beforeMount() {
		try {
			await this.fetchProfileDetails()
		} catch (error) {
			this.$refs.snackbar.showBar(error, 'red')
		}
	},
	watch: {
		username(newVal) {
			this.toggleModify(newVal !== this.myProfile.username ? true : false)
		},
		email(newVal) {
			this.toggleModify(newVal !== this.myProfile.email ? true : false)
		},
		firstName(newVal) {
			this.toggleModify(
				newVal !== this.myProfile.firstName ? true : false
			)
		},
		lastName(newVal) {
			this.toggleModify(newVal !== this.myProfile.lastName ? true : false)
		},
		address(newVal) {
			this.toggleModify(newVal !== this.myProfile.address ? true : false)
		},
		company(newVal) {
			this.toggleModify(newVal !== this.myProfile.company ? true : false)
		},
		jobPosition(newVal) {
			this.toggleModify(
				newVal !== this.myProfile.jobPosition ? true : false
			)
		},
	},
}
</script>
