<template>
  <v-card light class="pa-4">
    <div class="d-flex align-center justify-space-between pa-4">
      <h2 class="pa-0 ma-0 headline font-weight-bold">Create user Account</h2>
    </div>
    <v-divider />
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="success">Create</v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import FormOne from './questionnaire_forms/FormOne.vue'
import FormTwo from './questionnaire_forms/FormTwo.vue'

export default {
  components: { FormOne, FormTwo },
  data() {
    return {
      current: 'FormTwo',
      commodity: [{ title: 'Coffee' }, { title: 'Mango' }, { title: 'Cacao' }],
    }
  },
  methods: {
    clicked(item) {
      this.current = item
    },
  },
  computed: {
    tabOneValidated() {
      return !this.$store.getters['questionnaire/FormOneValidatedGetter']
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/fonts.css');
</style>
