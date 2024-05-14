<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="item in list" :key="item.key">
        <p class="my-2 pb-0 font-weight-medium" v-if="!item.radio">
          {{ item.title }}
        </p>
        <v-row>
          <form-input-container v-if="!item.radio">
            <v-text-field
              v-model="formData[item.key].variable"
              :rules="requiredRule"
              label="* Details"
              :type="item.type"
            ></v-text-field>
          </form-input-container>
          <form-radio-container v-else :title="item.title">
            <v-text-field
              v-model="formData[item.key].variable"
              :rules="requiredRule"
              class="requiredFieldHidden"
            />
            <v-radio-group
              v-model="formData[item.key].variable"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in farmFinancingItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <div
                v-if="!formData[item.key].variable"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>
          <form-input-container>
            <v-text-field
              v-model="formData[item.key].remarks"
              :rules="requiredRule"
              label="* Reason for using"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../form/formCard.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
export default {
  components: {
    formCard,
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    formData: {
      costProductSortingClassification: {
        variable: '',
        remarks: '',
      },
      qtyCoffeeCherriesHarvested: {
        variable: '',
        remarks: '',
      },
      qtySoldDriedGreenCoffee: {
        variable: '',
        remarks: '',
      },
      qtyUnsoldDefect: {
        variable: '',
        remarks: '',
      },
      priceReceived: {
        variable: '',
        remarks: '',
      },
      totalSale: {
        variable: '',
        remarks: '',
      },
      qtyStoredHumanConsumption: {
        variable: '',
        remarks: '',
      },
      qtyGivenToOther: {
        variable: '',
        remarks: '',
      },
      marketingOutlet: {
        variable: '',
        remarks: '',
      },
      marketQualityPreference: {
        variable: '',
        remarks: '',
      },
      howBringToMarketingOutlet: {
        variable: '',
        remarks: '',
      },
      costTransportQtySold: {
        variable: '',
        remarks: '',
      },
      totalReceiptsReceived: {
        variable: '',
        remarks: '',
      },
    },
    list: [
      {
        key: 'costProductSortingClassification',
        type: 'number',
        title: 'Cost Product sorting/clasification (per kg)',
      },
      {
        key: 'qtyCoffeeCherriesHarvested',
        type: 'number',
        title: 'Qty. Coffee cherries, harvested (kg)',
      },
      {
        key: 'qtySoldDriedGreenCoffee',
        type: 'number',
        title: 'Qty. sold (Kg)-dried, green coffee beans',
      },
      {
        key: 'qtyUnsoldDefect',
        type: 'number',
        title: 'Qty. unsold (Kg)-with defects',
      },
      {
        key: 'priceReceived',
        type: 'number',
        title: 'Price received (Php/Kg)',
      },
      { key: 'totalSale', type: 'number', title: 'Total Sale(11.3 * 11.5)' },
      {
        key: 'qtyStoredHumanConsumption',
        type: 'number',
        title: 'Qty. stored for human consumption',
      },
      {
        key: 'qtyGivenToOther',
        type: 'number',
        title: 'Qty given to other if ther is any',
      },
      { key: 'marketingOutlet', type: 'text', title: 'Marketing outlet' },
      {
        key: 'marketQualityPreference',
        type: 'text',
        title: 'market quality preference',
      },
      {
        key: 'howBringToMarketingOutlet',
        type: 'text',
        title: 'How did you bring product to marketing outlet',
        radio: 'true',
      },
      {
        key: 'costTransportQtySold',
        type: 'number',
        title: 'Cost of transport for qty. sold (Php)/harvesting',
      },
      {
        key: 'totalReceiptsReceived',
        type: 'number',
        title: 'Total Receipts/revenues received',
      },
    ],
    farmFinancingItems: [],
    requiredRule: [(v) => !!v || 'This field is required, n/a if none'],
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
        console.log(data)
      } else {
        alert('invalid')
      }
    },
    /* concatenate two value holders for field that has others (ex: variable, variableOther)*/
    concatinateValues(original, other) {
      let text = original
      if (!!other) {
        text += ' ' + other
      }
      return text
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      const data = {}
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        data[keyName] = {
          variable: this.formData[keyName].variable,
          remarks: this.formData[keyName].remarks,
        }
      }
      return data
    },
  },
  beforeMount() {
    this.farmFinancingItems = this.$store.getters['questionnaireCode/Code27']
  },
}
</script>

<style scoped>
.requiredFieldHidden {
  display: none !important;
}
</style>
