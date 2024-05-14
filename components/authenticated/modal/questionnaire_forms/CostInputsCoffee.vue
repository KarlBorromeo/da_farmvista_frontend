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
            <v-radio-group :rules="requiredRule" v-model="formData[item.key].cashCredit" class="pa-0 ma-0">
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
      plantingMaterials:{
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      fertilizerUrea:{
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      fertilizerComplete:{
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      fertilizerAmmosul:{
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      fertilizerAmmophos:{
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      fertilizerSolophos:{
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      fertilizerMop:{
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      fertilizerAnimalManure:{
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      fertilizerOthers:{
        name: '',
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      lime:{
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      insecticide:{
        name: '',
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      herbicide:{
        name: '',
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      fungicide:{
        name: '',
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
      },
      others:{
        name: '',
        price: '',
        quantity: '',
        totalTransportCost: '',
        totalCost: '',
        cashCredit: '',
        sourceInputPurchased: ''
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
    cashCreditItems: ['cash','credit','n/a'],
    requiredRule: [ (v) => !!v || 'this field is required' ],
    numberRule: [
      (v) => !!v || 'this field is required',
      (v) => parseInt(v)>=0 || 'invalid value'
     ]
	}),
	methods: {
		/* test if the form is valid, return boolean */
		validate() {
			const valid = this.$refs.form.validate()
			if (valid) {
        alert('valid')
				const data = this.getData()
				console.log(data)
			}
		},
		/* get the data and convert it into expected key/value formats in BackEnd */
		getData() {
      const data = {};
      for(let i=0; i<this.list.length; i++){
        const keyName = this.list[i].key
        data[keyName] = this.formData[keyName]
      }
      return data;
		},
	},
	beforeMount() {},
}
</script>

<style scoped>
.requiredFieldHidden{
  display: none!important;
}
</style>