<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <!-- <v-row v-for="item in list" :key="item.key">
        <form-radio-container
          v-if="item.type == 'radio'"
          :title="camelToSpace(item.key)"
        >
          <v-radio-group
            :rules="requiredRule"
            v-model="formData[item.key]"
            class="pa-0 ma-0"
          >
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
            v-for="item in formData.printMaterialsReadItems"
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
      </v-row> -->

      <form-radio-container
          title="Do you have a functional radio set"
        >
          <v-radio-group
            :rules="requiredRule"
            v-model="formData.haveFunctionalRadio"
            class="pa-0 ma-0"
          >
            <v-radio
              v-for="item in isAgreeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
      </form-radio-container>

      <form-input-container>
          <v-text-field
            v-model="formData.radioStationUsuallyTune"
            :rules="requiredRule"
            label="Radio station usually tune"
            required
          />
      </form-input-container>

      <form-menu-container>
        <v-dialog
          ref="radioStart"
          v-model="timeDialogRadioStart"
          :return-value.sync="startTimeListeningRadio"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startTimeListeningRadio"
              label="Time start listening radio"
              append-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="timeDialogRadioStart"
            v-model="startTimeListeningRadio"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="timeDialogRadioStart = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.radioStart.save(startTimeListeningRadio)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </form-menu-container>

      <form-menu-container>
          <v-dialog
            ref="radioEnd"
            v-model="timeDialogRadioEnd"
            :return-value.sync="startTimeListeningRadio"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startTimeListeningRadio"
                label="Time end listening radio"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeDialogRadioEnd"
              v-model="startTimeListeningRadio"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="timeDialogRadioEnd = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.radioEnd.save(startTimeListeningRadio)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </form-menu-container>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import { concatOtherValueToList } from '~/reusableFunctions/questionnaireValidation'
import FormCheckboxContainer from '../../form/formCheckboxContainer.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormMenuContainer from '../../form/formMenuContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'

export default {
  components: {
    FormCheckboxContainer,
    FormInputContainer,
    FormRadioContainer,
    FormMenuContainer
  },
  data() {
    return {
      valid: false,
      time: null,
      // menu2: false,
      timeDialogRadioStart: false,
      timeDialogRadioEnd: false,
      formData: {
        haveFunctionalRadio: 'yes',
        radioStationUsuallyTune: 'FRMN',
        startTimeListeningRadio: '',
        endTimeListeningRadio: '',
        radioProgramsListens: 'balita balita',
        printMaterialsRead: ['newspaper', 'magazines'],
        printMaterialsReadOther: '',
        printMaterialsReadItems: [],
        haveTelevision: 'yes',
        tvStationWatches: 'gma',
        startTimeWatchingTv: '',
        endTimeWatchingTv: '',
        haveSocmedAccount: 'yes',
        howOftenUsedSocmed: '3hrs',
      },
      list: [
        { key: 'haveFunctionalRadio', type: 'radio' },
        { key: 'radioStationUsuallyTune' },
        // { 
        //   key: 'startTimeListeningRadio', 
        //   type: 'clock'  
        // },
        { 
          key: 'endTimeListeningRadio', 
          type: 'clock'  
        },
        { key: 'radioProgramsListens' },
        { key: 'printMaterialsRead', type: 'checkbox' },
        { key: 'haveTelevision', type: 'radio' },
        { key: 'tvStationWatches' },
        {
          key: 'startTimeWatchingTv',
          sampleValues: 'ex: 6:00 AM - 8: 00 PM or single value 6:00 AM',
          // type: 'clock'
        },
        {
          key: 'endTimeWatchingTv',
          sampleValues: 'ex: 6:00 AM - 8: 00 PM or single value 6:00 AM',
          // type: 'clock'
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
      const textRadioValid = this.$refs.form.validate()
      const checkboxValid = this.validateCheckbox()
      let valid = false
      if (textRadioValid && checkboxValid) {
        valid = true
      }
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'InformationKnowledgeSourcesValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'infoKnowledgeSource',
          data: this.getData(),
        })
      }
    },
    /* validate if checkbox is empty or not */
    validateCheckbox() {
      if (this.formData.printMaterialsRead.length == 0) {
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
    saveTime(time){
      this.timeListeningRadio[0] = time
    }
  },
  beforeMount() {
    this.formData.printMaterialsReadItems =
      this.$store.getters['questionnaireCode/PrintMaterials']
  },
  watch: {
    formData: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
    'formData.printMaterialsRead': function(value) {
      const otherTicked = value.forEach((element) => element == 'others')
      if (otherTicked) {
        this.formData.printMaterialsReadOther = ''
      }
    },
  },
}
</script>
