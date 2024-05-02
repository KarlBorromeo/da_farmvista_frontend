<template>
  <v-row
    class="d-flex justify-center align-center fill-height"
  >
    <v-col
    cols="10" xs="9" sm="8" md="6" lg="5" xl="4"
    class="text-center"
    id="form-container"
    >
        <h2 class="mb-2" style="color: #7C5B4B;">Log in</h2>    
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit"
          style="background-color: #E8DCCB"
          class="pa-4 rounded-sm"
          min-width="200px"
          elevation="29"
        >
        
          <v-text-field
            v-model="username"
            :counter="10"
            :rules="usernameRules"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>
          <v-btn block color="primary my-2" type="submit">Login</v-btn>
          <NuxtLink to="#" class="my-2">Forgot Password?</NuxtLink>
          <v-btn block color="success mt-2" type="button" @click="registerInstead">Register Account</v-btn>
        </v-form>
    </v-col>
  </v-row>
 
</template>

<script>
  export default {
  provide(){
    return{
      KEY: 'inject login',
    }
  },
    // layout:'authentication',
    data(){
      return{
      valid: false,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Passowrd is required',
      ],
      }
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async submit(){
        this.validate();
        if(this.username == '' || this.password == '' || !this.valid){    
          console.log('error');
        }else{
          const credentials = {
            username: this.username,
            password: this.password
          }
          this.$store.dispatch('auth/login',credentials)
        }
      },
      registerInstead(){
        this.$router.replace('/auth/register');
      },
      loginMethod(params){
        console.log('thisis login method from login vue',params)
      }
    },
    beforeMount(){
      this.$store.commit('udpateHeaderTitle','LOGIN');
    }
  }
</script>

<style scoped>
#form-container{
  background-color: white;
  border-radius: .5rem;
  box-shadow: 0 2px 3px 3px rgba(0, 0, 0, 0.2);
}
</style>