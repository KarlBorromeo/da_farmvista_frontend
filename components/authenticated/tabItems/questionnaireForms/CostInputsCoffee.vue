<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="item in list" :key="item.key">
        <v-row>
          <v-col cols="12">
            <p class="subheading ml-4 mt-5">{{ item.label }}</p>
          </v-col>
          
          <form-input-container v-if="item.specify">
            <v-text-field
              v-model="formData[item.key].name"
              label="specify"
            ></v-text-field>
          </form-input-container>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="formData[item.key].price"
              :rules="numberRule"
              label="Price/Unit"
              type="number"
              min="0"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formData[item.key].quantity"
              :rules="numberRule"
              label="Qty. Used"
              type="number"
              min="0"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select
              :items="unitItems"
              v-model="formData[item.key].unit"
              label="Unit"
              class="text-capitalize"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData[item.key].totalTransportCost"
              :rules="numberRule"
              label="Total Transport Used"
              type="number"
              min="0"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData[item.key].totalCost"
              :rules="numberRule"
              label="Total Cost"
              type="number"
              min="0"
            ></v-text-field>
          </v-col>
          <form-radio-container title="Cash/Credit">
            <v-radio-group
              v-model="formData[item.key].cashCredit"
              class="pa-0 ma-0"
              row
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
              label="Source Input/Place Purchased"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
export default {
  activated(){
    this.validate()
  },
  components: {
    formCard,
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    unitItems: ['kg', 'L', 'm', 'gal', 'pcs', 'sack', 'n/a'],
    formData: {
      plantingMaterials: {
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      fertilizerUrea: {
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      fertilizerComplete: {
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      fertilizerAmmosul: {
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      fertilizerAmmophos: {
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      fertilizerSolophos: {
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      fertilizerMop: {
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      fertilizerAnimalManure: {
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      fertilizerOthers: {
        name: '',
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      lime: {
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      insecticide: {
        name: '',
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      herbicide: {
        name: '',
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      fungicide: {
        name: '',
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
      },
      others: {
        name: '',
        price: '',
        quantity: '',
        unit: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: '',
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
    numberRule: [(v) => parseInt(v) >= 0 || 'invalid value'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
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
          unit: this.formData[keyName].unit,
          totalTransportCost: parseInt(
            this.formData[keyName].totalTransportCost
          ),
          totalCost: parseFloat(this.formData[keyName].totalCost),
          cashCredit: this.formData[keyName].cashCredit,
          sourceInputPurchased: this.formData[keyName].sourceInputPurchased,
        }
        if (this.list[i].specify) {
          const obj = { name: this.formData[keyName].name }
          data[keyName] = { ...data[keyName], ...obj }
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
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        this.formData[keyName].price = data.costInputCoffee[keyName].price
        this.formData[keyName].quantity = data.costInputCoffee[keyName].quantity
        this.formData[keyName].unit = data.costInputCoffee[keyName].unit
        this.formData[keyName].totalTransportCost =
          data.costInputCoffee[keyName].totalTransportCost
        this.formData[keyName].totalCost =
          data.costInputCoffee[keyName].totalCost
        this.formData[keyName].cashCredit =
          data.costInputCoffee[keyName].cashCredit
        this.formData[keyName].sourceInputPurchased =
          data.costInputCoffee[keyName].sourceInputPurchased
        if (this.list[i].specify) {
          this.formData[keyName].name = data.costInputCoffee[keyName].name
        }
      }
    } else {
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        this.formData[keyName].price = 0
        this.formData[keyName].quantity = 0
        this.formData[keyName].unit = ''
        this.formData[keyName].totalTransportCost = 0
        this.formData[keyName].totalCost = 0
        this.formData[keyName].cashCredit = ''
        this.formData[keyName].sourceInputPurchased = ''
        if (this.list[i].specify) {
          this.formData[keyName].name = ''
        }
      }
    }
  },
}
</script>
