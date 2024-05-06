<template>
  <v-row class="d-flex justify-center align-center fill-height">
    <v-col
      cols="10"
      xs="8"
      sm="7"
      md="7"
      lg="6"
      class="text-center"
      id="form-container"
    >
      <v-row>
        <v-col cols="12" md="9" lg="6" class="pa-6">
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-row block align="center" justify="center">
                    <v-col
                      cols="8"
                      style="border-bottom: 2px solid #d9d9d9"
                      class="pa-0 ma-0"
                    >
                      <p class="caption ma-0 pa-0">
                        DATA-DRIVEN AGRICHAIN MANAGEMENT
                      </p>
                    </v-col>
                    <v-col
                      cols="4"
                      class="pa-0 ma-0"
                      style="display: flex; justify-content: center"
                    >
                      <auth-logo></auth-logo>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12" class="mb-0 pa-0">
                  <p
                    block
                    class="body-3 ma-0 mb-1 pa-0 font-weight-medium text-left"
                  >
                    Welcome
                  </p>
                  <p
                    block
                    class="headline ma-0 pa-0 font-weight-bold text-left"
                  >
                    Log In
                  </p>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    :counter="10"
                    label="Username"
                    required
                    placeholder="Your Username"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="pa-0 mb-2">
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    placeholder="Your Password"
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-btn dark color="primary" block @click="login">Log In</v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
        <v-col cols="3" lg="6" id="auth_bg" class="hidden-sm-and-down" />
      </v-row>
    </v-col>
    <snackbar-vue ref="snackbar" />
  </v-row>
</template>
<script>
import authLogo from '~/components/authentication/TheLogo.vue'
import snackbarVue from '~/components/snackbar.vue'
export default {
  components: { authLogo, snackbarVue },
  layout: 'authentication',
  data: () => ({
    valid: false,
    username: '',
    usernameRules: [
      (v) => !!v || 'Username is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    password: '',
    passwordRules: [(v) => !!v || 'Password is required'],
  }),
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    showBar(showBar) {
      this.showBar()
    },
    async login() {
      if (this.validate()) {
        const credentials = { username: this.username, password: this.password }
        try {
          await this.$store.dispatch('auth/login', credentials)
          this.$router.push('/dashboard')
        } catch (error) {
          this.$refs.snackbar.showBar(error, 'red')
        }
      }
    },
  },
  computed: {
    snackbarVisible() {
      return this.snackbar
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/fonts.css');
#form-container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 3px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
}
#auth_bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
#auth_bg {
  position: relative;
  background-image: url('~/assets/images/auth_bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border: 2px solid white;
  background-blend-mode: darken;
}
</style>
