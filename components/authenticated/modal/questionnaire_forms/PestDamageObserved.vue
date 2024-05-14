<template>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <form-card-button @emitIncrement="increment" @emitDecrement="decrement" />
        <form-card v-for="i in items" :key="i">
          <v-row>
            <v-col cols="12" class="mb-0 pb-0">
              <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
            </v-col>
            <form-radio-container title="Pest and Diseases Damage in Plants">
              <v-radio-group
                :rules="requiredRule"
                v-model="pestDiseaseDamagesPlants[i - 1]"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in pestDiseaseDamagesPlantsItems"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
              </v-radio-group>
            </form-radio-container>

            <form-radio-container title="Stage of Occurence">
              <v-radio-group
                :rules="requiredRule"
                v-model="stageOccurence[i - 1]"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in stageOccurenceItems"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
              </v-radio-group>
            </form-radio-container>

            <form-radio-container title="Management">
              <v-radio-group
                :rules="requiredRule"
                v-model="management[i - 1]"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in managementItems"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
                <v-text-field 
                v-if="management[i - 1] == 'others'"
                v-model="managementOther[i - 1]"
                :rules="requiredRule"
                label="please specify"
                />
              </v-radio-group>
            </form-radio-container>

            <form-radio-container title="Perceived Effectiveness">
              <v-radio-group
                :rules="requiredRule"
                v-model="perceivedEffectiveness[i - 1]"
                class="pa-0 ma-0"
              >
                <v-radio
                  v-for="item in perceivedEffectivenessItems"
                  :key="item"
                  :label="item"
                  :value="item"
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
  import { concatinateEachIndexes } from '~/reusableFunctions/questionnaireValidation'
  import formCard from '../../form/formCard.vue'
  import formCardButton from '../../form/formCardButton.vue'
  import FormInputContainer from '../../form/formInputContainer.vue'
  import FormRadioContainer from '../../form/formRadioContainer.vue'
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
      pestDiseaseDamagesPlants: [],
      pestDiseaseDamagesPlantsItems: [],
      stageOccurence: [],
      stageOccurenceItems: [],
      management: [],
      managementItems: [],
      managementOther: [],
      perceivedEffectiveness: [],
      perceivedEffectivenessItems: [],
      requiredRule: [
        (v) => !!v || 'This field is required'
      ],
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
      /* concatenate each indexes and return new array (ex: tenure, tenureOthers)*/
      concatinateEachIndexes(originalList, otherList) {
        const arr = []
        for (let i = 0; i < this.items; i++) {
          let other = ''
          if (otherList[i]) {
            other = ' ' + otherList[i]
          }
          arr.push(originalList[i] + other)
        }
        return arr
      },
      /* get the data and convert it into expected key/value formats in BackEnd */
      getData() {
        return {
          pestsDiseasesPlants: this.pestDiseaseDamagesPlants,
          stageOccurrence: this.stageOccurence,
          management: concatinateEachIndexes(this.management,this.managementOther,this.items),
          perceivedEffectiveness: this.perceivedEffectiveness,
        }
      },
      // decrement the count of items
      decrement() {
        if (this.items > 1) {
          this.items--;
          this.pestDiseaseDamagesPlants.pop()
          this.stageOccurence.pop()
          this.management.pop()
          this.managementOther.pop()
          this.perceivedEffectiveness.pop()
        }
      },
      increment() {
        this.items++
      },
    },
    beforeMount() {
      this.pestDiseaseDamagesPlantsItems = this.$store.getters['questionnaireCode/Code23'];
      this.stageOccurenceItems = this.$store.getters['questionnaireCode/Code24'];
      this.managementItems = this.$store.getters['questionnaireCode/Code25'];
      this.perceivedEffectivenessItems = this.$store.getters['questionnaireCode/Code26'];
    },
    watch: {
      management(value){
        value.forEach((element,index) => {
        if(element !== 'others'){
          this.managementOther[index] = ''
        }  
        });
      }
    }
  }
</script>
  