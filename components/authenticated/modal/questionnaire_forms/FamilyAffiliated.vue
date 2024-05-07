<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
        <v-row class="mb-1 pa-4">
            <v-col cols="12" md="6" class="d-flex pa-0 ma-0 mb-2" >
                <v-btn block small color="success" @click="items+=1">Add <v-icon>mdi-plus</v-icon></v-btn>
            </v-col>
            <v-col cols="12" md="6" class="d-flex  pa-0 ma-0">
               <v-btn block small color="warning" @click="decrement" class="black--text">Remove last item <v-icon>mdi-minus</v-icon></v-btn>
            </v-col>
        </v-row>
        <v-row v-for="i in items" :key="i" class="border mb-3 item-container">  
            <v-col cols="12" class="mb-0 pb-0">
                <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="nameFamilyMember[i]"
                    :rules="requiredRule"
                    label="Name of Family Member"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="position[i]"
                    :rules="requiredRule"
                    label="Position"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="nameOrganization[i]"
                    :rules="requiredRule"
                    label="Name of Institution/Organization"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="typeOrganization[i]"
                    :rules="requiredRule"
                    label="Type of Institution/Organization"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="numberYearsMember[i]"
                    :rules="requiredRule"
                    label="No. of years as a member"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="statusMembership[i]"
                    :rules="requiredRule"
                    label="Status of Membership"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="statusOrganization[i]"
                    :rules="requiredRule"
                    label="Status of Organization"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    items: 1,
    nameFamilyMember:[],
    position: [],
    nameOrganization: [],
    typeOrganization: [],
    numberYearsMember: [],
    statusMembership: [],
    statusOrganization: [],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods:{
    /* test if the form is valid, return boolean */
    validate(){
      console.log('validated: ',this.$refs.form.validate());
    },
    // decrement the count of items
    decrement(){
        if(this.items > 1){
            this.items--;
        } 
    }
  },
}
</script>

<style scoped>
.item-container{
    border-radius: .2rem;
    box-shadow: 0 3px 3px 3px rgba(0, 0, 0, 0.1);
}
</style>
