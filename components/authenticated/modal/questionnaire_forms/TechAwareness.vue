<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card>
        <v-row>
          <form-radio-container title="Have you heard about coffee farming tech/practices">
                <v-radio-group
                  :rules="requiredRule"
                  v-model="haveHeardCoffeeFarmTech"
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
        </v-row>
      </form-card>
      <form-card v-for="item in list" :key="item">
        <p class="my-2 pb-0 font-weight-medium">
          {{ camelToSpace(item) }}
        </p>
        <v-row>
          <form-radio-container title="have you heard?">
            <v-radio-group
              :rules="requiredRule"
              v-model="formData[item].isHeard"
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
          <form-input-container v-if="formData[item].isHeard == 'yes'">
            <v-text-field
              v-model="formData[item].sourceInfo"
              :rules="requiredRule"
              label="* Source of information"
            ></v-text-field>
          </form-input-container>
          <form-input-container v-if="formData[item].isHeard == 'yes'">
            <v-text-field
              v-model="formData[item].howDidLearnTechPractices"
              :rules="requiredRule"
              label="* How did you learn about the Tech/Practices"
            ></v-text-field>
          </form-input-container>
          <form-input-container v-if="formData[item].isHeard == 'yes'">
            <v-text-field
              v-model="formData[item].year"
              :rules="yearRule"
              label="* Year"
            ></v-text-field>
          </form-input-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import formCard from '../../form/formCard.vue'
import FormInputContainer from '../../form/formInputContainer.vue'
import FormRadioContainer from '../../form/formRadioContainer.vue'
export default {
  components: {
    formCard,
    FormInputContainer,
    FormRadioContainer,
  },
  data: () => ({
    valid: false,
    haveHeardCoffeeFarmTech: '',
    formData: {
      methodsPropagationSeed: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      methodsPropagationGrafting: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      methodsPropagationCutting: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      methodsPropagationTissueCulture: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      monocropping: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      multipleCroppping: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      intercroppping: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      coffeePlantingDistance: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      shadeEstablishment: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      layouting: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      staking: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      holeDigging: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      transplanting: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      weeding: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      mulching: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      basal: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      foliar: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      splitApplication: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      sideDress: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      drenching: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      visual: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      traps: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      sweepNet: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      handpicking: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      geneticControl: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      regulatoryControl: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      culturalControl: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      physicalControl: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      mechanicalControl: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      biologicalControl: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      chemicalControl: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      singleStemPruning: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      mulitpleStemPruning: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      sidePruning: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      fullStumping: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      rehabilitation: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      singlePassStripping: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      multiPassStripping: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      selectivePicking: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      mechanicalHarvesting: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      dryMethod: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      wetMethod: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      semiDryMethod: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      sunDrying: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      solarDrying: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      artificialDrying: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      manualHullingMilling: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      mechanicalHullingMilling: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      polishing: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      cleaning: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      bySizeDensitySorting: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      byColorSorting: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      blackBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      moldyBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      sourPartialSourBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      crystalizedBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      fadedStreakedBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      fadedOldishBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      fadedAmberButtery: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      fadedOverDriedBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      fadedCutNippedBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      insectDamagedBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      shrunkBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      immatureBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      pressedCrushedBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      wetUndriedBeans: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      grade1Specialty: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      grade2Premium: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      grade3Exchange: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      grade4BelowStandard: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
      grade5OffGrade: {
        isHeard: '',
        sourceInfo: '',
        howDidLearnTechPractices: '',
        year: ''
      },
    },
    list : [
      'methodsPropagationSeed',
      'methodsPropagationGrafting',
      'methodsPropagationCutting',
      'methodsPropagationTissueCulture',
      'monocropping',
      'multipleCroppping',
      'intercroppping',
      'coffeePlantingDistance',
      'shadeEstablishment',
      'layouting',
      'staking',
      'holeDigging',
      'transplanting',
      'weeding',
      'mulching',
      'basal',
      'foliar',
      'splitApplication',
      'sideDress',
      'drenching',
      'visual',
      'traps',
      'sweepNet',
      'handpicking',
      'geneticControl',
      'regulatoryControl',
      'culturalControl',
      'physicalControl',
      'mechanicalControl',
      'biologicalControl',
      'chemicalControl',
      'singleStemPruning',
      'mulitpleStemPruning',
      'sidePruning',
      'fullStumping',
      'rehabilitation',
      'singlePassStripping',
      'multiPassStripping',
      'selectivePicking',
      'mechanicalHarvesting',
      'dryMethod',
      'wetMethod',
      'semiDryMethod',
      'sunDrying',
      'solarDrying',
      'artificialDrying',
      'manualHullingMilling',
      'mechanicalHullingMilling',
      'polishing',
      'cleaning',
      'bySizeDensitySorting',
      'byColorSorting',
      'blackBeans',
      'moldyBeans',
      'sourPartialSourBeans',
      'crystalizedBeans',
      'fadedStreakedBeans',
      'fadedOldishBeans',
      'fadedAmberButtery',
      'fadedOverDriedBeans',
      'fadedCutNippedBeans',
      'insectDamagedBeans',
      'shrunkBeans',
      'immatureBeans',
      'pressedCrushedBeans',
      'wetUndriedBeans',
      'grade1Specialty',
      'grade2Premium',
      'grade3Exchange',
      'grade4BelowStandard',
      'grade5OffGrade',
    ],

    isAgreeItems: ['yes','no'],
    yearRule: [
      (v) => !!v || 'This field is required, n/a if none', 
      (v) => {
        const value = parseInt(v);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        if(value > 1900 && value <= currentYear){
          return true
        }else{
          return 'invalid year'
        }
      }
    ],
    requiredRule: [(v) => !!v || 'This field is required'],
    numberRule: [
      (v) => !!v || 'This field is required',
      (v) => parseInt(v) >= 0 || 'invalid value',
    ],
  }),
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      console.log(valid,this.getData())
    },
    /* convert camelCase Key into Camel Casing String with spaces */
    camelToSpace(camelCased){
      const hasNumber = /\d/.test(camelCased)
      let array = [];
      if(hasNumber){
          array = camelCased.match(/[A-Z]?[a-z]+|\d+/g);
      }else{
          array = camelCased.match(/[A-Z]?[a-z]*|\d+/g);
      }
      let spacedString = array.join(' ');
      let text = '';
      let letter = '';
      for(let i=0; i<spacedString.length; i++){
          letter = spacedString[i];
          if(i==0){
              letter = spacedString[i].toUpperCase();
          }
          text += letter;
      }
      return text;
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      const data = {};
      data['haveHeardCoffeeFarmTech'] = this.haveHeardCoffeeFarmTech;
      for(let i=0; i<this.list.length; i++){
        const keyName = this.list[i];
        data[keyName] = {
          isHeard: this.formData[keyName].isHeard,
          sourceInfo: this.formData[keyName].sourceInfo,
          howDidLearnTechPractices: this.formData[keyName].howDidLearnTechPractices,
          year: this.formData[keyName].year
        }
      }
      return data;
    },
  },
  watch: {
    'formData.methodsPropagationSeed.isHeard': function(value){
      if(value == 'no'){
        this.formData.methodsPropagationSeed.sourceInfo = '';
        this.formData.methodsPropagationSeed.howDidLearnTechPractices = '';
        this.formData.methodsPropagationSeed.year = '';
      }
    },
    'formData.methodsPropagationGrafting.isHeard': function(value){
      if(value == 'no'){
        this.formData.methodsPropagationGrafting.sourceInfo = '';
        this.formData.methodsPropagationGrafting.howDidLearnTechPractices = '';
        this.formData.methodsPropagationGrafting.year = '';
      }
    },
    'formData.methodsPropagationCutting.isHeard': function(value){
      if(value == 'no'){
        this.formData.methodsPropagationCutting.sourceInfo = '';
        this.formData.methodsPropagationCutting.howDidLearnTechPractices = '';
        this.formData.methodsPropagationCutting.year = '';
      }
    },
    'formData.methodsPropagationTissueCulture.isHeard': function(value){
      if(value == 'no'){
        this.formData.methodsPropagationTissueCulture.sourceInfo = '';
        this.formData.methodsPropagationTissueCulture.howDidLearnTechPractices = '';
        this.formData.methodsPropagationTissueCulture.year = '';
      }
    },
    'formData.monocropping.isHeard': function(value){
      if(value == 'no'){
        this.formData.monocropping.sourceInfo = '';
        this.formData.monocropping.howDidLearnTechPractices = '';
        this.formData.monocropping.year = '';
      }
    },
    'formData.multipleCroppping.isHeard': function(value){
      if(value == 'no'){
        this.formData.multipleCroppping.sourceInfo = '';
        this.formData.multipleCroppping.howDidLearnTechPractices = '';
        this.formData.multipleCroppping.year = '';
      }
    },
    'formData.intercroppping.isHeard': function(value){
      if(value == 'no'){
        this.formData.intercroppping.sourceInfo = '';
        this.formData.intercroppping.howDidLearnTechPractices = '';
        this.formData.intercroppping.year = '';
      }
    },
    'formData.coffeePlantingDistance.isHeard': function(value){
      if(value == 'no'){
        this.formData.coffeePlantingDistance.sourceInfo = '';
        this.formData.coffeePlantingDistance.howDidLearnTechPractices = '';
        this.formData.coffeePlantingDistance.year = '';
      }
    },
    'formData.shadeEstablishment.isHeard': function(value){
      if(value == 'no'){
        this.formData.shadeEstablishment.sourceInfo = '';
        this.formData.shadeEstablishment.howDidLearnTechPractices = '';
        this.formData.shadeEstablishment.year = '';
      }
    },
    'formData.layouting.isHeard': function(value){
      if(value == 'no'){
        this.formData.layouting.sourceInfo = '';
        this.formData.layouting.howDidLearnTechPractices = '';
        this.formData.layouting.year = '';
      }
    },
    'formData.staking.isHeard': function(value){
      if(value == 'no'){
        this.formData.staking.sourceInfo = '';
        this.formData.staking.howDidLearnTechPractices = '';
        this.formData.staking.year = '';
      }
    },
    'formData.holeDigging.isHeard': function(value){
      if(value == 'no'){
        this.formData.holeDigging.sourceInfo = '';
        this.formData.holeDigging.howDidLearnTechPractices = '';
        this.formData.holeDigging.year = '';
      }
    },
    'formData.transplanting.isHeard': function(value){
      if(value == 'no'){
        this.formData.transplanting.sourceInfo = '';
        this.formData.transplanting.howDidLearnTechPractices = '';
        this.formData.transplanting.year = '';
      }
    },
    'formData.weeding.isHeard': function(value){
      if(value == 'no'){
        this.formData.weeding.sourceInfo = '';
        this.formData.weeding.howDidLearnTechPractices = '';
        this.formData.weeding.year = '';
      }
    },
    'formData.mulching.isHeard': function(value){
      if(value == 'no'){
        this.formData.mulching.sourceInfo = '';
        this.formData.mulching.howDidLearnTechPractices = '';
        this.formData.mulching.year = '';
      }
    },
    'formData.basal.isHeard': function(value){
      if(value == 'no'){
        this.formData.basal.sourceInfo = '';
        this.formData.basal.howDidLearnTechPractices = '';
        this.formData.basal.year = '';
      }
    },
    'formData.foliar.isHeard': function(value){
      if(value == 'no'){
        this.formData.foliar.sourceInfo = '';
        this.formData.foliar.howDidLearnTechPractices = '';
        this.formData.foliar.year = '';
      }
    },
    'formData.splitApplication.isHeard': function(value){
      if(value == 'no'){
        this.formData.splitApplication.sourceInfo = '';
        this.formData.splitApplication.howDidLearnTechPractices = '';
        this.formData.splitApplication.year = '';
      }
    },
    'formData.sideDress.isHeard': function(value){
      if(value == 'no'){
        this.formData.sideDress.sourceInfo = '';
        this.formData.sideDress.howDidLearnTechPractices = '';
        this.formData.sideDress.year = '';
      }
    },
    'formData.drenching.isHeard': function(value){
      if(value == 'no'){
        this.formData.drenching.sourceInfo = '';
        this.formData.drenching.howDidLearnTechPractices = '';
        this.formData.drenching.year = '';
      }
    },
    'formData.visual.isHeard': function(value){
      if(value == 'no'){
        this.formData.visual.sourceInfo = '';
        this.formData.visual.howDidLearnTechPractices = '';
        this.formData.visual.year = '';
      }
    },
    'formData.traps.isHeard': function(value){
      if(value == 'no'){
        this.formData.traps.sourceInfo = '';
        this.formData.traps.howDidLearnTechPractices = '';
        this.formData.traps.year = '';
      }
    },
    'formData.sweepNet.isHeard': function(value){
      if(value == 'no'){
        this.formData.sweepNet.sourceInfo = '';
        this.formData.sweepNet.howDidLearnTechPractices = '';
        this.formData.sweepNet.year = '';
      }
    },
    'formData.handpicking.isHeard': function(value){
      if(value == 'no'){
        this.formData.handpicking.sourceInfo = '';
        this.formData.handpicking.howDidLearnTechPractices = '';
        this.formData.handpicking.year = '';
      }
    },
    'formData.geneticControl.isHeard': function(value){
      if(value == 'no'){
        this.formData.geneticControl.sourceInfo = '';
        this.formData.geneticControl.howDidLearnTechPractices = '';
        this.formData.geneticControl.year = '';
      }
    },
    'formData.regulatoryControl.isHeard': function(value){
      if(value == 'no'){
        this.formData.regulatoryControl.sourceInfo = '';
        this.formData.regulatoryControl.howDidLearnTechPractices = '';
        this.formData.regulatoryControl.year = '';
      }
    },
    'formData.culturalControl.isHeard': function(value){
      if(value == 'no'){
        this.formData.culturalControl.sourceInfo = '';
        this.formData.culturalControl.howDidLearnTechPractices = '';
        this.formData.culturalControl.year = '';
      }
    },
    'formData.physicalControl.isHeard': function(value){
      if(value == 'no'){
        this.formData.physicalControl.sourceInfo = '';
        this.formData.physicalControl.howDidLearnTechPractices = '';
        this.formData.physicalControl.year = '';
      }
    },
    'formData.mechanicalControl.isHeard': function(value){
      if(value == 'no'){
        this.formData.mechanicalControl.sourceInfo = '';
        this.formData.mechanicalControl.howDidLearnTechPractices = '';
        this.formData.mechanicalControl.year = '';
      }
    },
    'formData.biologicalControl.isHeard': function(value){
      if(value == 'no'){
        this.formData.biologicalControl.sourceInfo = '';
        this.formData.biologicalControl.howDidLearnTechPractices = '';
        this.formData.biologicalControl.year = '';
      }
    },
    'formData.chemicalControl.isHeard': function(value){
      if(value == 'no'){
        this.formData.chemicalControl.sourceInfo = '';
        this.formData.chemicalControl.howDidLearnTechPractices = '';
        this.formData.chemicalControl.year = '';
      }
    },
    'formData.singleStemPruning.isHeard': function(value){
      if(value == 'no'){
        this.formData.singleStemPruning.sourceInfo = '';
        this.formData.singleStemPruning.howDidLearnTechPractices = '';
        this.formData.singleStemPruning.year = '';
      }
    },
    'formData.mulitpleStemPruning.isHeard': function(value){
      if(value == 'no'){
        this.formData.mulitpleStemPruning.sourceInfo = '';
        this.formData.mulitpleStemPruning.howDidLearnTechPractices = '';
        this.formData.mulitpleStemPruning.year = '';
      }
    },
    'formData.sidePruning.isHeard': function(value){
      if(value == 'no'){
        this.formData.sidePruning.sourceInfo = '';
        this.formData.sidePruning.howDidLearnTechPractices = '';
        this.formData.sidePruning.year = '';
      }
    },
    'formData.fullStumping.isHeard': function(value){
      if(value == 'no'){
        this.formData.fullStumping.sourceInfo = '';
        this.formData.fullStumping.howDidLearnTechPractices = '';
        this.formData.fullStumping.year = '';
      }
    },
    'formData.rehabilitation.isHeard': function(value){
      if(value == 'no'){
        this.formData.rehabilitation.sourceInfo = '';
        this.formData.rehabilitation.howDidLearnTechPractices = '';
        this.formData.rehabilitation.year = '';
      }
    },
    'formData.singlePassStripping.isHeard': function(value){
      if(value == 'no'){
        this.formData.singlePassStripping.sourceInfo = '';
        this.formData.singlePassStripping.howDidLearnTechPractices = '';
        this.formData.singlePassStripping.year = '';
      }
    },
    'formData.multiPassStripping.isHeard': function(value){
      if(value == 'no'){
        this.formData.multiPassStripping.sourceInfo = '';
        this.formData.multiPassStripping.howDidLearnTechPractices = '';
        this.formData.multiPassStripping.year = '';
      }
    },
    'formData.selectivePicking.isHeard': function(value){
      if(value == 'no'){
        this.formData.selectivePicking.sourceInfo = '';
        this.formData.selectivePicking.howDidLearnTechPractices = '';
        this.formData.selectivePicking.year = '';
      }
    },
    'formData.mechanicalHarvesting.isHeard': function(value){
      if(value == 'no'){
        this.formData.mechanicalHarvesting.sourceInfo = '';
        this.formData.mechanicalHarvesting.howDidLearnTechPractices = '';
        this.formData.mechanicalHarvesting.year = '';
      }
    },
    'formData.dryMethod.isHeard': function(value){
      if(value == 'no'){
        this.formData.dryMethod.sourceInfo = '';
        this.formData.dryMethod.howDidLearnTechPractices = '';
        this.formData.dryMethod.year = '';
      }
    },
    'formData.wetMethod.isHeard': function(value){
      if(value == 'no'){
        this.formData.wetMethod.sourceInfo = '';
        this.formData.wetMethod.howDidLearnTechPractices = '';
        this.formData.wetMethod.year = '';
      }
    },
    'formData.semiDryMethod.isHeard': function(value){
      if(value == 'no'){
        this.formData.semiDryMethod.sourceInfo = '';
        this.formData.semiDryMethod.howDidLearnTechPractices = '';
        this.formData.semiDryMethod.year = '';
      }
    },
    'formData.sunDrying.isHeard': function(value){
      if(value == 'no'){
        this.formData.sunDrying.sourceInfo = '';
        this.formData.sunDrying.howDidLearnTechPractices = '';
        this.formData.sunDrying.year = '';
      }
    },
    'formData.solarDrying.isHeard': function(value){
      if(value == 'no'){
        this.formData.solarDrying.sourceInfo = '';
        this.formData.solarDrying.howDidLearnTechPractices = '';
        this.formData.solarDrying.year = '';
      }
    },
    'formData.artificialDrying.isHeard': function(value){
      if(value == 'no'){
        this.formData.artificialDrying.sourceInfo = '';
        this.formData.artificialDrying.howDidLearnTechPractices = '';
        this.formData.artificialDrying.year = '';
      }
    },
    'formData.manualHullingMilling.isHeard': function(value){
      if(value == 'no'){
        this.formData.manualHullingMilling.sourceInfo = '';
        this.formData.manualHullingMilling.howDidLearnTechPractices = '';
        this.formData.manualHullingMilling.year = '';
      }
    },
    'formData.mechanicalHullingMilling.isHeard': function(value){
      if(value == 'no'){
        this.formData.mechanicalHullingMilling.sourceInfo = '';
        this.formData.mechanicalHullingMilling.howDidLearnTechPractices = '';
        this.formData.mechanicalHullingMilling.year = '';
      }
    },
    'formData.polishing.isHeard': function(value){
      if(value == 'no'){
        this.formData.polishing.sourceInfo = '';
        this.formData.polishing.howDidLearnTechPractices = '';
        this.formData.polishing.year = '';
      }
    },
    'formData.cleaning.isHeard': function(value){
      if(value == 'no'){
        this.formData.cleaning.sourceInfo = '';
        this.formData.cleaning.howDidLearnTechPractices = '';
        this.formData.cleaning.year = '';
      }
    },
    'formData.bySizeDensitySorting.isHeard': function(value){
      if(value == 'no'){
        this.formData.bySizeDensitySorting.sourceInfo = '';
        this.formData.bySizeDensitySorting.howDidLearnTechPractices = '';
        this.formData.bySizeDensitySorting.year = '';
      }
    },
    'formData.byColorSorting.isHeard': function(value){
      if(value == 'no'){
        this.formData.byColorSorting.sourceInfo = '';
        this.formData.byColorSorting.howDidLearnTechPractices = '';
        this.formData.byColorSorting.year = '';
      }
    },
    'formData.blackBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.blackBeans.sourceInfo = '';
        this.formData.blackBeans.howDidLearnTechPractices = '';
        this.formData.blackBeans.year = '';
      }
    },
    'formData.moldyBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.moldyBeans.sourceInfo = '';
        this.formData.moldyBeans.howDidLearnTechPractices = '';
        this.formData.moldyBeans.year = '';
      }
    },
    'formData.sourPartialSourBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.sourPartialSourBeans.sourceInfo = '';
        this.formData.sourPartialSourBeans.howDidLearnTechPractices = '';
        this.formData.sourPartialSourBeans.year = '';
      }
    },
    'formData.crystalizedBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.crystalizedBeans.sourceInfo = '';
        this.formData.crystalizedBeans.howDidLearnTechPractices = '';
        this.formData.crystalizedBeans.year = '';
      }
    },
    'formData.fadedStreakedBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.fadedStreakedBeans.sourceInfo = '';
        this.formData.fadedStreakedBeans.howDidLearnTechPractices = '';
        this.formData.fadedStreakedBeans.year = '';
      }
    },
    'formData.fadedOldishBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.fadedOldishBeans.sourceInfo = '';
        this.formData.fadedOldishBeans.howDidLearnTechPractices = '';
        this.formData.fadedOldishBeans.year = '';
      }
    },
    'formData.fadedAmberButtery.isHeard': function(value){
      if(value == 'no'){
        this.formData.fadedAmberButtery.sourceInfo = '';
        this.formData.fadedAmberButtery.howDidLearnTechPractices = '';
        this.formData.fadedAmberButtery.year = '';
      }
    },
    'formData.fadedOverDriedBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.fadedOverDriedBeans.sourceInfo = '';
        this.formData.fadedOverDriedBeans.howDidLearnTechPractices = '';
        this.formData.fadedOverDriedBeans.year = '';
      }
    },
    'formData.fadedCutNippedBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.fadedCutNippedBeans.sourceInfo = '';
        this.formData.fadedCutNippedBeans.howDidLearnTechPractices = '';
        this.formData.fadedCutNippedBeans.year = '';
      }
    },
    'formData.insectDamagedBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.insectDamagedBeans.sourceInfo = '';
        this.formData.insectDamagedBeans.howDidLearnTechPractices = '';
        this.formData.insectDamagedBeans.year = '';
      }
    },
    'formData.shrunkBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.shrunkBeans.sourceInfo = '';
        this.formData.shrunkBeans.howDidLearnTechPractices = '';
        this.formData.shrunkBeans.year = '';
      }
    },
    'formData.immatureBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.immatureBeans.sourceInfo = '';
        this.formData.immatureBeans.howDidLearnTechPractices = '';
        this.formData.immatureBeans.year = '';
      }
    },
    'formData.pressedCrushedBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.pressedCrushedBeans.sourceInfo = '';
        this.formData.pressedCrushedBeans.howDidLearnTechPractices = '';
        this.formData.pressedCrushedBeans.year = '';
      }
    },
    'formData.wetUndriedBeans.isHeard': function(value){
      if(value == 'no'){
        this.formData.wetUndriedBeans.sourceInfo = '';
        this.formData.wetUndriedBeans.howDidLearnTechPractices = '';
        this.formData.wetUndriedBeans.year = '';
      }
    },
    'formData.grade1Specialty.isHeard': function(value){
      if(value == 'no'){
        this.formData.grade1Specialty.sourceInfo = '';
        this.formData.grade1Specialty.howDidLearnTechPractices = '';
        this.formData.grade1Specialty.year = '';
      }
    },
    'formData.grade2Premium.isHeard': function(value){
      if(value == 'no'){
        this.formData.grade2Premium.sourceInfo = '';
        this.formData.grade2Premium.howDidLearnTechPractices = '';
        this.formData.grade2Premium.year = '';
      }
    },
    'formData.grade3Exchange.isHeard': function(value){
      if(value == 'no'){
        this.formData.grade3Exchange.sourceInfo = '';
        this.formData.grade3Exchange.howDidLearnTechPractices = '';
        this.formData.grade3Exchange.year = '';
      }
    },
    'formData.grade4BelowStandard.isHeard': function(value){
      if(value == 'no'){
        this.formData.grade4BelowStandard.sourceInfo = '';
        this.formData.grade4BelowStandard.howDidLearnTechPractices = '';
        this.formData.grade4BelowStandard.year = '';
      }
    },
    'formData.grade5OffGrade.isHeard': function(value){
      if(value == 'no'){
        this.formData.grade5OffGrade.sourceInfo = '';
        this.formData.grade5OffGrade.howDidLearnTechPractices = '';
        this.formData.grade5OffGrade.year = '';
      }
    }  ,
  }
}
</script>
<style scoped>
.requiredFieldHidden {
  display: none !important;
}
</style>
