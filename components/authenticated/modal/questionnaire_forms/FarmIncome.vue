<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
        <v-row>  
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="coffee"
                    :rules="requiredRule"
                    label="* Coffee"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="crops"
                    :rules="requiredRule"
                    label="* Crops (other than coffee such as cacao, etc.)"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="livestock"
                    :rules="requiredRule"
                    label="* Livestock (pigs, cattle, chicken)"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="agroforestry"
                    :rules="requiredRule"
                    label="* Agroforestry (falcata, rubber, coconut)"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="otherLivelihood"
                    :rules="requiredRule"
                    label="* Other Livelihood (vermicomposting, organic fertilizer)"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="nonFarmIncome"
                    :rules="requiredRule"
                    label="* Non-farm Income (Salaries, Business)"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="otherSources"
                    :rules="requiredRule"
                    label="* Other Sources (Remittance, Pension, 4Ps)"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="grandTotalAmt"
                    label="Grand Total"
                    type="number"
                    readonly
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    coffee: '',
    crops: '',
    livestock: '',
    agroforestry: '',
    otherLivelihood: '',
    nonFarmIncome: '',
    otherSources: '',
    grandTotal: '',
    requiredRule: [
        (v) => !!v || 'This field is required',
        (v) => parseInt(v) >= 0 || 'invalid value'
    ],
  }),
  methods:{
    /* test if the form is valid, return boolean */
    validate(){
      console.log('validated: ',this.$refs.form.validate());
    },
  },
  computed:{
    grandTotalAmt(){
        return parseInt(this.coffee) + parseInt(this.crops) + parseInt(this.livestock) + parseInt(this.agroforestry) + parseInt(this.otherLivelihood) + parseInt(this.nonFarmIncome) + parseInt(this.otherSources)
    }
  }
}
</script>
