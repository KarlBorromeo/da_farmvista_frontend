<template>
    <v-card light class="pa-4">
        <div class="d-flex align-center justify-space-between pa-4">
        <h2 class="pa-0 ma-0 headline font-weight-bold">Change Password</h2>
        </div>
        <v-divider />
        <v-container>
            <v-form ref="form" v-model="valid">
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                        v-model="oldPassword"
                        :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showOldPassword ? 'text' : 'password'"
                        name="input-10-1"
                        label="Old Password"
                        hint="Enter Old Password"
                        @click:append="showOldPassword = !showOldPassword"
                        :rules="required"
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        v-model="newPassword"
                        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showNewPassword ? 'text' : 'password'"
                        name="input-10-1"
                        label="New Password"
                        hint="Enter New Password"
                        @click:append="showNewPassword = !showNewPassword"
                        :rules="required"
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        v-model="comfirmedPassword"
                        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showNewPassword ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        hint="Confirm Password"
                        :rules="requiredMatched"
                        @click:append="showNewPassword = !showNewPassword"
                        />
                    </v-col>
                    <v-col>
                        <v-btn color="success" @click="validate">Save</v-btn>
                    </v-col>
                </v-row>
            </v-form>            
        </v-container>
        <snackbar ref="snackbar" />
    </v-card>
</template>

<script>
import Snackbar from '~/components/snackbar.vue'
export default{
    emits: ['emitCloseModal'],
    components: {Snackbar},
    data(){
        return{
            valid: false,
            showOldPassword: false,
            oldPassword: '',
            showNewPassword: false,
            newPassword: '',
            comfirmedPassword: '',
            required:[
                (v) => !!v || 'This field is required'
            ],
            requiredMatched: [
                (v) => v === this.newPassword || 'Password does not match'
            ]
        }
    },
    methods: {
        async validate(){
            const valid = this.$refs.form.validate()
            if(valid){
                try{
                    const res = await this.$store.dispatch('profile/updatePassword',this.getData())
                    this.$emit('emitCloseModal',res)
                }catch(error){
                    this.$refs.snackbar.showBar(error,'red')
                }
            }
        },
        getData(){
            return{
                password: this.oldPassword,
                newPassword: this.newPassword,
                confirmNewPassword: this.comfirmedPassword
            }
        }
    }
}
</script>
