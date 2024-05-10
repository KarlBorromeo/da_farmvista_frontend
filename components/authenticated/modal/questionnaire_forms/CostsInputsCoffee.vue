<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-container>
			<form-card v-for="item in list" :key="item.key">
				<v-row>
					<labor-operation-container 
                        :title="titleGenerator(item.title,'Man-Animal Day (MAD)')"
					>
						<labor-operation-col-number>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].manDay.fl"
								label="FL"
								:rules="numberRule"
								type="number"
								min="0"
							/>
						</labor-operation-col-number>
						<labor-operation-col-number>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].manDay.hl"
								label="FL"
								:rules="numberRule"
								type="number"
								min="0"
							/>
						</labor-operation-col-number>
						<labor-operation-col-number>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].manDay.bl"
								label="FL"
								:rules="numberRule"
								type="number"
								min="0"
							/>
						</labor-operation-col-number>
					</labor-operation-container>
					<labor-operation-container
						:title="titleGenerator(item.title,'Man-Animal Day (MAD)')"
					>
						<labor-operation-col-number>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].manAnimalDay.fl"
								label="FL"
								:rules="numberRule"
								type="number"
								min="0"
							/>
						</labor-operation-col-number>
						<labor-operation-col-number>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].manAnimalDay.hl"
								label="FL"
								:rules="numberRule"
								type="number"
								min="0"
							/>
						</labor-operation-col-number>
						<labor-operation-col-number>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].manAnimalDay.bl"
								label="FL"
								:rules="numberRule"
								type="number"
								min="0"
							/>
						</labor-operation-col-number>
					</labor-operation-container>
					<labor-operation-container
						:title="titleGenerator(item.title,'Animal-Day (AD)')"
					>
						<labor-operation-col-text>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].animalDay.rented"
								label="specify the animal"
								:rules="requiredRule"
							/>
						</labor-operation-col-text>
						<labor-operation-col-number>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].animalDay.rentedAmount"
								label="amount"
								:rules="numberRule"
								type="number"
								min="0"
							/>
						</labor-operation-col-number>
					</labor-operation-container>
					<labor-operation-container
						:title="titleGenerator(item.title,'Mechanical (man-machine)')"
					>
						<labor-operation-col-text>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].mechanical.rented"
								label="specify the mechanical"
								:rules="requiredRule"
							/>
						</labor-operation-col-text>
						<labor-operation-col-number>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].mechanical.rentedAmount"
								label="amount"
								:rules="numberRule"
								type="number"
								min="0"
							/>
						</labor-operation-col-number>
						<form-input-container>
							<v-text-field
								class="my-0 py-0"
								v-model="formData[item.key].remarks"
								label="Remarks"
								:rules="requiredRule"
							/>
						</form-input-container>
					</labor-operation-container>
				</v-row>
			</form-card>
		</v-container>
		<v-btn @click="validate">Validate</v-btn>
	</v-form>
</template>

<script>
import formCard from '../../cards/formCard.vue'
import laborOperationContainer from '../../cards/laborOperationContainer.vue'
import laborOperationColNumber from '../../cards/laborOperationColNumber.vue'
import laborOperationColText from '../../cards/laborOperationColText.vue'
import FormInputContainer from '../../cards/formInputContainer.vue'
export default {
	components: {
		formCard,
		laborOperationContainer,
		laborOperationColNumber,
		laborOperationColText,
		FormInputContainer,
	},
	data: () => ({
		valid: false,
		items: 1,
		formData: {
            plantingMaterials:{},
            fertilizerUrea:{},
            fertilizerComplete:{},
            fertilizerAmmosul:{},
            fertilizerAmmophos:{},
            fertilizerSolophos:{},
            fertilizerMop:{},
            fertilizerAnimalManure:{},
            fertilizerOthers:{},
            lime:{},
            insecticide:{},
            herbicide:{},
            fungicide:{},
            other
		},
        listNoSpecify: [
            { key: 'plantingMaterials', title: '' },
            { key: 'ertilizerUrea', title: '' },
            { key: 'fertilizerComplete', title: '' },
            { key: 'fertilizerAmmosul', title: '' },
            { key: 'fertilizerAmmophos', title: '' },
            { key: 'fertilizerSolophos', title: 'R' },
            { key: 'fertilizerMop', title: '' },
            { key: 'fertilizerAnimalManure', title: '' },
            { key: 'fertilizerOthers', title: '' },
            { key: 'lime', title: '' }
            ],
        listWithSpecify: [
            { key: 'insecticide', title: '' },
            { key: 'herbicide', title: '' },
            { key: 'fungicide', title: '' },
            { key: 'fertilizerAmmosul', title: '' },
            { key: 'other', title: '' },
        ],
		numberRule: [
			(v) => !!v || 'required',
			(v) => parseInt(v) >= 0 || 'invalid',
		],
		requiredRule: [(v) => !!v || 'This field is required'],
	}),
	methods: {
		/* test if the form is valid, return boolean */
		validate() {
			const valid = this.$refs.form.validate()
			if (valid) {
				const data = this.getData()
				console.log(data)
			}
		},
        titleGenerator(title,text){
            return title + ' ' + text
        },
		/* get the data and convert it into expected key/value formats in BackEnd */
		getData() {
            const data = {};  
			for(let i=0; i<this.list.length; i++){
                const keyName = this.list[i].key;
                data[keyName] = {
                    name: '', 
                    price: '', 
                    quantity: '', 
                    totalTransportCost: '', 
                    totalCost: '', 
                    cashCredit: '', 
                    sourceInputPurchased: '', 
                }
            }
            return data;
		},
	},
}
</script>
