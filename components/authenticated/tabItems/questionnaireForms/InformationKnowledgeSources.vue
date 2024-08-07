<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <form-radio-container
          title="Do you have a functional radio set"
        >
          <v-radio-group
            v-model="formData.haveFunctionalRadio"
            class="pa-0 ma-0"
            row
          >
            <v-radio
              v-for="item in isAgreeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-input-container v-if="formData.haveFunctionalRadio == 'yes'">
          <v-text-field
            v-model="formData.radioStationUsuallyTune"
            :rules="requiredRule"
            label="* Radio station usually tune"
            required
          />
        </form-input-container>

        <form-menu-container v-if="formData.haveFunctionalRadio == 'yes'">
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
                label="* Time start listening radio"
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

        <form-menu-container v-if="formData.haveFunctionalRadio == 'yes'">
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

        <form-input-container v-if="formData.haveFunctionalRadio == 'yes'">
          <v-text-field
            v-model="formData.radioProgramsListens"
            :rules="requiredRule"
            label="* Types of radio programs listen to"
            required
          />
        </form-input-container>
        <form-radio-container title="print materials read most">
          <v-radio-group
            v-model="formData.printMaterialsRead"
            class="pa-0 ma-0"
            row
          >
            <v-radio
              v-for="item in formData.printMaterialsReadItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            v-if="formData.printMaterialsRead == 'others'"
            v-model="formData.printMaterialsReadOther"
            :rules="requiredRule"
            label="* please specify"
          ></v-text-field>
        </form-radio-container>

        <form-radio-container
          title="Do you have a television (TV) set?"
        >
          <v-radio-group
            v-model="formData.haveTelevision"
            class="pa-0 ma-0"
            row
          >
            <v-radio
              v-for="item in isAgreeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-input-container v-if="formData.haveTelevision == 'yes'">
          <v-text-field
            v-model="formData.tvStationWatches"
            :rules="requiredRule"
            label="* What TV stations do you watch?"
            required
          />
        </form-input-container>

        <form-menu-container v-if="formData.haveTelevision == 'yes'">
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
                label="* Time start watching TV"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeDialogTVStart"
              v-model="formData.startTimeWatchingTv"
              :rules="requiredRule"
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

        <form-menu-container v-if="formData.haveTelevision == 'yes'">
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

        <form-radio-container
          title="Do you have a social media account?"
        >
          <v-radio-group
            v-model="formData.haveSocmedAccount"
            class="pa-0 ma-0"
            row
          >
            <v-radio
              v-for="item in isAgreeItems"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
        </form-radio-container>

        <form-input-container v-if="formData.haveSocmedAccount == 'yes'">
          <v-text-field
            v-model="formData.howOftenUsedSocmed"
            :rules="numberRule"
            label="* How do you often use social media everyday?"
            required
            type="number"
            min="0"
          />
        </form-input-container>
      </v-row>
    </v-container>
    <!-- <v-btn @click="validate">Validate</v-btn> -->
  </v-form>
</template>

<script>
import {
  concatinateOtherValueToString,
  isOtherValueDefinedRadio,
  extractUnmatchedValueRadio,
} from '~/reusableFunctions/questionnaireValidation'
import FormCheckboxContainer from '~/components/authenticated/form/formCheckboxContainer.vue'
import FormInputContainer from '~/components/authenticated/form/formInputContainer.vue'
import FormMenuContainer from '~/components/authenticated/form/formMenuContainer.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'

export default {
  activated(){
    this.validate()
  },
  components: {
    FormCheckboxContainer,
    FormInputContainer,
    FormRadioContainer,
    FormMenuContainer,
  },
  data: () => ({
    // return {
    valid: false,
    // menu2: false,
    timeDialogRadioStart: false,
    timeDialogRadioEnd: false,
    timeDialogTVStart: false,
    timeDialogTVEnd: false,
    formData: {
      haveFunctionalRadio: 'yes',
      radioStationUsuallyTune: 'FRMN',
      startTimeListeningRadio: '08:00',
      endTimeListeningRadio: '11:00',
      radioProgramsListens: 'balita balita',
      printMaterialsRead: 'newspaper',
      printMaterialsReadOther: '',
      printMaterialsReadItems: [],
      haveTelevision: 'yes',
      tvStationWatches: 'fdas',
      startTimeWatchingTv: '01:00',
      endTimeWatchingTv: '03:00',
      haveSocmedAccount: 'yes',
      howOftenUsedSocmed: '3',
    },
    isAgreeItems: ['yes', 'no'],
    requiredRule: [(v) => !!v || 'This field is required'],
    numberRule: [(v) => parseInt(v) >= 0 || 'invalid number'],
    // }
  }),
  methods: {
    /* test if the form is valid, return boolean */
    async validate() {
      await new Promise(resolve => setTimeout(resolve,300))
      const valid = this.$refs.form.validate()
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
          this.convertTimeToHHMM(this.formData.startTimeListeningRadio),
          this.convertTimeToHHMM(this.formData.endTimeListeningRadio),
        ],
        radioProgramsListens: this.formData.radioProgramsListens,
        printMaterialsRead: concatinateOtherValueToString(
          this.formData.printMaterialsRead,
          this.formData.printMaterialsReadOther
        ),
        haveTelevision: this.formData.haveTelevision,
        tvStationWatches: this.formData.tvStationWatches,
        timeWatchingTv: [
          this.convertTimeToHHMM(this.formData.startTimeWatchingTv),
          this.convertTimeToHHMM(this.formData.endTimeWatchingTv),
        ],
        haveSocmedAccount: this.formData.haveSocmedAccount,
        howOftenUsedSocmed: parseInt(this.formData.howOftenUsedSocmed),
      }
    },
        /* converts into hh:mm format*/
    convertTimeToHHMM(timeStr) {
      if (!timeStr) {
        return ''
      }
      // Split the time string by colon
      let timeParts = timeStr.split(':')
      // Extract hours and minutes
      let hours = timeParts[0]
      let minutes = timeParts[1]
      // Format the result as hh:mm
      return `${hours}:${minutes}`
    },
  },
  beforeMount() {
    this.formData.printMaterialsReadItems =
      this.$store.getters['questionnaireCode/PrintMaterials']

    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      this.formData.haveFunctionalRadio =
        data.infoKnowledgeSource.haveFunctionalRadio
      this.formData.radioStationUsuallyTune =
        data.infoKnowledgeSource.radioStationUsuallyTune
      this.formData.startTimeListeningRadio = data.infoKnowledgeSource.timeListeningRadio.length>=1? data.infoKnowledgeSource.timeListeningRadio[0]: ''
      this.formData.endTimeListeningRadio = data.infoKnowledgeSource.timeListeningRadio.length==2? data.infoKnowledgeSource.timeListeningRadio[1]: ''
      this.formData.radioProgramsListens =
        data.infoKnowledgeSource.radioProgramsListens
      this.formData.printMaterialsRead = isOtherValueDefinedRadio(
        data.infoKnowledgeSource.printMaterialsRead,
        this.formData.printMaterialsReadItems
      )
      this.formData.printMaterialsReadOther = extractUnmatchedValueRadio(
        data.infoKnowledgeSource.printMaterialsRead,
        this.formData.printMaterialsReadItems
      )
      this.formData.haveTelevision = data.infoKnowledgeSource.haveTelevision
      this.formData.tvStationWatches = data.infoKnowledgeSource.tvStationWatches
      this.formData.startTimeWatchingTv = data.infoKnowledgeSource.timeWatchingTv.length >= 1?data.infoKnowledgeSource.timeWatchingTv[0]: ''
      this.formData.endTimeWatchingTv = data.infoKnowledgeSource.timeWatchingTv.length == 2? data.infoKnowledgeSource.timeWatchingTv[1]: ''
      this.formData.haveSocmedAccount =
        data.infoKnowledgeSource.haveSocmedAccount
      this.formData.howOftenUsedSocmed =
        data.infoKnowledgeSource.howOftenUsedSocmed
    } else {
      this.formData.haveFunctionalRadio = ''
      this.formData.radioStationUsuallyTune = ''
      this.formData.startTimeListeningRadio = ''
      this.formData.endTimeListeningRadio = ''
      this.formData.radioProgramsListens = ''
      this.formData.printMaterialsRead = ''
      this.formData.printMaterialsReadOther = ''
      this.formData.haveTelevision = ''
      this.formData.tvStationWatches = ''
      this.formData.startTimeWatchingTv = ''
      this.formData.endTimeWatchingTv = ''
      this.formData.haveSocmedAccount = ''
      this.formData.howOftenUsedSocmed = 0
    }
  },
  watch: {
    formData: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
    'formData.printMaterialsRead': function (value) {
      if (value !== 'others') {
        this.formData.printMaterialsReadOther = ''
      }
    },
  },
}
</script>
