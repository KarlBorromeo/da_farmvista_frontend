<template>
    <v-row
      class="d-flex justify-center align-center fill-height overflow-y-auto"
      style="min-height: 800px;"
    >
      <v-col
      cols="10" xs="9" sm="8" md="6" lg="5" xl="4"
      class="text-center"
      id="form-container"
      >
          <h2 class="mb-2" style="color: #7C5B4B;">Register</h2>
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
              v-model="firstname"
              :rules="nameRules"
              label="Firstname"
              required
            ></v-text-field>

            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Lastname"
              required
            ></v-text-field>

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

            <v-text-field
              v-model="confirmPassword"
              :rules="confirmPasswordRules"
              label="Confirm Password"
              required
            ></v-text-field>

            <v-select
              class="mt-3"
              :items="items"
              label="Standard"
              dense
            ></v-select>

            <v-btn block color="primary my-2" type="submit">Register</v-btn>
            <p class="pa-1 ma-0">Already have an account?</p>
            <v-btn block color="success mt-2" type="button" @click="loginInstead">Login Instead</v-btn>
          </v-form>
      </v-col>
    
    </v-row>
   
  </template>
  
  <script>
    export default {
      provide(){
        return{
          KEY: 'inject register',
        }
      },
      // layout:'authentication',
      data(){
        return{
          valid: false,
          username: '',
          usernameRules: [
            v => !!v || 'Userame is required',
            v => (v && v.length <= 10) || 'Username must be less than 10 characters',
          ],
          firstname: '',
          lastname: '',
          nameRules:[
              v => !!v || 'Name is required'
          ],
          password: '',
          passwordRules: [
            v => !!v || 'Password is required',
            v => {if(v.length < 7){
                      return 'Passowrd too short'
                  }else{
                  return true;
                  }   
              }
          ],
          confirmPassword: '',
          confirmPasswordRules: [
              v => !!v || 'Please confirm password',
              v => {if(this.password === v){
                      return true
                  }else{
                      return 'Password doesn\'t match'
                      }
                  }
              ],
          items: ['Field Validator','Super Admin','Admin','NPRB']
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
          if(this.username == '' || this.password == '' || this.firstname == '' || this.lastname == '' || this.confirmPassword == '' || !this.valid){    
            console.log('error');
          }else{
            const credentials = {
              firstname: this.firstname,
              lastname: this.lastname,
              username: this.username,
              password: this.confirmPassword
            }
            try{
              await this.$store.dispatch('auth/register',credentials);
            }catch(error){
              
            }
          }
        },
        loginInstead(){
            this.$router.replace('/auth/login')
        },
        registerMethod(param){
          console.log('thisis register method from register vue',param)
        }
      },
      beforeMount(){
        this.$store.commit('udpateHeaderTitle','REGISTER');
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