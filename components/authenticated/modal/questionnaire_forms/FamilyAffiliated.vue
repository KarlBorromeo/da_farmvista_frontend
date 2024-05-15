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
            <v-radio-group :rules="requiredRule" v-model="position[i - 1]" class="py-0 my-0">
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
            <v-radio-group :rules="requiredRule" v-model="typeOrganization[i - 1]" class="py-0 my-0">
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
              :rules="requiredRule"
              label="* No. of years as a member"
              type="number"
            ></v-text-field>
          </form-input-container>

          <form-radio-container title="Status of Membership">
            <v-radio-group :rules="requiredRule" v-model="statusMembership[i - 1]" class="py-0 my-0">
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
  </v-form>
</template>

<script>
import formCard from '../../form/formCard.vue'
import formCardButton from '../../form/formCardButton.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
import { concatinateEachIndexes } from '~/reusableFunctions/questionnaireValidation'
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
    nameFamilyMember: [],
    position: [],
    positionItems: [],
    positionOthers: [],
    nameOrganization: [],
    typeOrganization: [],
    typeOrganizationItems: [],
    typeOrganizationOthers: [],
    numberYearsMember: [],
    statusMembership: [],
    statusMembershipItems: [],
    statusOrganization: [],
    statusOrganizationItems: [],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/FamilyAffiliatedValidate',valid);
      let data;
      if (valid) {
        data = this.getData();
      }else{
        data = this.resetData();
      }
      this.$store.commit('questionnaire/saveData',{
        keyName: 'familyAffiliatedFarmOrg',
        data
      })
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
    resetData() {
      return {
        fullName: [],
        position: [],
        nameOrganization: [],
        typeOrganization: [],
        yearsAsMember: [],
        statusMembership: [],
        statusOrganization: [],
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
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.positionOthers[index] = ''
        }
      })
    },
    typeOrganization(value) {
      value.forEach((element, index) => {
        if (element !== 'others') {
          this.typeOrganizationOthers[index] = ''
        }
      })
    },
  },
}
</script>
