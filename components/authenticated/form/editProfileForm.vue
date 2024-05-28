<template>
   <v-card light class="pa-4">
    <div class="d-flex align-center justify-space-between pa-4">
      <h2 class="pa-0 ma-0 headline font-weight-bold">Edit Profile</h2>
    </div>
    <v-divider />
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                    v-model="userName"
                    :rules="requiredRule"
                    label="Username"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
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
            <v-btn color="success" @click="validate">Save</v-btn>
        </v-container>
    </v-form>
   </v-card>
</template>

<script>
import formInputContainer from './formInputContainer.vue'
export default {
    components: { formInputContainer },
    data(){
        return{
            userName: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            company: '',
            position: '',
            requiredRule: [
                (v) => !!v || 'this field is required'
            ]
        }
    },
    methods: {
        validate(){
            this.$refs.form.validate()
        }
    }

}
</script>
