<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container>
          <v-text-field
            v-model="coffee"
            :rules="requiredRule"
            label="* Coffee"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="crops"
            :rules="requiredRule"
            label="* Crops (other than coffee such as cacao, etc.)"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="livestock"
            :rules="requiredRule"
            label="* Livestock (pigs, cattle, chicken)"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="agroforestry"
            :rules="requiredRule"
            label="* Agroforestry (falcata, rubber, coconut)"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="otherLivelihood"
            :rules="requiredRule"
            label="* Other Livelihood (vermicomposting, organic fertilizer)"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="nonFarmIncome"
            :rules="requiredRule"
            label="* Non-farm Income (Salaries, Business)"
            type="number"
          ></v-text-field>
        </form-input-container>

        <form-input-container>
          <v-text-field
            v-model="otherSources"
            :rules="requiredRule"
            label="* Other Sources (Remittance, Pension, 4Ps)"
            type="number"
          ></v-text-field>
        </form-input-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
export default {
  components: { FormInputContainer },
  data: () => ({
    valid: false,
    coffee: 100,
    crops: 100,
    livestock: 100,
    agroforestry: 100,
    otherLivelihood: 100,
    nonFarmIncome: 100,
    otherSources: 100,
    requiredRule: [
      (v) => !!v || 'This field is required',
      (v) => parseInt(v) >= 0 || 'invalid value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'FarmIncomeValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'farmSourceIncome',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        coffee: this.coffee,
        crops: this.crops,
        livestock: this.livestock,
        agroforestry: this.agroforestry,
        otherLivelihood: this.otherLivelihood,
        nonFarm: this.nonFarmIncome,
        otherSource: this.otherSources,
      }
    },
  },
  watch: {
    coffee() {
      this.validate()
    },
    crops() {
      this.validate()
    },
    livestock() {
      this.validate()
    },
    agroforestry() {
      this.validate()
    },
    otherLivelihood() {
      this.validate()
    },
    nonFarmIncome() {
      this.validate()
    },
    otherSources() {
      this.validate()
    },
  },
}
</script>
