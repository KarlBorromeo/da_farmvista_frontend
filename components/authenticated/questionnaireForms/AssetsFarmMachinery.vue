<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card-button @emitIncrement="increment" @emitDecrement="decrement" />
      <form-card v-for="i in items" :key="i">
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <form-select-container>
            <v-select
              v-model="machineName[i - 1]"
              :items="machineNameItems"
              :rules="requiredRule"
              append-icon="mdi-tractor"
              label="* Machine Items"
              dense
            ></v-select>
          </form-select-container>

          <form-input-container>
            <v-text-field
              v-model="machineQuantity[i - 1]"
              :rules="numberRule"
              label="* How many currently own"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container
            title="Did acquire through government or programs?"
          >
            <v-radio-group
              :rules="requiredRule"
              v-model="ismachineAquiredGovtProg[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in ismachineAquiredGovtProgItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="machineAge[i - 1]"
              :rules="numberRule"
              label="* age of the item"
              type="number"
              min="0"
              hint=".6 for 6 months, 1 for 1 year and so on"
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
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import FormSelectContainer from '~/components/authenticated/form/formSelectContainer.vue'
export default {
  components: {
    formCard,
    formCardButton,
    FormInputContainer,
    FormRadioContainer,
    FormSelectContainer,
  },
  data: () => ({
    valid: false,
    items: 1,
    machineName: ['tractor'],
    machineNameItems: [],
    machineQuantity: [1],
    ismachineAquiredGovtProg: ['yes'],
    ismachineAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    machineAge: [0.6],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'AssetsFarmMachineryValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveAssetsData', {
          keyName: 'farmMachinery',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        farmMachineryName: this.machineName,
        farmMachineryQuantity: this.machineQuantity,
        isAcquiredGovtProgram: this.ismachineAquiredGovtProg,
        farmMachineryAge: this.machineAge,
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--
        this.machineName.pop()
        this.machineQuantity.pop()
        this.ismachineAquiredGovtProg.pop()
        this.machineAge.pop()
      }
    },
    increment() {
      this.items++
    },
  },
  beforeMount() {
    this.machineNameItems =
      this.$store.getters['questionnaireCode/Code5FarmMachinery']
  },
  watch: {
    machineName() {
      this.validate()
    },
    machineQuantity() {
      this.validate()
    },
    ismachineAquiredGovtProg() {
      this.validate()
    },
    machineAge() {
      this.validate()
    },
  },
}
</script>
