<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-container>
			<!-- <form-card-button @emitIncrement="increment" @emitDecrement="decrement" /> -->
			<form-card v-for="(item, i) in parcelInfo" :key="i" >
				<v-row justify="center" style="overflow: hidden" class="pb-6">
					<v-col cols="12" class="mb-0 pb-0">
						<p
							class="ma-0 p-0 text-start body-2 font-weight-medium"
						>
							Parcel #{{ i + 1 }}
						</p>
					</v-col>
					<v-col cols="11" class="mb-0 pa-0">
						<p
							class="ma-0 mb-4 pa-0 text-center subheading font-weight-medium"
						>
							Crops Grown
						</p>
							<v-row
								justify="center"
                v-for="(cropGrown, j) in item.cropsGrown"
                :key="j"
                class="custom-card"
							>
                <v-spacer />
								<v-col cols="10" class="pa-0" sm="5">
									<v-text-field
										v-model="cropGrown.crop"
										:rules="specialCharactersRule"
										label="crop name grown"
                    :disabled="true"
									></v-text-field>
								</v-col>
								<v-spacer />
								<v-col cols="5" sm="3" class="alignHorizontalVertical">
									<p class="body-2">
										is utilized?
									</p>
								</v-col>

								<v-col
									class="ma-0 pa-0"
									cols="5"
									sm="3"
									style="
										display: flex;
										flex-direction: column;
										justify-content: center;
										align-items: start;
									"
								>
									<v-radio-group
										:rules="requiredRule"
										v-model="cropGrown.isUtilized"
										class="pa-0 ma-0"
										row
									>
										<v-radio
											v-for="item in isUtilizedItems"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										></v-radio>
									</v-radio-group>
								</v-col>
							</v-row>
					</v-col>

          <v-col cols="11" class="mb-0 pa-0 mt-4">
						<p
							class="ma-0 mb-4 pa-0 text-center subheading font-weight-medium"
						>
							Crops Waste
						</p>
							<v-row
								justify="center"
                v-for="j in item.cropsWasteitems"
                :key="j"
                class="custom-card"
							>
              {{j}}
                <v-spacer />
								<v-col cols="10" class="pa-0" sm="5">
									<v-text-field
										v-model="item.cropsWaste[j-1].waste"
										:rules="specialCharactersRule"
										label="waste name"
									></v-text-field>
								</v-col>
								<v-spacer />
								<v-col
									class="pa-0"
									cols="6"
									sm="3"
									style="
										display: flex;
										flex-direction: column;
										justify-content: center;
										align-items: start;
									"
								>
									<v-text-field
										:rules="requiredRule"
										v-model="item.cropsWaste[j-1].kg"
                    label="waste volume in (kg)"
                    type="number"
                    min=0
									>
									</v-text-field>
								</v-col>
								<v-col
                  
									class="pa-0"
									cols="4"
									sm="3"
									style="
										display: flex;
										justify-content: center;
										align-items: center"
								>
                  <section v-if="j== item.cropsWasteitems">
                    <v-btn small icon @click="decrement(i)"><v-icon>mdi-minus</v-icon></v-btn>
                    <v-btn small icon @click="increment(i)"><v-icon>mdi-plus</v-icon></v-btn>                    
                  </section>

								</v-col>
							</v-row>
					</v-col>
				</v-row>
			</form-card>
		</v-container>
		<v-btn @click="validate">Validate</v-btn>
	</v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
export default {
	components: {
		formCard,
		formCardButton,
		FormInputContainer,
		FormRadioContainer,
	},
	computed: {
		parcelInformationDetails() {
			return this.$store.getters['questionnaire/parcelInformationDetails']
		},
	},
	data: () => ({
		parcelInfo: [],
		valid: false,
		items: 1,
		cropsGrown: ['coffee', 'banana'],
		kindsWasteProduced: ['branch', 'leaves'],
		volumeWaste: [2, 1],
		isUtilized: ['yes', 'yes'],
		isUtilizedItems: [
			{ value: 'yes', label: 'Yes' },
			{ value: 'no', label: 'No' },
		],
		requiredRule: [(v) => !!v || 'This field is required'],
		numberRule: [
			(v) => !!v || 'This field is required',
			(v) => parseFloat(v) >= 0 || 'invalid value',
		],
		specialCharactersRule: [
			(v) => !!v || 'This field is required',
			(v) => {
				const regex = /^[a-zA-Z0-9,\/]*$/
				if (regex.test(v)) {
					return true
				}
				return 'Special characters are not allowed except comma and slash'
			},
		],
		tempValue: '',
	}),
	methods: {
		/* test if the form is valid, return boolean */
		validate() {
			const valid = this.checkNull()
			this.$store.commit('questionnaire/toggleNextTab', {
				tabName: 'FarmWasteManagementValidated',
				valid,
			})
			if (valid) {
				this.$store.commit('questionnaire/saveData', {
					keyName: 'farmWasteManagement',
					data: this.getData(),
				})
			}
		},
		/* get the data and convert it into expected key/value formats in BackEnd */
		getData() {
      let cropsGrown = []
      let kindWasteProduced = []
      let volumeWasteKg = []
      let isUtilized = []
      for(let i=0; i<this.parcelInfo.length; i++){
        const cropsGrownByParcel = this.parcelInfo[i].cropsGrown
        const cropsWasteByParcel = this.parcelInfo[i].cropsWaste
        let tempCropsGrownArr = []
        let tempIsUtilizedArr = []
        for( let j=0; j<cropsGrownByParcel.length; j++){
          tempCropsGrownArr.push(cropsGrownByParcel[j].crop)
          tempIsUtilizedArr.push(cropsGrownByParcel[j].isUtilized)
        }
        let tempCropswasteArr = []
        let tempWasteKg = []
        for( let j=0; j<cropsWasteByParcel.length; j++){
          tempCropswasteArr.push(cropsWasteByParcel[j].waste)
          tempWasteKg.push(parseInt(cropsWasteByParcel[j].kg))
        }
        cropsGrown.push(tempCropsGrownArr)
        isUtilized.push(tempIsUtilizedArr)
        kindWasteProduced.push(tempCropswasteArr)
        volumeWasteKg.push(tempWasteKg)
      }
			return {
				cropsGrown,
        isUtilized,
				kindWasteProduced,
				volumeWasteKg,
			}
		},
		decrement(index) {
			if (this.parcelInfo[index].cropsWasteitems > 1) {
				this.parcelInfo[index].cropsWasteitems--
				this.parcelInfo[index].cropsWaste.pop()
			}
		},
		increment(index) {
      this.parcelInfo[index].cropsWaste.push(
        {
          waste: 'hahahaa',
          kg: 22222222222222,
        }
      )
      this.parcelInfo[index].cropsWasteitems++;
		},
    checkNull(){
      const data = this.getData();
      const keyArrays = Object.keys(data);
      for(let i=0; i<keyArrays.length; i++){
        let keyValues = data[keyArrays[i]]
        for(let j=0; j<keyValues.length; j++){
          let arr = keyValues[j]
          const index = arr.findIndex(item => !item)
          if(index>=0){
            console.log('empty at ',index)
            return false;
          }
        }
      }
      return true;
    }
	},
	watch: {
    parcelInfo: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
	},
  beforeMount() { 
    const isEditing = this.$store.getters['profiling/isEditingMode']
    if(!isEditing){
	    // this is composed of single/mulitple parcels
      const cropsPlanted = this.$store.getters['questionnaire/parcelInformationDetails'].cropsPlanted
      for(let j=0; j<cropsPlanted.length; j++){
        const cropsPlantedArr = cropsPlanted[j].split(',')
        let cropsGrown = [];
        for(let i = 0; i<cropsPlantedArr.length; i++){
          cropsGrown.push({
            crop: cropsPlantedArr[i],
            isUtilized: ''
          })
        }
        const cropsWasteitems = 1
        let cropsWaste = []
        cropsWaste.push({
          waste: '',
          kg: ''
        })
        this.parcelInfo.push({
          cropsGrown,
          cropsWasteitems,
          cropsWaste
        })       
      }
    }else{
      // TODO: do the fetch of existing data here and process it into make it parcelInfo
      this.parcelInfo.push({
        cropsGrown:[],
        cropsWasteitems: 1,
        cropsWaste: [
          {
            waste: '',
            kg: 0
          }
        ]
      })
    }
	},
}
</script>

<style scoped>
.custom-card {
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}
.alignHorizontalVertical {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
