<template>
  <v-card light class="pa-4">
    <div class="d-flex align-center justify-space-between pa-4">
      <h2 class="pa-0 ma-0 headline font-weight-bold">Create user Account</h2>
    </div>
    <v-divider />
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <form-input-container>
            <v-text-field
              v-model="firstName"
              :rules="requiredRule"
              label="First name"
              required
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="lastName"
              :rules="requiredRule"
              label="Last name"
              required
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="middleName"
              :rules="requiredRule"
              label="Middle name"
              required
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="User type">
            <v-radio-group
              :rules="requiredRule"
              v-model="type"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in typeItems"
                :key="item"
                :label="item"
                :value="item"
                class="text-capitalize"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="email"
              :rules="requiredRule"
              label="Email"
              required
              type="email"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="mobileNumber"
              :rules="requiredRule"
              label="Mobile Number"
              required
              type="email"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="dateOfBirth"
              :rules="requiredRule"
              label="Date of Birth"
              required
              type="date"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="address"
              :rules="requiredRule"
              label="Address"
              required
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Gender">
            <v-radio-group
              :rules="requiredRule"
              v-model="gender"
              class="pa-0 ma-0"
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

          <form-input-container>
            <v-text-field
              v-model="company"
              :rules="requiredRule"
              label="Company"
              required
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="jobPosition"
              :rules="requiredRule"
              label="Job Position"
              required
            ></v-text-field>
          </form-input-container>
        </v-row>
        <v-btn color="success" @click="createAccount" :disabled="isLoading"
          >Create</v-btn
        >
      </v-container>
    </v-form>
    <snackbar ref="snackbar" />
  </v-card>
</template>

<script>
import Snackbar from '~/components/snackbar.vue'
import formInputContainer from '../form/formInputContainer.vue'
import FormRadioContainer from '../form/formRadioContainer.vue'
export default {
  components: { formInputContainer, FormRadioContainer, Snackbar },
  emits: ['emitCloseModal'],
  data() {
    return {
      isLoading: false,
      lastName: 'a',
      firstName: 'a',
      middleName: 'a',
      type: 'admin',
      username: '',
      email: 'aw@gmail.com',
      mobileNumber: '09123456789',
      dateOfBirth: '2000-05-11',
      address: 'Ampayon',
      gender: 'male',
      genderItems: ['male', 'female', 'others'],
      company: 'aw',
      jobPosition: 'aw',
      requiredRule: [(v) => !!v || 'this field is required'],
    }
  },
  computed: {
    typeItems() {
      const currentUserType = localStorage.getItem('type')
      if (currentUserType !== 'superadmin') {
        return ['admin', 'enumerator']
      }
      return ['superadmin', 'admin', 'enumerator']
    },
  },
  methods: {
    validate() {
      console.log(this.$refs.form.validate())
      return this.$refs.form.validate()
    },
    async createAccount() {
      const valid = this.validate()
      if (valid) {
        try {
          this.isLoading = true
          const credentials = this.getData()
          let res = await this.$store.dispatch(
            'users/createAccount',
            credentials
          )
          this.$emit('emitCloseModal', res)
        } catch (error) {
          this.$refs.snackbar.showBar(error, 'red')
        }
        this.isLoading = false
      }
    },
    getData() {
      return {
        lastName: this.lastName,
        firstName: this.firstName,
        middleName: this.middleName,
        type: this.type,
        email: this.email,
        mobileNumber: this.mobileNumber,
        dateOfBirth: this.dateOfBirth,
        address: this.address,
        gender: this.gender,
        company: this.company,
        jobPosition: this.jobPosition,
      }
    },
  },
  beforeMount() {
    if (this.isUpdateProps) {
      alert('fetch record of current user')
    }
  },
}
</script>

<style scoped>
@import url('~/assets/css/fonts.css');
</style>
