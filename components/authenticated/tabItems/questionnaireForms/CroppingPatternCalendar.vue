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
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import {
  concatOtherValueToList,
  isOtherValueTickedCheckbox,
  extractUnmatchedValueCheck,
} from '~/reusableFunctions/questionnaireValidation'
import FormCheckboxContainer from '~/components/authenticated/form/formCheckboxContainer.vue'
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
    activityItems: [],
    requiredRule: [(v) => !!v || 'this field is required'],
    listRule: [
      (v) => {
        if (v.length > 0) {
          return true
        } else {
          return 'this field is required'
        }
      },
    ],
    tempValue: '',
  }),
  methods: {
    /* 
      test if the form is valid, return boolean,
      this.$refs.form.validate() doesn't really check if the checkboxes are not empty or not 
      that is why using  validateCheckbox manually
    */
    validate() {
      const valid = this.validateCheckbox()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'CroppingPatternCalendarValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'cropCalendarCoffee',
          data: this.getData(),
        })
      }
    },
    /* test if checbkoxes are not empty */
    validateCheckbox() {
      if (
        this.january.includes('others')  && !this.januaryOther ||
        this.february.includes('others') && !this.februaryOther ||
        this.march.includes('others') && !this.marchOther ||
        this.april.includes('others') && !this.aprilOther ||
        this.may.includes('others') && !this.mayOther ||
        this.june.includes('others') && !this.juneOther ||
        this.july.includes('others') && !this.julyOther ||
        this.august.includes('others') && !this.augustOther ||
        this.september.includes('others') && !this.septemberOther ||
        this.october.includes('others') && !this.octoberOther ||
        this.november.includes('others') && !this.novemberOther ||
        this.december.includes('others') && !this.decemberOther
      ) {
        return false
      } else {
        return true
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
    this.validate()
    this.activityItems = this.$store.getters['questionnaireCode/Code20']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.january = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.january,
        this.activityItems
      )
      this.januaryOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.january,
        this.activityItems
      )
      this.february = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.february,
        this.activityItems
      )
      this.februaryOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.february,
        this.activityItems
      )
      this.march = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.march,
        this.activityItems
      )
      this.marchOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.march,
        this.activityItems
      )
      this.april = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.april,
        this.activityItems
      )
      this.aprilOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.april,
        this.activityItems
      )
      this.may = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.may,
        this.activityItems
      )
      this.mayOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.may,
        this.activityItems
      )
      this.june = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.june,
        this.activityItems
      )
      this.juneOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.june,
        this.activityItems
      )
      this.july = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.july,
        this.activityItems
      )
      this.julyOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.july,
        this.activityItems
      )
      this.august = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.august,
        this.activityItems
      )
      this.augustOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.august,
        this.activityItems
      )
      this.september = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.september,
        this.activityItems
      )
      this.septemberOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.september,
        this.activityItems
      )
      this.october = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.october,
        this.activityItems
      )
      this.octoberOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.october,
        this.activityItems
      )
      this.november = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.november,
        this.activityItems
      )
      this.novemberOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.november,
        this.activityItems
      )
      this.december = isOtherValueTickedCheckbox(
        data.cropCalendarCoffee.december,
        this.activityItems
      )
      this.decemberOther = extractUnmatchedValueCheck(
        data.cropCalendarCoffee.december,
        this.activityItems
      )
    } else {
      this.february = []
      this.februaryOther = ''
      this.march = []
      this.marchOther = ''
      this.april = []
      this.aprilOther = ''
      this.may = []
      this.mayOther = ''
      this.june = []
      this.juneOther = ''
      this.july = []
      this.julyOther = ''
      this.august = []
      this.augustOther = ''
      this.september = []
      this.septemberOther = ''
      this.october = []
      this.octoberOther = ''
      this.november = []
      this.novemberOther = ''
      this.december = []
      this.decemberOther = ''
    }
    this.tempValue = 'tempValue'
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
    januaryOther() {
      this.validate()
    },
    februaryOther() {
      this.validate()
    },
    marchOther() {
      this.validate()
    },
    aprilOther() {
      this.validate()
    },
    mayOther() {
      this.validate()
    },
    juneOther() {
      this.validate()
    },
    julyOther() {
      this.validate()
    },
    augustOther() {
      this.validate()
    },
    septemberOther() {
      this.validate()
    },
    octoberOther() {
      this.validate()
    },
    novemberOther() {
      this.validate()
    },
    decemberOther() {
      this.validate()
    },
    tempValue() {
      this.validate()
    },
  },
}
</script>
