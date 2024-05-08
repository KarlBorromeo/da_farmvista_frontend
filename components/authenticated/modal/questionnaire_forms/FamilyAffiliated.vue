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
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="nameFamilyMember[i-1]"
              :rules="requiredRule"
              label="* Name of Family Member"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 my-0 pb-2">
            <v-radio-group v-model="position[i-1]" class="py-0 my-0">
              <p class="pa-0 ma-0">
                * Position
              </p>
              <v-radio
                v-for="item in positionItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="position[i-1] === 'others'"
                v-model="positionOthers[i-1]"
                :rules="requiredRule"
                label="Others:"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div v-if="!position[i-1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="nameOrganization[i-1]"
              :rules="requiredRule"
              label="* Name of Institution/Organization"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 my-0 pb-2">
            <v-radio-group v-model="typeOrganization[i-1]" class="py-0 my-0">
              <p class="pa-0 ma-0">
                * Type of Institution/Organization
              </p>
              <v-radio
                v-for="item in typeOrganizationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <v-text-field
                v-if="typeOrganization[i-1] === 'others'"
                v-model="typeOrganizationOthers[i-1]"
                :rules="requiredRule"
                label="Other:"
                class="my-0 py-0 pt-1"
              ></v-text-field>
              <div v-if="!typeOrganization[i-1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="4" class="py-0 pb-2 my-0">
            <v-text-field
              v-model="numberYearsMember[i-1]"
              :rules="requiredRule"
              label="* No. of years as a member"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 my-0 pb-2">
            <v-radio-group v-model="statusMembership[i-1]" class="py-0 my-0">
              <p class="pa-0 ma-0">
                * Type of Institution/Organization
              </p>
              <v-radio
                v-for="item in statusMembershipItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <div v-if="!statusMembership[i-1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="4" class="py-0 my-0 pb-2">
            <v-radio-group v-model="statusOrganization[i-1]" class="py-0 my-0">
              <p class="pa-0 ma-0">
                * Type of Institution/Organization
              </p>
              <v-radio
                v-for="item in statusOrganizationItems"
                :key="item"
                :label="item"
                :value="item"
              ></v-radio>
              <div v-if="!statusOrganization[i-1]" class="red--text caption">
                You must select an option!
              </div>
            </v-radio-group>
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
      const validRadio = this.validateRadio()
      if(valid && validRadio){
        const data = this.getData();
        console.log('data of family affiliated: ',data);
      }
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData(){
      return{
        full_name: this.nameFamilyMember,
        position: this.concatinateEachIndexes(this.position,this.positionOthers),
        name_organization: this.nameOrganization,
        type_organization: this.concatinateEachIndexes(this.typeOrganization,this.typeOrganizationOthers),
        years_as_member: this.numberYearsMember,
        status_membership: this.statusMembership,
        status_organization: this.statusOrganization        
      }
    },
    /* concatenate each indexes and return new array */
    concatinateEachIndexes(originalList,otherList){
      const arr = [];
      for(let i=0; i<this.items; i++){
        let other = '';
        if(otherList[i]){
          other = ' '+ otherList[i]
        }
        arr.push(originalList[i] + other )
      }
      return arr;
    },
    /* check if radio inputs are not empty */
    validateRadio(){
     for(let i=0; i<this.items; i++){
        if(!this.position[i] || !this.typeOrganization[i] || !this.statusMembership[i] || !this.statusOrganization[i]){
          return false
        }
        return true;
      }
    },
    /* decrement the count of items, pop the end index */
    decrement() {
      if (this.items > 1) {
        this.items--;
        this.nameFamilyMember.pop();
        this.position.pop();
        this.positionOthers.pop();
        this.nameOrganization.pop();
        this.typeOrganization.pop();
        this.typeOrganizationOthers.pop();
        this.numberYearsMember.pop();
        this.statusMembership.pop();
        this.statusOrganization.pop();
      }
    },
  },
  beforeMount(){
    this.positionItems = this.$store.getters['questionnaireCode/Code1']
    this.typeOrganizationItems = this.$store.getters['questionnaireCode/Code2']
    this.statusMembershipItems = this.$store.getters['questionnaireCode/Code3_4']
    this.statusOrganizationItems = this.$store.getters['questionnaireCode/Code3_4']
  }
}
</script>
