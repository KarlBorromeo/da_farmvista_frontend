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
            <div class="mt-3">
              <v-select
                v-model="toolName[i - 1]"
                :items="toolNameItems"
                append-icon="mdi-tools"
                label="* Tool Items"
                dense
              ></v-select>
              <p v-if="!toolName[i - 1]" class="red--text caption mt-1">
                This field is required!
              </p>
            </div>
          </form-select-container>

          <form-input-container>
            <v-text-field
              v-model="toolQuantity[i - 1]"
              :rules="requiredRule"
              label="* How many currently own"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container
            title="Did acquire through government or programs"
          >
            <v-radio-group
              v-model="isToolAquiredGovtProg[i - 1]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="item in isToolAquiredGovtProgItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
              <div
                v-if="!isToolAquiredGovtProg[i - 1]"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="toolAge[i - 1]"
              :rules="requiredRule"
              label="* age of the item"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../cards/formCard.vue'
import formCardButton from '../../cards/formCardButton.vue'
import FormInputContainer from '../../cards/formInputContainer.vue'
import FormRadioContainer from '../../cards/formRadioContainer.vue'
import FormSelectContainer from '../../cards/formSelectContainer.vue'
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
    toolName: [],
    toolNameItems: [],
    toolQuantity: [],
    isToolAquiredGovtProg: [],
    isToolAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    toolAge: [],
    requiredRule: [
      (v) => !!v || 'This field is required',
      (v) => parseFloat(v) >= 0 || 'invalid value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      const radioCheckboxValid = this.validateRadioCheckbox()
      if (valid && radioCheckboxValid) {
        const data = this.getData()
        console.log(data)
      }
    },
    /* check if radio inputs are not empty */
    validateRadioCheckbox() {
      for (let i = 0; i < this.items; i++) {
        if (!this.toolName[i] || !this.isToolAquiredGovtProg[i]) {
          return false
        }
      }
      return true
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        farmtool_name: this.toolName,
        farmtool_quantity: this.toolQuantity,
        is_acquired_govt_program: this.isToolAquiredGovtProg,
        farmtool_age: this.toolAge,
      }
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--
        this.toolName.pop()
        this.toolNameItems.pop()
        this.toolQuantity.pop()
        this.isToolAquiredGovtProg.pop()
        this.toolAge.pop()
      }
    },
    increment() {
      this.items++
    },
  },
  beforeMount() {
    this.toolNameItems =
      this.$store.getters['questionnaireCode/Code5FarmImplementsTools']
  },
}
</script>
