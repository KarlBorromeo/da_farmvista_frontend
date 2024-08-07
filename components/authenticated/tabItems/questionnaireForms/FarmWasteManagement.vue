<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="(item, i) in parcelInfo" :key="i">
        <v-row justify="center" style="overflow: hidden" class="pb-6">
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 p-0 text-start body-2 font-weight-medium">
              Parcel #{{ i + 1 }}
            </p>
          </v-col>
          <v-col cols="11" class="mb-0 pa-0">
            <p class="ma-0 mb-4 pa-0 text-center subheading font-weight-medium">
              Crops Grown
            </p>
            <div
              v-for="(singleParcelInfo, j) in item"
              :key="j"
              class="custom-card"
            >
              <v-row justify="center">
               
                <v-col cols="10" class="pb-0" sm="5">
                  <v-text-field
                    v-model="singleParcelInfo.crop"
                    :rules="specialCharactersRule"
                    label="* crop name grown"
                    :disabled="true"
                    class="mt-2 pb-0 mb-0"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="10"
                  sm="5"
                  class="pb-0"
                >
                  <p class="mt-2 font-weight-light caption">Is Utlilzed?</p>
                  <v-radio-group
                    :rules="requiredRule"
                    v-model="singleParcelInfo.isUtilized"
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
              <v-row justify="center"  class="pt-0">
                <v-col cols="10" sm="5">
                  <v-text-field
                    v-model="singleParcelInfo.waste"
                    :rules="specialCharactersRule"
                    label="* wastes"
                    hint="Separate with comma ' , ' if multiple wastes"
                  ></v-text-field>
                </v-col>
            
                <v-col
                  cols="10" sm="5"
                >
                  <v-text-field
                    :rules="numberRule"
                    v-model="singleParcelInfo.kg"
                    label="* waste volume in (kg)"
                    type="number"
                    min="0"
                  >
                  </v-text-field>
                </v-col>
            
              </v-row>
            </div>
          </v-col>
        </v-row>
      </form-card>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
export default {
  activated(){
    this.validate()
  },
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
    parcelNumber: [],
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
    numberRule: [(v) => parseFloat(v) >= 0 || 'invalid value'],
    specialCharactersRule: [
      (v) => !!v || 'This field is required',
      (v) => {
        const regex = /^[a-zA-Z0-9,\/ ]*$/
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
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
      const valid = this.$refs.form.validate()
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
      let isUtilized = []
      let kindWasteProduced = []
      let volumeWasteKg = []
      for (let i = 0; i < this.parcelInfo.length; i++) {
        const singleParcelInfo = this.parcelInfo[i]
        let tempIsUtilizedArr = []
        let tempKindWasteProducedArr = []
        let tempVolumeWasteKgArr = []
        for (let j = 0; j < singleParcelInfo.length; j++) {
          tempIsUtilizedArr.push(singleParcelInfo[j].isUtilized)
          tempKindWasteProducedArr.push(singleParcelInfo[j].waste)
          tempVolumeWasteKgArr.push(parseFloat(singleParcelInfo[j].kg))
        }
        isUtilized.push(tempIsUtilizedArr)
        kindWasteProduced.push(tempKindWasteProducedArr)
        volumeWasteKg.push(tempVolumeWasteKgArr)
      }
      return {
        parcelNumber: this.parcelNumber,
        isUtilized,
        kindWasteProduced,
        volumeWasteKg,
      }
    },
  },
  computed: {
    parcelInfoStore(){
      return this.$store.getters['questionnaire/parcelInfo']
    }
  },
  watch: {
    parcelInfoStore(val){
      this.parcelInfo = []
      const existingParcelInfo = this.$store.getters['profiling/selectedRecord'].parcelInfo
      if (existingParcelInfo) {
        const cropsPlanted = val.cropsPlanted
        for (let k = 0; k < cropsPlanted.length; k++) {
          this.parcelNumber.push(existingParcelInfo[k].parcelNumber)

          const cropsPlantedArr = cropsPlanted[k].split(',')
          let singleParcelFarmWaste = existingParcelInfo[k].farmWaste
          let singleParcelInfo = []
          for (let i = 0; i < cropsPlantedArr.length; i++) {
            singleParcelInfo.push({
              crop: cropsPlantedArr[i],
              isUtilized: singleParcelFarmWaste[i]?singleParcelFarmWaste[i].isUtilized:'',
              waste: singleParcelFarmWaste[i]?singleParcelFarmWaste[i].kindWasteProduced:'',
              kg: singleParcelFarmWaste[i]?singleParcelFarmWaste[i].volumeWasteKg:'',
            })
          }
          this.parcelInfo.push(singleParcelInfo)
        }
      }else{
      
      const cropsPlanted = val.cropsPlanted
      this.parcelNumber = val.parcelNumbers
      for (let j = 0; j < cropsPlanted.length; j++) {
        const cropsPlantedArr = cropsPlanted[j].split(',')
        let singleParcelInfo = []
        for (let i = 0; i < cropsPlantedArr.length; i++) {
          singleParcelInfo.push({
            crop: cropsPlantedArr[i],
            isUtilized: '',
            waste: '',
            kg: '',
          })
        }
        this.parcelInfo.push(singleParcelInfo)
      }
      }
    },
    parcelInfo: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
  },
  beforeMount() {
    const isEditing = this.$store.getters['profiling/isEditingMode']
    /* creating manually */
    if (!isEditing) {
      // this is composed of single/mulitple parcels, creating a list of farmwaste that has an empty values
      const cropsPlanted =
        this.$store.getters['questionnaire/parcelInfo'].cropsPlanted
      this.parcelNumber =
        this.$store.getters[
          'questionnaire/parcelInfo'
        ].parcelNumbers
      for (let j = 0; j < cropsPlanted.length; j++) {
        const cropsPlantedArr = cropsPlanted[j].split(',')
        let singleParcelInfo = []
        for (let i = 0; i < cropsPlantedArr.length; i++) {
          singleParcelInfo.push({
            crop: cropsPlantedArr[i],
            isUtilized: '',
            waste: '',
            kg: '',
          })
        }
        this.parcelInfo.push(singleParcelInfo)
      }
    } else {
    /* updating/editing existing record */
      const existingParcelInfo = this.$store.getters['profiling/selectedRecord'].parcelInfo
      if (existingParcelInfo) {
        /* the list of this form rely on the parcel information form, it considers if the user changes the number of parcels and also changes the crops planted per parcels */
        const cropsPlanted = this.$store.getters['questionnaire/parcelInfo'].cropsPlanted
        for (let k = 0; k < cropsPlanted.length; k++) {
          this.parcelNumber.push(existingParcelInfo[k].parcelNumber)
          const cropsPlantedArr = cropsPlanted[k].split(',')
          let singleParcelFarmWaste = existingParcelInfo[k].farmWaste
          let singleParcelInfo = []
          for (let i = 0; i < cropsPlantedArr.length; i++) {
            singleParcelInfo.push({
              crop: cropsPlantedArr[i],
              isUtilized: singleParcelFarmWaste[i]?singleParcelFarmWaste[i].isUtilized:'',
              waste: singleParcelFarmWaste[i]?singleParcelFarmWaste[i].kindWasteProduced:'',
              kg: singleParcelFarmWaste[i]?singleParcelFarmWaste[i].volumeWasteKg:'',
            })
          }
          this.parcelInfo.push(singleParcelInfo)
        }
      }
    }
  },
}
</script>

<style scoped>
.custom-card {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
}
.alignHorizontalVertical {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
