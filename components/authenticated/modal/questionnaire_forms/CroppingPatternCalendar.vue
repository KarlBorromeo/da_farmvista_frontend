<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-checkbox-container title="January">
          <v-checkbox
            v-for="item in activityItems"
            v-model="january"
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
            :rules="listRule"
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
    january: [],
    januaryOther: '',
    february: [],
    februaryOther: '',
    march: [],
    marchOther: '',
    april: [],
    aprilOther: '',
    may: [],
    mayOther: '',
    june: [],
    juneOther: '',
    july: [],
    julyOther: '',
    august: [],
    augustOther: '',
    september: [],
    septemberOther: '',
    october: [],
    octoberOther: '',
    november: [],
    novemberOther: '',
    december: [],
    decemberOther: '',
    activityItems: [],
    requiredRule: [(v) => !!v || 'this field is required'],
    listRule: [(v) => v.length > 0 || 'select at least one option'],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      console.log(valid, this.getData())
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
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.januaryOther = ''
      }
    },
    february(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.februaryOther = ''
      }
    },
    march(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.marchOther = ''
      }
    },
    april(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.aprilOther = ''
      }
    },
    may(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.mayOther = ''
      }
    },
    june(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.juneOther = ''
      }
    },
    july(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.julyOther = ''
      }
    },
    august(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.augustOther = ''
      }
    },
    september(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.septemberOther = ''
      }
    },
    october(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.octoberOther = ''
      }
    },
    november(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.novemberOther = ''
      }
    },
    december(value) {
      const otherTicked = value.findIndex((item) => item == 'others')
      if (!otherTicked) {
        this.decemberOther = ''
      }
    },
  },
}
</script>
