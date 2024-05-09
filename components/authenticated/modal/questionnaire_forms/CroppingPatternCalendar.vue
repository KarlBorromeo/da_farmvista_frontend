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
          <div v-if="january.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="february.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="march.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="april.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="may.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="june.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="july.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="august.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="september.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="october.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="november.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
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
          <div v-if="december.length == 0" class="red--text caption pa-0 ma-0">
            You must select at least one option!
          </div>
        </form-checkbox-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormCheckboxContainer from '../../cards/formCheckboxContainer.vue'
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
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      const validRadio = this.validateRadio()
      if (valid && validRadio) {
        const data = this.getData()
        console.log(data)
      } else {
        alert('invalid')
      }
    },
    /* check if radio inputs are not empty */
    validateRadio() {
      if (
        this.january.length == 0 ||
        this.february.length == 0 ||
        this.march.length == 0 ||
        this.april.length == 0 ||
        this.may.length == 0 ||
        this.june.length == 0 ||
        this.july.length == 0 ||
        this.august.length == 0 ||
        this.september.length == 0 ||
        this.october.length == 0 ||
        this.november.length == 0 ||
        this.december.length == 0
      ) {
        return false
      }
      return true
    },
    /* concatenate the value of other into the index of list that has 'other' */
    concatOtherValue(list, other) {
      if (!!other) {
        for (let i = 0; i < list.length; i++) {
          if (list[i] == 'others') {
            list[i] += ' ' + other
            break
          }
        }
      }
      return list
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
        january: this.concatOtherValue(this.january, this.januaryOther),
        february: this.concatOtherValue(this.february, this.februaryOther),
        march: this.concatOtherValue(this.march, this.marchOther),
        april: this.concatOtherValue(this.april, this.aprilOther),
        may: this.concatOtherValue(this.may, this.mayOther),
        june: this.concatOtherValue(this.june, this.juneOther),
        july: this.concatOtherValue(this.july, this.julyOther),
        august: this.concatOtherValue(this.august, this.augustOther),
        september: this.concatOtherValue(this.september, this.septemberOther),
        october: this.concatOtherValue(this.october, this.octoberOther),
        november: this.concatOtherValue(this.november, this.novemberOther),
        december: this.concatOtherValue(this.december, this.decemberOther),
      }
    },
  },
  beforeMount() {
    this.activityItems = this.$store.getters['questionnaireCode/Code20']
  },
}
</script>
