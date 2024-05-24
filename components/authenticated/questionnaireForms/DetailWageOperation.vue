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
            min="0"
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
    formData: {
      amntPaidLabor: '0',
      goodsProvidedLabor: '0',
      expectedWageOtherfarms: '0',
      amntPaidCattleWithOperator: '0',
      amntPaidCattleOnly: '0',
      amntPaidManMachine: '0',
    },
    list: [
      { key: 'amntPaidLabor', label: 'paid for labor' },
      {
        key: 'goodsProvidedLabor',
        label: 'value of food, cigarettes and other',
      },
      { key: 'expectedWageOtherfarms', label: 'expected wage other farms' },
      {
        key: 'amntPaidCattleWithOperator',
        label: 'paid for cattle with operator',
      },
      { key: 'amntPaidCattleOnly', label: 'paid for cattle only' },
      { key: 'amntPaidManMachine', label: 'paid for Man-Machine' },
    ],
    numberRule: [
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
    tempValue: ''
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'DetailWageOperationValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'detailWageOperation',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      const data = {}
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        data[keyName] = parseInt(this.formData[keyName])
      }
      return data
    },
  },
  watch: {
    formData: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
    tempValue(){
      this.validate()
    }
  },
  beforeMount() {
    const data =  this.$store.getters['profiling/selectedRecord']
    if(Object.keys(data).length > 0){
      this.formData.amntPaidLabor = data.detailWageOperation.amntPaidLabor
      this.formData.goodsProvidedLabor = data.detailWageOperation.goodsProvidedLabor
      this.formData.expectedWageOtherfarms = data.detailWageOperation.expectedWageOtherfarms
      this.formData.amntPaidCattleWithOperator = data.detailWageOperation.amntPaidCattleWithOperator
      this.formData.amntPaidCattleOnly = data.detailWageOperation.amntPaidCattleOnly
      this.formData.amntPaidManMachine = data.detailWageOperation.amntPaidManMachine
    }else{
      this.formData.amntPaidLabor = ''
      this.formData.goodsProvidedLabor = ''
      this.formData.expectedWageOtherfarms = ''
      this.formData.amntPaidCattleWithOperator = ''
      this.formData.amntPaidCattleOnly = ''
      this.formData.amntPaidManMachine = ''
    }
    this.tempValue = "tempValue"
  },
}
</script>
