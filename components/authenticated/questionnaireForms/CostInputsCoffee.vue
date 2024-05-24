<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="item in list" :key="item.key">
        <v-row>
          <p class="text-camelcase subheading ml-4 mt-5">{{ item.label }}</p>
          <form-input-container v-if="item.specify">
            <v-text-field
              v-model="formData[item.key].name"
              :rules="requiredRule"
              label="* specify"
            ></v-text-field>
          </form-input-container>
          <form-input-container>
            <v-text-field
              v-model="formData[item.key].price"
              :rules="numberRule"
              label="* Price/Unit"
              type="number"
            ></v-text-field>
          </form-input-container>
          <form-input-container>
            <v-text-field
              v-model="formData[item.key].quantity"
              :rules="numberRule"
              label="* Qty. Used"
              type="number"
            ></v-text-field>
          </form-input-container>
          <form-input-container>
            <v-text-field
              v-model="formData[item.key].totalTransportCost"
              :rules="numberRule"
              label="* Total Transport Used"
              type="number"
            ></v-text-field>
          </form-input-container>
          <form-input-container>
            <v-text-field
              v-model="formData[item.key].totalCost"
              :rules="numberRule"
              label="* Total Cost"
              type="number"
            ></v-text-field>
          </form-input-container>
          <form-radio-container title="Cash/Credit">
            <v-radio-group
              :rules="requiredRule"
              v-model="formData[item.key].cashCredit"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in cashCreditItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
          <form-input-container>
            <v-text-field
              v-model="formData[item.key].sourceInputPurchased"
              :rules="requiredRule"
              label="* Source Input/Place Purchased"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
export default {
  components: {
    formCard,
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    formData: {
      plantingMaterials: {
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      fertilizerUrea: {
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      fertilizerComplete: {
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      fertilizerAmmosul: {
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      fertilizerAmmophos: {
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      fertilizerSolophos: {
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      fertilizerMop: {
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      fertilizerAnimalManure: {
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      fertilizerOthers: {
        name: 'sample specified',
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      lime: {
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      insecticide: {
        name: 'sample specified',
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      herbicide: {
        name: 'sample specified',
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      fungicide: {
        name: 'sample specified',
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
      others: {
        name: 'sample fertilizer other',
        price: '100',
        quantity: '100',
        totalTransportCost: '100',
        totalCost: '100',
        cashCredit: 'cash',
        sourceInputPurchased: '100',
      },
    },
    list: [
      {
        key: 'plantingMaterials',
        label: 'Planting Material',
        specify: false,
      },
      { key: 'fertilizerUrea', label: 'Fertilizer Urea', specify: false },
      {
        key: 'fertilizerComplete',
        label: 'Fertilizer Complete',
        specify: false,
      },
      {
        key: 'fertilizerAmmosul',
        label: 'Fertilizer AmmoSul',
        specify: false,
      },
      {
        key: 'fertilizerAmmophos',
        label: 'Fertilizer AmmoPhos',
        specify: false,
      },
      {
        key: 'fertilizerSolophos',
        label: 'Fertilizer Solophos',
        specify: false,
      },
      { key: 'fertilizerMop', label: 'Fertilizer MOP', specify: false },
      {
        key: 'fertilizerAnimalManure',
        label: 'Fertizer Animal Manure',
        specify: false,
      },
      {
        key: 'fertilizerOthers',
        label: 'Fertilizer Other',
        specify: true,
      },
      { key: 'lime', label: 'Lime', specify: false },
      { key: 'insecticide', label: 'Insecticie', specify: true },
      { key: 'herbicide', label: 'Herbicide', specify: true },
      { key: 'fungicide', label: 'Fungicide', specify: true },
      { key: 'others', label: 'Other', specify: true },
    ],
    cashCreditItems: ['cash', 'credit', 'n/a'],
    requiredRule: [(v) => !!v || 'this field is required'],
    numberRule: [
      (v) => !!v || 'this field is required',
      (v) => parseInt(v) >= 0 || 'invalid value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'CostInputsCoffeeValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'costInputCoffee',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      const data = {}
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        data[keyName] = {
          price: parseInt(this.formData[keyName].price),
          quantity: parseInt(this.formData[keyName].quantity),
          totalTransportCost: parseInt(this.formData[keyName].totalTransportCost),
          totalCost: parseFloat(this.formData[keyName].totalCost),
          cashCredit: this.formData[keyName].cashCredit,
          sourceInputPurchased: this.formData[keyName].sourceInputPurchased,
        }
        if(this.list[i].specify){
          const obj = { name: this.formData[keyName].name}
          data[keyName] = {...data[keyName], ...obj}
        }
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
  },
  beforeMount() {
    const data =  this.$store.getters['profiling/selectedRecord']
    if(Object.keys(data).length > 0){
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        this.formData[keyName].price = data.costInputCoffee[keyName].price
        this.formData[keyName].quantity = data.costInputCoffee[keyName].quantity
        this.formData[keyName].totalTransportCost = data.costInputCoffee[keyName].totalTransportCost
        this.formData[keyName].totalCost = data.costInputCoffee[keyName].totalCost
        this.formData[keyName].cashCredit = data.costInputCoffee[keyName].cashCredit
        this.formData[keyName].sourceInputPurchased = data.costInputCoffee[keyName].sourceInputPurchased
        if(this.list[i].specify){
          this.formData[keyName].name = data.costInputCoffee[keyName].name
        }
      }
    }else{
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        this.formData[keyName].price = ''
        this.formData[keyName].quantity = ''
        this.formData[keyName].totalTransportCost =  ''
        this.formData[keyName].totalCost = ''
        this.formData[keyName].cashCredit = ''
        this.formData[keyName].sourceInputPurchased = ''
        if(this.list[i].specify){
          this.formData[keyName].name = ''
        }
      }
    }
  }
}
</script>
