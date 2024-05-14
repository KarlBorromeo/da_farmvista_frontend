<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row v-for="item in list" :key="item.key">
        <form-radio-container
          v-if="item.type == 'radio'"
          :title="camelToSpace(item.key)"
        >
          <v-radio-group :rules="requiredRule" v-model="formData[item.key]" class="pa-0 ma-0">
            <v-radio
              v-for="item in isAgreeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-checkbox-container
          v-else-if="item.type == 'checkbox'"
          :title="camelToSpace(item.key)"
        >
          <v-checkbox
            :rules="listRule"
            v-for="item in printMaterialsReadItems"
            v-model="formData.printMaterialsRead"
            :key="item"
            :value="item"
            :label="item"
            dense
            class="ma-0 pa-0 ml-5"
            style="display: inline-block"
          ></v-checkbox>
          <v-text-field
            v-if="isOtherTicked(formData.printMaterialsRead)"
            v-model="formData.printMaterialsReadOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-checkbox-container>

        <form-input-container v-else>
          <v-text-field
            v-model="formData[item.key]"
            :rules="requiredRule"
            :placeholder="item.sampleValues"
            :label="camelToSpace(item.key)"
            required
          />
        </form-input-container>
      </v-row>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import { concatOtherValueToList } from '~/reusableFunctions/questionnaireValidation'
import FormCheckboxContainer from '../../form/formCheckboxContainer.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'

export default {
  components: {
    FormCheckboxContainer,
    FormInputContainer,
    FormRadioContainer,
  },
  data() {
    return {
      valid: false,
      formData: {
        haveFunctionalRadio: '',
        radioStationUsuallyTune: '',
        timeListeningRadio: '',
        radioProgramsListens: '',
        printMaterialsRead: [],
        printMaterialsReadOther: '',
        printMaterialsReadItems: [],
        haveTelevision: '',
        tvStationWatches: '',
        timeWatchingTv: '',
        haveSocmedAccount: '',
        howOftenUsedSocmed: '',
      },
      list: [
        { key: 'haveFunctionalRadio', type: 'radio' },
        { key: 'radioStationUsuallyTune' },
        { key: 'timeListeningRadio' },
        { key: 'radioProgramsListens' },
        { key: 'printMaterialsRead', type: 'checkbox' },
        { key: 'haveTelevision', type: 'radio' },
        { key: 'tvStationWatches' },
        {
          key: 'timeWatchingTv',
          sampleValues: 'ex: 6:00 AM - 8: 00 PM or single value 6:00 AM',
        },
        { key: 'haveSocmedAccount', type: 'radio' },
        { key: 'howOftenUsedSocmed' },
      ],
      isAgreeItems: ['yes', 'no'],
      requiredRule: [(v) => !!v || 'This field is required'],
      listRule: [(v) => v.length > 0 || 'this field is required'],
    }
  },
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      console.log(valid,this.getData())
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
      const data = {}
      for (let i = 0; i < this.list.length; i++) {
        const keyName = this.list[i].key
        if (keyName == 'printMaterialsRead') {
          data[keyName] = concatOtherValueToList(
            this.formData[keyName],
            this.formData.printMaterialsReadOther
          )
        } else {
          data[keyName] = this.formData[keyName]
        }
      }
      return data
    },
    /* convert camelCase Key into Camel Casing String with spaces */
    camelToSpace(camelCased) {
      const hasNumber = /\d/.test(camelCased)
      let array = []
      if (hasNumber) {
        array = camelCased.match(/[A-Z]?[a-z]+|\d+/g)
      } else {
        array = camelCased.match(/[A-Z]?[a-z]*|\d+/g)
      }
      let spacedString = array.join(' ')
      let text = ''
      let letter = ''
      for (let i = 0; i < spacedString.length; i++) {
        letter = spacedString[i]
        if (i == 0) {
          letter = spacedString[i].toUpperCase()
        }
        text += letter
      }
      return text + ' ?'
    },
  },
  beforeMount() {
    this.printMaterialsReadItems =
      this.$store.getters['questionnaireCode/PrintMaterials']
  },
  watch: {
    printMaterialsRead(value){
      const otherTicked = value.forEach((element) => element == 'others');
      if(otherTicked){
        this.printMaterialsReadOther = '';
      }
    }
  }
}
</script>

