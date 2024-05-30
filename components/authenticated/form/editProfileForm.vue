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
                    v-model="userName"
                    :rules="requiredRule"
                    label="Username"
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
                <v-col cols="6">
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
                    v-model="position"
                    :rules="requiredRule"
                    label="Position"
                    required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-btn color="success" @click="validate" :disabled="!isModify">Save</v-btn>
        </v-container>
        <snackbar ref="snackbar"/>
    </v-form>
   </v-card>
</template>

<script>
import Snackbar from '~/components/snackbar.vue'
import formInputContainer from './formInputContainer.vue'
export default {
    components: { formInputContainer, Snackbar },
    data(){
        return{
            valid: false,
            userName: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            company: '',
            position: '',
            requiredRule: [
                (v) => !!v || 'this field is required'
            ],
            isModify: false
        }
    },
    methods: {
        validate(){
            this.$refs.form.validate()
        },
        getData(){
            return{
                myProfile: {},
                userName : this.userName,
                email : this.email,
                firstName : this.firstName,
                lastName : this.lastName,
                address : this.address,
                company : this.company,
                position : this.position
            }
        },
        toggleModify(bool){
            console.log(bool);
            this.isModify = bool;
        }
    },
    async beforeMount(){
        try{
            await this.$store.dispatch('profile/fetchCurrenUserDetails')
            const myProfile = this.$store.getters['profile/myProfileDetails']
            this.myProfile = myProfile
            this.userName = myProfile.username
            this.email = myProfile.email
            this.firstName = myProfile.firstName
            this.lastName = myProfile.lastName
            // this.address = myProfile.
            this.company = myProfile.company
            this.position = myProfile.jobPosition
        }catch(error){
            console.error(error)
            this.$refs.snackbar.showBar(error,'red')
        }
    },
    watch: {
        userName(newVal){
            this.toggleModify(newVal!== this.myProfile.userName?true:false)
        },
        email(newVal){
            this.toggleModify(newVal!== this.myProfile.email?true:false)
        },
        firstName(newVal){
            this.toggleModify(newVal!== this.myProfile.firstName?true:false)
        },
        lastName(newVal){
            this.toggleModify(newVal!== this.myProfile.lastName?true:false)
        },
        address(newVal){
            this.toggleModify(newVal!== this.myProfile.address?true:false)
        },
        company(newVal){
            this.toggleModify(newVal!== this.myProfile.company?true:false)
        },
        position(newVal){
            this.toggleModify(newVal!== this.myProfile.jobPosition?true:false)
        },
    }
}
</script>
