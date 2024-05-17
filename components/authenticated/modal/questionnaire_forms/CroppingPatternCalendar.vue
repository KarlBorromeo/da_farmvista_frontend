<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-checkbox-container title="January">
          <v-checkbox
            v-for="item in activityItems"
            v-model="january"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-5"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(january)"
            v-model="januaryOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="February">
          <v-checkbox
            v-for="item in activityItems"
            v-model="february"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(february)"
            v-model="februaryOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="March">
          <v-checkbox
            v-for="item in activityItems"
            v-model="march"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(march)"
            v-model="marchOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="April">
          <v-checkbox
            v-for="item in activityItems"
            v-model="april"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(april)"
            v-model="aprilOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="May">
          <v-checkbox
            v-for="item in activityItems"
            v-model="may"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(may)"
            v-model="mayOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="June">
          <v-checkbox
            v-for="item in activityItems"
            v-model="june"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(june)"
            v-model="juneOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="July">
          <v-checkbox
            v-for="item in activityItems"
            v-model="july"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(july)"
            v-model="julyOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="August">
          <v-checkbox
            v-for="item in activityItems"
            v-model="august"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(august)"
            v-model="augustOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="September">
          <v-checkbox
            v-for="item in activityItems"
            v-model="september"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(september)"
            v-model="septemberOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="October">
          <v-checkbox
            v-for="item in activityItems"
            v-model="october"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(october)"
            v-model="octoberOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="November">
          <v-checkbox
            v-for="item in activityItems"
            v-model="november"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(november)"
            v-model="novemberOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-checkbox-container title="December">
          <v-checkbox
            v-for="item in activityItems"
            v-model="december"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-6"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(december)"
            v-model="decemberOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import { concatOtherValueToList } from '~/reusableFunctions/questionnaireValidation'
import FormCheckboxContainer from '../../form/formCheckboxContainer.vue'
export default {
  components: {
    FormCheckboxContainer,
  },
  data: () => ({
    valid: false,
    january: ['planting'],
    januaryOther: '',
    february: ['planting'],
    februaryOther: '',
    march: ['planting'],
    marchOther: '',
    april: ['planting'],
    aprilOther: '',
    may: ['planting'],
    mayOther: '',
    june: ['planting'],
    juneOther: '',
    july: ['planting'],
    julyOther: '',
    august: ['planting'],
    augustOther: '',
    september: ['planting'],
    septemberOther: '',
    october: ['planting'],
    octoberOther: '',
    november: ['planting'],
    novemberOther: '',
    december: ['planting'],
    decemberOther: '',
    activityItems: ['planting'],
    requiredRule: [(v) => !!v || 'this field is required'],
    listRule: [(v) => {
      if(v.length>0){
        return true
      }else{
        return 'this field is required'
      }
    }]
  }),
  methods: {
    /* 
      test if the form is valid, return boolean,
      this.$refs.form.validate() doesn't really check if the checkboxes are not empty or not 
      that is why using  validateCheckbox manually
    */
    validate() {
      const valid = this.validateCheckbox()
      this.$store.commit('questionnaire/toggleNextTab',{tabName: 'CroppingPatternCalendarValidated',valid});
      if(valid){
        this.$store.commit('questionnaire/saveData',{keyName: 'cropCalendarCoffee',data: this.getData()})
      }
    },
    /* test if checbkoxes are not empty */
    validateCheckbox(){
      if( this.january.length <=0 ||
          this.february.length <=0 ||
          this.march.length <=0 ||
          this.april.length <=0 ||
          this.may.length <=0 ||
          this.june.length <=0 ||
          this.july.length <=0 ||
          this.august.length <=0 ||
          this.september.length <=0 ||
          this.october.length <=0 ||
          this.november.length <=0 ||
          this.december.length <=0 )
        {
          return false;
        }else{
          return true;
        }
    },
    /* check if 'other' checkbox is ticked */
    isOtherTicked(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] == 'others') {
          return true
        }
      }
      return false
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        january: concatOtherValueToList(this.january, this.januaryOther),
        february: concatOtherValueToList(this.february, this.februaryOther),
        march: concatOtherValueToList(this.march, this.marchOther),
        april: concatOtherValueToList(this.april, this.aprilOther),
        may: concatOtherValueToList(this.may, this.mayOther),
        june: concatOtherValueToList(this.june, this.juneOther),
        july: concatOtherValueToList(this.july, this.julyOther),
        august: concatOtherValueToList(this.august, this.augustOther),
        september: concatOtherValueToList(this.september, this.septemberOther),
        october: concatOtherValueToList(this.october, this.octoberOther),
        november: concatOtherValueToList(this.november, this.novemberOther),
        december: concatOtherValueToList(this.december, this.decemberOther),
      }
    },
  },
  beforeMount() {
    this.activityItems = this.$store.getters['questionnaireCode/Code20']
  },
  watch: {
    january(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.januaryOther = ''
      }
    },
    february(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.februaryOther = ''
      }
    },
    march(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.marchOther = ''
      }
    },
    april(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.aprilOther = ''
      }
    },
    may(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.mayOther = ''
      }
    },
    june(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.juneOther = ''
      }
    },
    july(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.julyOther = ''
      }
    },
    august(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.augustOther = ''
      }
    },
    september(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.septemberOther = ''
      }
    },
    october(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.octoberOther = ''
      }
    },
    november(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.novemberOther = ''
      }
    },
    december(value) {
      this.validate()
      const otherTicked = value.findIndex((item) => item == 'others')
      if (otherTicked < 0) {
        this.decemberOther = ''
      }
    },
    januaryOther(){
      this.validate()
    },
februaryOther(){
  this.validate()
},
marchOther(){
  this.validate()
},
aprilOther(){
  this.validate()
},
mayOther(){
  this.validate()
},
juneOther(){
  this.validate()
},
julyOther(){
  this.validate()
},
augustOther(){
  this.validate()
},
septemberOther(){
  this.validate()
},
octoberOther(){
  this.validate()
},
novemberOther(){
  this.validate()
},
decemberOther(){
  this.validate()
},
  },
}
</script>
