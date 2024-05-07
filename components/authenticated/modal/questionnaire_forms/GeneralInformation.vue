<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="py-0 pb-2 my-0" >
          <v-text-field
            v-model="age"
            :rules="ageRule"
            label="* Age"
            type="number"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="py-0 my-0" >
            <v-radio-group v-model="sex" class="pa-0 ma-0">
                <p class="pa-0 ma-0">* Sex:</p>
                <v-radio
                    v-for="item in sexItems"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></v-radio>
                <div v-if="!sex" class="red--text caption">
                    You must select an option!
                </div>
            </v-radio-group>            
        </v-col>

        <v-col cols="12" md="4" class="py-0 my-0" >
            <v-radio-group v-model="civilStatus" class="pa-0 ma-0">
                <p class="pa-0 ma-0">* Civil Status:</p>
                <v-radio
                    v-for="item in civilStatusItems"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></v-radio>
                <div v-if="!civilStatus" class="red--text caption">
                    You must select an option!
                </div>
            </v-radio-group>            
        </v-col>


        <v-col cols="12" md="4" class="py-0 pb-2" >
          <v-text-field
            v-model="religion"
            :rules="requiredRule"
            label="* Religion"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="py-0 pb-2" >
          <v-text-field
            v-model="highestEducationAttained"
            :rules="requiredRule"
            label="* Highest Educational Attainment"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="py-0 my-0 pb-2" >
            <v-radio-group v-model="isBelongMarginalizedSector" class="py-0 my-0">
                <p class="pa-0 ma-0">* Belongs to the Marginalized Sector:</p>
                <v-radio
                    v-for="item in isBelongMarginalizedSectorItems"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></v-radio>
                <div v-if="!isBelongMarginalizedSector" class="red--text caption">
                    You must select an option!
                </div>
            </v-radio-group>            
        </v-col>
        
        <v-col v-if="isBelongMarginalizedSector=='no'" cols="12" md="4" class="py-0 my-0" >
            <p class="pa-0 ma-0 mb-2">* If you answered 'no' to the previous question: please specify</p>
            <v-checkbox
                v-for="item in nonMarginalizedSectorItems"
                v-model="nonMarginalizedSector"
                :key="item.value"
                :value="item.value"
                :label="item.label"
                class="ma-0 pa-0"
            ></v-checkbox>  
            <div v-if="emptyNonMarginalizedSector" class="red--text caption pa-0 ma-0">
                    You must select at least one option!
            </div>          
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
    age: null,
    ageRule:[(v)=>{
        if(v){
            if(v > 0 && v < 100){
                return true
            }
            return 'Age must be more than 0 and less than 100' 
        }
        return 'Age is required'
    }],
    sex: '',
    sexItems:[{value:'male',label:'Male'},{value:'female',label:'Female'}],
    civilStatus: '',
    civilStatusItems: [
        {value:'single',label:'Single'},
        {value:'married',label:'Married'},
        {value:'widow/widower',label:'Widow/Widower'},
        {value:'separated',label:'Separated'},
        {value:'common law partnership',label:'Common Law Partnership'}
        ],
    religion: '',
    highestEducationAttained: '',
    isBelongMarginalizedSector: '',
    isBelongMarginalizedSectorItems: [{value:'yes',label:'Yes'},{value:'no',label:'No'}],
    nonMarginalizedSector: [],
    nonMarginalizedSectorItems:[
        {value:'senior citizen',label:'Senior Citizen'},
        {value:'ingigenous people',label:'Indigenous People'},
        {value:'person with disability',label:'Person with Disability'},
        {value:'4Ps beneficiary',label:'4Ps Beneficiary'}
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
  }),
  methods:{
    /* test if the form is valid, return boolean */
    validate() {
      console.log('validated: ',this.$refs.form.validate());
      console.log('checkboxes',this.nonMarginalizedSector)
    },
  },
  computed:{
    emptyNonMarginalizedSector(){
        if(this.nonMarginalizedSector.length == 0){
            return true
        }else{
            return false
        }
    }
  }
}
</script>
