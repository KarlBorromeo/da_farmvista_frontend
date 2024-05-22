<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card-button @emitIncrement="increment" @emitDecrement="decrement" />
      <form-card v-for="i in items" :key="i">
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>

          <form-input-container>
            <v-text-field
              v-model="cropsGrown[i - 1]"
              :rules="requiredRule"
              label="* Crops grown in the area"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="kindsWasteProduced[i - 1]"
              :rules="requiredRule"
              label="* Kinds of waste produced"
            ></v-text-field>
          </form-input-container>

          <form-input-container>
            <v-text-field
              v-model="volumeWaste[i - 1]"
              :rules="numberRule"
              label="* Volume of Waste(kg)"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Utilized?">
            <v-radio-group
              :rules="requiredRule"
              v-model="isUtilized[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isUtilizedItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
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
  data: () => ({
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
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
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
      return {
        cropsGrown: this.cropsGrown,
        kindWasteProduced: this.kindsWasteProduced,
        volumeWasteKg: this.volumeWaste,
        isUtilized: this.isUtilized,
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--
        this.cropsGrown.pop()
        this.kindsWasteProduced.pop()
        this.volumeWaste.pop()
        this.isUtilized.pop()
      }
    },
    increment() {
      this.items++
    },
  },
  watch: {
    cropsGrown() {
      this.validate()
    },
    kindsWasteProduced() {
      this.validate()
    },
    volumeWaste() {
      this.validate()
    },
    isUtilized() {
      this.validate()
    },
  },
}
</script>
