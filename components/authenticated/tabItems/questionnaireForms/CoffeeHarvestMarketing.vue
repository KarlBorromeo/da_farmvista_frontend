<template>
  <div>
    <v-container class="my-0 py-0">
      <v-row class="my-0 mt-3">
        <form-radio-container title="Harvested already?" :required="true">
          <v-radio-group v-model="isHarvested" class="pa-0 ma-0">
            <v-radio
              v-for="item in isHarvestedItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>
      </v-row>
    </v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-if="isHarvested == 'yes'"
    >
      <v-container class="mt-0 pt-0">
        <form-card v-for="item in list" :key="item.key">
          <p class="my-2 mt-0 pb-0 font-weight-medium" v-if="!item.radio">
            {{ item.title }}
          </p>
          <v-row>
            <form-input-container v-if="!item.radio && item.type == 'number'">
              <v-text-field
                v-model="formData[item.key].variable"
                :rules="numberRule"
                min="0"
                label="* Details"
                :type="item.type"
              ></v-text-field>
            </form-input-container>
            <form-input-container
              v-else-if="!item.radio && item.type == 'text'"
            >
              <v-text-field
                v-model="formData[item.key].variable"
                :rules="requiredRule"
                label="* Details"
                :type="item.type"
              ></v-text-field>
            </form-input-container>
            <form-radio-container v-else :title="item.title" :required="true">
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
                label="Remarks"
              ></v-text-field>
            </form-input-container>
          </v-row>
        </form-card>
      </v-container>
      <!-- <v-btn @click="validate">Validate</v-btn> -->
    </v-form>
  </div>
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
    isHarvested: '',
    isHarvestedItems: ['yes', 'no'],
    formData: {
      costProductSortingClassification: {
        variable: '100',
        remarks: 'sample remarks',
      },
      qtyCoffeeCherriesHarvested: {
        variable: '100',
        remarks: 'sample remarks',
      },
      qtySoldDriedGreenCoffee: {
        variable: '100',
        remarks: 'sample remarks',
      },
      qtyUnsoldDefect: {
        variable: '100',
        remarks: 'sample remarks',
      },
      priceReceived: {
        variable: '100',
        remarks: 'sample remarks',
      },
      totalSale: {
        variable: '100',
        remarks: 'sample remarks',
      },
      qtyStoredHumanConsumption: {
        variable: '100',
        remarks: 'sample remarks',
      },
      qtyGivenToOther: {
        variable: '100',
        remarks: 'sample remarks',
      },
      marketingOutlet: {
        variable: '100',
        remarks: 'sample remarks',
      },
      marketQualityPreference: {
        variable: '100',
        remarks: 'sample remarks',
      },
      howBringToMarketingOutlet: {
        variable: 'own funds',
        remarks: 'sample remarks',
      },
      costTransportQtySold: {
        variable: '100',
        remarks: 'sample remarks',
      },
      totalReceiptsReceived: {
        variable: '100',
        remarks: 'sample remarks',
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
    numberRule: [(v) => parseInt(v) >= 0 || 'invalid value'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'CoffeeHarvestMarketingValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'coffeeHarvestMarketing',
          data: this.getData(),
        })
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
        if (
          keyName == 'marketQualityPreference' ||
          keyName === 'marketingOutlet' ||
          keyName === 'howBringToMarketingOutlet'
        ) {
          data[keyName] = {
            variable: this.formData[keyName].variable,
            remarks: this.formData[keyName].remarks,
          }
        } else {
          data[keyName] = {
            variable: this.formData[keyName].variable
              ? parseFloat(this.formData[keyName].variable)
              : 0,
            remarks: this.formData[keyName].remarks,
          }
        }
      }
      return data
    },
  },
  beforeMount() {
    this.farmFinancingItems = this.$store.getters['questionnaireCode/Code27']
    this.isHarvested = 'yes'
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        this.formData[keyName].variable =
          data.coffeeHarvestMarketing[keyName].variable
        this.formData[keyName].remarks =
          data.coffeeHarvestMarketing[keyName].remarks
      }
    } else {
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        if (this.list[i].type == 'number') {
          this.formData[keyName].variable = 0
        } else {
          this.formData[keyName].variable = ''
        }
        this.formData[keyName].remarks = ''
      }
    }
  },
  watch: {
    formData: {
      handler: function () {
        if (this.isHarvested == 'yes') {
          this.validate()
        }
      },
      deep: true,
    },
    isHarvested(val) {
      if (val == 'no') {
        this.$store.commit('questionnaire/toggleNextTab', {
          tabName: 'CoffeeHarvestMarketingValidated',
          valid: true,
        })
        this.$store.commit('questionnaire/saveData', {
          keyName: 'coffeeHarvestMarketing',
          data: this.getData(),
        })
      }
    },
  },
}
</script>

<style scoped>
.requiredFieldHidden {
  display: none !important;
}
</style>
