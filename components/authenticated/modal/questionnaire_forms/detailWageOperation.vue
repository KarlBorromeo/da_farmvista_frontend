<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-input-container v-for="item in list" :key="item.key">
          <v-text-field
            v-model="formData[item.key]"
            :rules="numberRule"
            :label="item.label"
            type="number"
            min=0
          ></v-text-field>
        </form-input-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormInputContainer from '../../form/formInputContainer.vue'
export default {
  components: { FormInputContainer },
  data: () => ({
    valid: false,
    formData: {
        amntPaidLabor: '',
        goodsProvidedLabor: '',
        expectedWageOtherfarms: '',
        amntPaidCattleWithOperator: '',
        amntPaidCattleOnly: '',
        amntPaidManMachine: '',        
    },
    list: [
        {key:'amntPaidLabor',label: 'paid for labor' },
        {key:'goodsProvidedLabor',label: 'value of food, cigarettes and other' },
        {key:'expectedWageOtherfarms',label: 'expected wage other farms' },
        {key:'amntPaidCattleWithOperator',label: 'paid for cattle with operator' },
        {key:'amntPaidCattleOnly',label: 'paid for cattle only' },
        {key:'amntPaidManMachine',label: 'paid for Man-Machine' },
    ],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseInt(v) >= 0 || 'invalid value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      if (valid) {
        const data = this.getData()
        console.log('data: ', data)
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
        const data = {};
        for(let i=0; i<this.list.length; i++){
            const keyName = this.list[i].key;
            data[keyName] = this.formData[keyName];
        }
        return data;
    },
  },
}
</script>
