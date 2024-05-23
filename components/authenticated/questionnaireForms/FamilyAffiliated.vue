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
              v-model="nameFamilyMember[i - 1]"
              :rules="requiredRule"
              label="* Name of Family Member"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Position">
            <v-radio-group
              :rules="requiredRule"
              v-model="position[i - 1]"
              class="py-0 my-0"
            >
              <v-radio
                v-for="item in positionItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="position[i - 1] === 'others'"
                v-model="positionOthers[i - 1]"
                :rules="requiredRule"
                label="Others:"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="nameOrganization[i - 1]"
              :rules="requiredRule"
              label="* Name of Institution/Organization"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Type of Institution/Organization">
            <v-radio-group
              :rules="requiredRule"
              v-model="typeOrganization[i - 1]"
              class="py-0 my-0"
            >
              <v-radio
                v-for="item in typeOrganizationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="typeOrganization[i - 1] === 'others'"
                v-model="typeOrganizationOthers[i - 1]"
                :rules="requiredRule"
                label="Other:"
                class="my-0 py-0 pt-1"
              ></v-text-field>
            </v-radio-group>
          </form-radio-container>

          <form-input-container>
            <v-text-field
              v-model="numberYearsMember[i - 1]"
              :rules="numberRule"
              label="* No. of years as a member"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Status of Membership">
            <v-radio-group
              :rules="requiredRule"
              v-model="statusMembership[i - 1]"
              class="py-0 my-0"
            >
              <v-radio
                v-for="item in statusMembershipItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>

          <form-radio-container title="Status of Organization">
            <v-radio-group
              :rules="requiredRule"
              v-model="statusOrganization[i - 1]"
              class="py-0 my-0"
            >
              <v-radio
                v-for="item in statusOrganizationItems"
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
    <p class="hiddenRequiredField">{{ initializedData }}</p>
  </v-form>
</template>

<script>
import formCard from '~/components/authenticated/form/formCard.vue'
import formCardButton from '~/components/authenticated/form/formCardButton.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
import { concatinateEachIndexes, extractUnmatchedValueRadio } from '~/reusableFunctions/questionnaireValidation'
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
    nameFamilyMember: ['Tamplano Tahay'],
    position: ['officer'],
    positionItems: [],
    positionOthers: [],
    nameOrganization: ['Tampohan'],
    typeOrganization: ['cooperative'],
    typeOrganizationItems: [],
    typeOrganizationOthers: [],
    numberYearsMember: [2],
    statusMembership: ['active'],
    statusMembershipItems: [],
    statusOrganization: ['active'],
    statusOrganizationItems: [],
    requiredRule: [(v) => !!v || 'This field is required'],
    numberRule: [(v) => !!v || 'This field is required', (v) => parseInt(v)>0 || 'this number is invalid']
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'FamilyAffiliatedValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'familyAffiliatedFarmOrg',
          data: this.getData(),
        })
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        fullName: this.nameFamilyMember,
        position: concatinateEachIndexes(
          this.position,
          this.positionOthers,
          this.items
        ),
        nameOrganization: this.nameOrganization,
        typeOrganization: concatinateEachIndexes(
          this.typeOrganization,
          this.typeOrganizationOthers,
          this.items
        ),
        yearsAsMember: this.numberYearsMember,
        statusMembership: this.statusMembership,
        statusOrganization: this.statusOrganization,
      }
    },
    /* decrement the count of items, pop the end index */
    decrement() {
      if (this.items > 1) {
        this.items--
        this.nameFamilyMember.pop()
        this.position.pop()
        this.positionOthers.pop()
        this.nameOrganization.pop()
        this.typeOrganization.pop()
        this.typeOrganizationOthers.pop()
        this.numberYearsMember.pop()
        this.statusMembership.pop()
        this.statusOrganization.pop()
      }
    },
    increment() {
      this.items++
    },
    /* reset the data */
    resetData(){
        this.items = 1
        this.nameFamilyMember = []
        this.position = []
        this.positionOthers = []
        this.nameOrganization = []
        this.typeOrganization = []
        this.typeOrganizationOthers = []
        this.numberYearsMember = []
        this.statusMembership = []
        this.statusOrganization = []
    }
  },
  beforeMount() {
    this.positionItems = this.$store.getters['questionnaireCode/Code1']
    this.typeOrganizationItems = this.$store.getters['questionnaireCode/Code2']
    this.statusMembershipItems =
      this.$store.getters['questionnaireCode/Code3_4']
    this.statusOrganizationItems =
      this.$store.getters['questionnaireCode/Code3_4']
  },
  watch: {
    position(value) {
      this.validate()
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.positionOthers[index] = ''
        }
      })
    },
    typeOrganization(value) {
      this.validate()
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.typeOrganizationOthers[index] = ''
        }
      })
    },
    nameFamilyMember() {
      this.validate()
    },
    positionOthers() {
      this.validate()
    },
    nameOrganization() {
      this.validate()
    },
    typeOrganizationOthers() {
      this.validate()
    },
    numberYearsMember() {
      this.validate()
    },
    statusMembership() {
      this.validate()
    },
    statusOrganization() {
      this.validate()
    },
  },
  // computed: {
  //   initializedData(){
  //     const data =  this.$store.getters['profiling/selectedRecord']
  //     if(Object.keys(data).length > 0){
  //       const length = data.familyAffiliatedFarmOrg.length
  //       this.items = length
  //       if(length>0){
  //         for(let i=0; i<length; i++){
  //           console.log('name: ',data.familyAffiliatedFarmOrg[i].fullName)
  //           this.nameFamilyMember[i] = data.familyAffiliatedFarmOrg[i].fullName
  //           this.position[i] = data.familyAffiliatedFarmOrg[i].position
  //           this.positionOthers[i] = extractUnmatchedValueRadio(data.familyAffiliatedFarmOrg[i].position,this.positionItems)
  //           this.nameOrganization[i] = data.familyAffiliatedFarmOrg[i].nameOrganization
  //           this.typeOrganization[i] = data.familyAffiliatedFarmOrg[i].typeOrganization
  //           this.typeOrganizationOthers[i] = extractUnmatchedValueRadio(data.familyAffiliatedFarmOrg[i].typeOrganization,this.typeOrganizationItems)
  //           this.numberYearsMember[i] = data.familyAffiliatedFarmOrg[i].yearsAsMember
  //           this.statusMembership[i] = data.familyAffiliatedFarmOrg[i].statusMembership
  //           this.statusOrganization[i] = data.familyAffiliatedFarmOrg[i].statusOrganization            
  //         }          
  //       }else{
  //         this.resetData()
  //       }
  //     }else{
  //       this.resetData()
  //     }
  //     return data.familyAffiliatedFarmOrg
  //   }
  // }
}
</script>
