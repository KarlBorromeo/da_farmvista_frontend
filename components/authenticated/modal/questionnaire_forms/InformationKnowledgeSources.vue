<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-radio-container title="Do you have a functional radio set">
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
            :return-value.sync="formData.startTimeListeningRadio"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formData.startTimeListeningRadio"
                label="Time start listening radio"
                append-icon="mdi-clock-time-four-outline"
                :rules="requiredRule"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeDialogRadioStart"
              v-model="formData.startTimeListeningRadio"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="timeDialogRadioStart = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.radioStart.save(formData.startTimeListeningRadio)"
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
            :return-value.sync="formData.endTimeListeningRadio"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formData.endTimeListeningRadio"
                label="Time end listening radio"
                append-icon="mdi-clock-time-four-outline"
                :rules="requiredRule"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeDialogRadioEnd"
              v-model="formData.endTimeListeningRadio"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="timeDialogRadioEnd = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.radioEnd.save(formData.endTimeListeningRadio)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </form-menu-container>

        <form-input-container>
          <v-text-field
            v-model="formData.radioProgramsListens"
            :rules="requiredRule"
            label="Types of radio programs listen to"
            required
          />
        </form-input-container>

        <form-checkbox-container title="print materials read most">
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

        <form-radio-container title="Do you have a television (TV) set?">
          <v-radio-group
            :rules="requiredRule"
            v-model="formData.haveTelevision"
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
            v-model="formData.tvStationWatches"
            :rules="requiredRule"
            label="What TV stations do you watch?"
            required
          />
        </form-input-container>

        <form-menu-container>
          <v-dialog
            ref="tvStart"
            v-model="timeDialogTVStart"
            :return-value.sync="formData.startTimeWatchingTv"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formData.startTimeWatchingTv"
                label="Time start watching TV"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeDialogTVStart"
              v-model="formData.startTimeWatchingTv"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="timeDialogTVStart = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.tvStart.save(formData.startTimeWatchingTv)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </form-menu-container>

        <form-menu-container>
          <v-dialog
            ref="tvEnd"
            v-model="timeDialogTVEnd"
            :return-value.sync="formData.endTimeWatchingTv"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formData.endTimeWatchingTv"
                label="Time end watching TV"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeDialogTVEnd"
              v-model="formData.endTimeWatchingTv"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="timeDialogTVEnd = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.tvEnd.save(formData.endTimeWatchingTv)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </form-menu-container>

        <form-radio-container title="Do you have a social media account?">
          <v-radio-group
            :rules="requiredRule"
            v-model="formData.haveSocmedAccount"
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
            v-model="formData.howOftenUsedSocmed"
            :rules="requiredRule"
            label="How do you often use social media?"
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
import FormMenuContainer from '../../form/formMenuContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'

export default {
  components: {
    FormCheckboxContainer,
    FormInputContainer,
    FormRadioContainer,
    FormMenuContainer,
  },
  data() {
    return {
      valid: false,
      // menu2: false,
      timeDialogRadioStart: false,
      timeDialogRadioEnd: false,
      timeDialogTVStart: false,
      timeDialogTVEnd: false,
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
      isAgreeItems: ['yes', 'no'],
      requiredRule: [(v) => !!v || 'This field is required'],
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
      console.log('data: ', this.getData(), valid)
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
      return {
        haveFunctionalRadio: this.formData.haveFunctionalRadio,
        radioStationUsuallyTune: this.formData.radioStationUsuallyTune,
        timeListeningRadio: [
          this.formData.startTimeListeningRadio,
          this.formData.endTimeListeningRadio,
        ],
        radioProgramsListens: this.formData.radioProgramsListens,
        printMaterialsRead: concatOtherValueToList(
          this.formData.printMaterialsRead,
          this.formData.printMaterialsReadOther
        ),
        haveTelevision: this.formData.haveTelevision,
        tvStationWatches: this.formData.tvStationWatches,
        timeWatchingTv: [
          this.formData.startTimeWatchingTv,
          this.formData.endTimeWatchingTv,
        ],
        haveSocmedAccount: this.formData.haveSocmedAccount,
        howOftenUsedSocmed: this.formData.howOftenUsedSocmed,
      }
    },
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
    'formData.printMaterialsRead': function (value) {
      const otherTicked = value.forEach((element) => element == 'others')
      if (otherTicked) {
        this.formData.printMaterialsReadOther = ''
      }
    },
  },
}
</script>
