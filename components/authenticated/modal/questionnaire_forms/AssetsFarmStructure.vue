<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row class="mb-1 pa-4">
        <v-col cols="12" md="6" class="d-flex pa-0 ma-0 mb-2">
          <v-btn block small color="success" @click="items += 1"
            >Add <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="12" md="6" class="d-flex pa-0 ma-0">
          <v-btn
            block
            small
            color="warning"
            @click="decrement"
            class="black--text"
            >Remove last item <v-icon>mdi-minus</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <form-card
        v-for="i in items"
        :key="i"
      >
        <v-row>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
          </v-col>
          <v-col cols="12" class="py-0 my-0">
            <div class="mt-3">
              <v-select
                v-model="structureName[i]"
                :items="structureNameItems"
                menu-props="auto"
                hide-details
                label="* Items/Farm Asset"
                dense
              ></v-select>
              <p v-if="!structureName[i]" class="red--text caption mt-1">
                This field is required!
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 pt-4 my-0">
            <v-text-field
              v-model="structureQuantity[i]"
              :rules="requiredRule"
              label="* How many currently own"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 my-0">
            <v-radio-group
              v-model="isstructureAquiredGovtProg[i]"
              class="pa-0 ma-0"
            >
              <p class="pa-0 ma-0">
                * Did acquire through government or programs:
              </p>
              <v-radio
                v-for="item in isstructureAquiredGovtProgItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></v-radio>
              <div
                v-if="!isstructureAquiredGovtProg[i]"
                class="red--text caption"
              >
                You must select an option!
              </div>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="structureAge[i]"
              :rules="requiredRule"
              label="* age of the item"
            ></v-text-field>
          </v-col>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../cards/formCard.vue'
export default {
  components: { formCard },
  data: () => ({
    valid: false,
    items: 1,
    structureName: [],
    structureNameItems: ['structure 1', 'structure 2', 'structure 3'],
    structureQuantity: [],
    isstructureAquiredGovtProg: [],
    isstructureAquiredGovtProgItems: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    structureAge: [],
    requiredRule: [
      (v) => !!v || 'This field is required',
      (v) => parseInt(v) >= 0 || 'invalid value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      console.log('validated: ', this.$refs.form.validate())
    },
    // decrement the count of items
    decrement() {
      if (this.items > 1) {
        this.items--
      }
    },
  },
}
</script>
