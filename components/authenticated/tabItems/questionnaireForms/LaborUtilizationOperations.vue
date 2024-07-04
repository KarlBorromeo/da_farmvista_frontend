<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="item in list" :key="item.key">
        <v-row>
          <labor-operation-container
            :title="titleGenerator(item.title, 'Man-Animal Day (MAD)')"
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
            :title="titleGenerator(item.title, 'Man-Animal Day (MAD)')"
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
            :title="titleGenerator(item.title, 'Animal-Day (AD)')"
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
            :title="titleGenerator(item.title, 'Mechanical (man-machine)')"
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
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import laborOperationContainer from '~/components/authenticated/form/laborOperationContainer.vue'
import laborOperationColNumber from '~/components/authenticated/form/laborOperationColNumber.vue'
import laborOperationColText from '~/components/authenticated/form/laborOperationColText.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import { convertNumbers } from '~/reusableFunctions/questionnaireValidation'
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
      nurseryPreparation: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      landPreparation: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      selectionPlantingMaterial: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      plantingTransplanting: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      fertilizerApplication: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      replanting: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      waterManagement: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      pestDiseasesManagement: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      harvesting: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      postHarvestDrying: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      postHarvestHullingPolishing: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      postHarvestSorting: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      postHarvestPackaging: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      postHarvestStorage: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      pruning: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      fullStumping: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
      otherManagement: {
        manDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        manAnimalDay: {
          fl: '1',
          hl: '3',
          bl: '2',
        },
        animalDay: {
          rented: 'carabao',
          rentedAmount: '500',
        },
        mechanical: {
          rented: 'tractor',
          rentedAmount: '1000',
        },
        remarks: 'sample remarks data',
      },
    },
    list: [
      { key: 'nurseryPreparation', title: 'Nursery Preparation' },
      { key: 'landPreparation', title: 'Land Preparation' },
      { key: 'selectionPlantingMaterial', title: 'Selection Material' },
      { key: 'plantingTransplanting', title: 'Plating/Transplanting' },
      { key: 'fertilizerApplication', title: 'Fertilizer Application' },
      { key: 'replanting', title: 'Replanting' },
      { key: 'waterManagement', title: 'Water Management' },
      { key: 'pestDiseasesManagement', title: 'Pest Diseases Management' },
      { key: 'harvesting', title: 'Harvesting' },
      { key: 'postHarvestDrying', title: 'Drying' },
      { key: 'postHarvestHullingPolishing', title: 'Hulling Polishing' },
      { key: 'postHarvestSorting', title: 'Sorting' },
      { key: 'postHarvestPackaging', title: 'Packaging' },
      { key: 'postHarvestStorage', title: 'storage' },
      { key: 'pruning', title: 'pruning' },
      { key: 'fullStumping', title: 'full Stumping' },
      { key: 'otherManagement', title: 'other Management' },
    ],
    numberRule: [(v) => parseInt(v) >= 0 || 'invalid value'],
    requiredRule: [(v) => !!v || 'This field is required'],
    tempValue: '',
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'LaborUtilizationOperationsValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'laborOperationCoffee',
          data: this.getData(),
        })
      }
    },
    titleGenerator(title, text) {
      return title + ' ' + text
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      const data = {}
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        data[keyName] = {
          manDayFL: convertNumbers(this.formData[keyName].manDay.fl),
          manDayHL: convertNumbers(this.formData[keyName].manDay.hl),
          manDatBL: convertNumbers(this.formData[keyName].manDay.bl),
          manAnimalDayFL: convertNumbers(
            this.formData[keyName].manAnimalDay.fl
          ),
          manAnimalDayHL: convertNumbers(
            this.formData[keyName].manAnimalDay.hl
          ),
          manAnimalDayBL: convertNumbers(
            this.formData[keyName].manAnimalDay.bl
          ),
          animalRented: this.formData[keyName].animalDay.rented,
          animalRentedAmnt: convertNumbers(
            this.formData[keyName].animalDay.rentedAmount
          ),
          machineRented: this.formData[keyName].mechanical.rented,
          machineRentedAmnt: convertNumbers(
            this.formData[keyName].mechanical.rentedAmount
          ),
          remarks: this.formData[keyName].remarks,
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
    tempValue() {
      this.validate()
    },
  },
  beforeMount() {
    this.sourcePlantingMaterialItems =
      this.$store.getters['questionnaireCode/Code21A']
    this.coffeeVarietyItems = this.$store.getters['questionnaireCode/Code21B']
    this.methodLandPreparationItems =
      this.$store.getters['questionnaireCode/Code21C']
    this.rowOrientationItems = this.$store.getters['questionnaireCode/Code21D']
    this.typeMethodItems = this.$store.getters['questionnaireCode/Code21E']
    this.methodApplicationItems =
      this.$store.getters['questionnaireCode/Code21F']

    const data = this.$store.getters['profiling/selectedRecord']
    const list = this.list
    if (Object.keys(data).length > 0) {
      list.forEach((item) => {
        this.formData[item.key].manDay.fl =
          data.laborOperationCoffee[item.key].manDayFL
        this.formData[item.key].manDay.hl =
          data.laborOperationCoffee[item.key].manDayHL
        this.formData[item.key].manDay.bl =
          data.laborOperationCoffee[item.key].manDatBL
        this.formData[item.key].manAnimalDay.fl =
          data.laborOperationCoffee[item.key].manAnimalDayFL
        this.formData[item.key].manAnimalDay.hl =
          data.laborOperationCoffee[item.key].manAnimalDayHL
        this.formData[item.key].manAnimalDay.bl =
          data.laborOperationCoffee[item.key].manAnimalDayBL
        this.formData[item.key].animalDay.rented =
          data.laborOperationCoffee[item.key].animalRented
        this.formData[item.key].animalDay.rentedAmount =
          data.laborOperationCoffee[item.key].animalRentedAmnt
        this.formData[item.key].mechanical.rented =
          data.laborOperationCoffee[item.key].machineRented
        this.formData[item.key].mechanical.rentedAmount =
          data.laborOperationCoffee[item.key].machineRentedAmnt
        this.formData[item.key].remarks =
          data.laborOperationCoffee[item.key].remarks
      })
    } else {
      list.forEach((item) => {
        this.formData[item.key].manDay.fl = ''
        this.formData[item.key].manDay.hl = ''
        this.formData[item.key].manDay.bl = ''
        this.formData[item.key].manAnimalDay.fl = ''
        this.formData[item.key].manAnimalDay.hl = ''
        this.formData[item.key].manAnimalDay.bl = ''
        this.formData[item.key].animalDay.rented = ''
        this.formData[item.key].animalDay.rentedAmount = ''
        this.formData[item.key].mechanical.rented = ''
        this.formData[item.key].mechanical.rentedAmount = ''
        this.formData[item.key].remarks = ''
      })
    }
    this.tempValue = 'tempValue'
  },
}
</script>
