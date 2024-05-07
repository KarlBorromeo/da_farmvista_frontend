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
        <v-container  v-for="i in items" :key="i" class="border mb-3 item-container">
        <v-row>  
            <v-col cols="12" class="mb-0 pb-0">
                <p class="ma-0 pa-0 font-weight-black">{{ i }}</p>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="name[i]"
                    :rules="requiredRule"
                    label="* Name"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="age[i]"
                    :rules="requiredRule"
                    label="* Age"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 my-0" >
                <v-radio-group v-model="sex[i]" class="pa-0 ma-0">
                    <p class="pa-0 ma-0">* Sex:</p>
                    <v-radio
                        v-for="item in sexItems"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></v-radio>
                    <div v-if="!sex[i]" class="red--text caption">
                        You must select an option!
                    </div>
                </v-radio-group>            
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="roleFamily[i]"
                    :rules="requiredRule"
                    label="* Role in the family"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="educationsAttainment[i]"
                    :rules="requiredRule"
                    label="* Educational Attainment"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="contributionAmount[i]"
                    :rules="requiredRule"
                    label="* Contributiong (PHP) income/month"
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
                <v-text-field
                    v-model="involveCoffeefarm[i]"
                    :rules="requiredRule"
                    label="* Involve in coffee farm"
                ></v-text-field>
            </v-col>
             <v-col cols="12" md="4" class="py-0 my-0" >
                <v-radio-group v-model="involveCoffeefarm[i]" class="pa-0 ma-0">
                    <p class="pa-0 ma-0">* Involved in coffee farm:</p>
                    <v-radio
                        v-for="item in involveCoffeefarmItems"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></v-radio>
                    <div v-if="!involveCoffeefarm[i]" class="red--text caption">
                        You must select an option!
                    </div>
                </v-radio-group>            
            </v-col>
        </v-row>
        </v-container>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    items: 1,
    name:[],
    age: [],
    sex: [],
    sexItems:[{value:'male',label:'Male'},{value:'female',label:'Female'}],
    roleFamily: [],
    educationsAttainment: [],
    contributionAmount: [],
    involveCoffeefarm: [],
    involveCoffeefarmItems: [{value:'yes',label:'Yes'},{value:'no',label:'No'}],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods:{
    /* test if the form is valid, return boolean */
    validate(){
        alert(this.sex)
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
