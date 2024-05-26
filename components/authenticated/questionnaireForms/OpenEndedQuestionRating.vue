<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <form-card v-for="item in topicsList" :key="item.topic">
        <p class="my-2 pb-0 font-weight-medium text-capitalize">
          {{ item.topic }}
        </p>
        <v-row v-for="questions in getList(item.listname)" :key="questions.key">
          <form-radio-container :title="questions.label">
            <v-radio-group
              :rules="rateRule"
              v-model="formData[item.topic][questions.key]"
              class="pa-0 ma-0"
            >
              <v-radio
                v-for="rate in rateItems"
                :key="rate.value"
                :label="rate.label"
                :value="rate.value"
              ></v-radio>
            </v-radio-group>
          </form-radio-container>
        </v-row>
      </form-card>
    </v-container>
    <v-btn @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
import FormCard from '~/components/authenticated/form/formCard.vue'
import FormRadioContainer from '~/components/authenticated/form/formRadioContainer.vue'
export default {
  components: {
    FormCard,
    FormRadioContainer,
  },
  data() {
    return {
      valid: false,
      hint: '(5 = Strongly Agree, 4= Agree 3 = Neutral, 2 = Disagree, 1 = Strongly Disagree)',
      rateItems: [
        { value: 'strongly agree', label: 'Strongly Agree' },
        { value: 'agree', label: 'Agree' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'disagree', label: 'Disagree' },
        { value: 'strongly disgaree', label: 'Strongly Disagree' },
      ],
      formData: {
        awareness: {
          firstQuestion: 'agree',
          secondQuestion: 'agree',
          thirdQuestion: 'agree',
          fourthQuestion: 'agree',
          fifthQuestion: 'agree',
          sixthQuestion: 'agree',
          seventhQuestion: 'agree',
          eightQuestion: 'agree',
        },
        knowledge: {
          firstQuestion: 'agree',
          secondQuestion: 'agree',
          thirdQuestion: 'agree',
          fourthQuestion: 'agree',
          fifthQuestion: 'agree',
          sixthQuestion: 'agree',
          seventhQuestion: 'agree',
          eightQuestion: 'agree',
          ninthQuestion: 'agree',
          tenthQuestion: 'agree',
        },
        attitude: {
          firstQuestion: 'agree',
          secondQuestion: 'agree',
          thirdQuestion: 'agree',
          fourthQuestion: 'agree',
          fifthQuestion: 'agree',
          sixthQuestion: 'agree',
          seventhQuestion: 'agree',
          eightQuestion: 'agree',
          ninthQuestion: 'agree',
          tenthQuestion: 'agree',
        },
        practices: {
          firstQuestion: 'agree',
          secondQuestion: 'agree',
          thirdQuestion: 'agree',
          fourthQuestion: 'agree',
          fifthQuestion: 'agree',
          sixthQuestion: 'agree',
          seventhQuestion: 'agree',
          eightQuestion: 'agree',
          ninthQuestion: 'agree',
          tenthQuestion: 'agree',
        },
      },
      topicsList: [
        { topic: 'awareness', listname: 'awarenessList' },
        { topic: 'knowledge', listname: 'knowledgeList' },
        { topic: 'attitude', listname: 'attitudeList' },
        { topic: 'practices', listname: 'practiceList' },
      ],
      awarenessList: [
        {
          key: 'firstQuestion',
          label:
            'I am familiar with the concept of Good Agricultural Practices (GAPs)',
        },
        {
          key: 'secondQuestion',
          label:
            'I have access to information and resources about GAPs for my specific crop/livestock',
        },
        {
          key: 'thirdQuestion',
          label:
            'I consider the environmental impact (soil health, water management) when making decisions about my farm activities.',
        },
        {
          key: 'fourthQuestion',
          label:
            'I use integrated pest management (IPM) strategies to control pests and diseases on my farm.',
        },
        {
          key: 'fifthQuestion',
          label:
            'I prioritize worker safety and provide appropriate training and equipment for my employees',
        },
        {
          key: 'sixthQuestion',
          label:
            'I keep records of my farm activities, including fertilizer and pesticide applications.',
        },
        {
          key: 'seventhQuestion',
          label:
            'I am aware of and comply with relevant regulations related to agricultural production.',
        },
        {
          key: 'eightQuestion',
          label:
            'I continuously seek ways to improve my agricultural practices for better efficiency and sustainability.',
        },
      ],
      knowledgeList: [
        {
          key: 'firstQuestion',
          label:
            'I possess adequate knowledge about the principles of Good Agricultural Practices (GAPs)',
        },
        {
          key: 'secondQuestion',
          label:
            'I am aware of the importance of implementing GAPs in their farming practices',
        },
        {
          key: 'thirdQuestion',
          label:
            'I have received sufficient training and education on implementing GAPs',
        },
        {
          key: 'fourthQuestion',
          label:
            'I regularly apply GAPs techniques in their daily farming activities',
        },
        {
          key: 'fifthQuestion',
          label:
            'I demonstrate a high level of understanding of the environmental and health benefits associated with GAPs',
        },
        {
          key: 'sixthQuestion',
          label:
            'I actively seek out new information and updates regarding advancements in GAPs',
        },
        {
          key: 'seventhQuestion',
          label:
            'I consistently adhere to GAPs standards outlined by regulatory agencies and industry best practices',
        },
        {
          key: 'eightQuestion',
          label:
            'I effectively integrate GAPs into their crop management strategies to minimize risks and enhance productivity',
        },
        {
          key: 'ninthQuestion',
          label:
            'I actively engage in knowledge-sharing and collaboration with other stakeholders to improve their understanding and implementation of GAPs',
        },
        {
          key: 'tenthQuestion',
          label:
            'I exhibit a willingness to invest time and resources in continuous improvement of their knowledge and skills related to GAPs',
        },
      ],
      attitudeList: [
        {
          key: 'firstQuestion',
          label:
            'I believe that implementing GAPs is essential for the long-term sustainability of their farms',
        },
        {
          key: 'secondQuestion',
          label:
            'I have a positive attitude towards adopting new GAPs techniques and technologies',
        },
        {
          key: 'thirdQuestion',
          label:
            'I am motivated to integrate GAPs into their farming practices to improve crop quality and yield',
        },
        {
          key: 'fourthQuestion',
          label:
            'I perceive GAPs as an opportunity to enhance their competitiveness in the agricultural market',
        },
        {
          key: 'fifthQuestion',
          label:
            'I express confidence in their ability to successfully implement GAPs on their farms',
        },
        {
          key: 'sixthQuestion',
          label:
            'I view GAPs as a means to protect the environment and natural resources',
        },
        {
          key: 'seventhQuestion',
          label:
            'I am committed to following GAPs standards and guidelines to ensure food safety',
        },
        {
          key: 'eightQuestion',
          label:
            'I see GAPs as a way to mitigate risks associated with pests, diseases, and climate variability',
        },
        {
          key: 'ninthQuestion',
          label:
            'I value the potential economic benefits of implementing GAPs, such as access to premium markets and higher prices for their produce',
        },
        {
          key: 'tenthQuestion',
          label:
            'I demonstrate a willingness to invest time and resources in training and education to improve their understanding and application of GAPs',
        },
      ],
      practiceList: [
        {
          key: 'firstQuestion',
          label:
            'I consistently apply GAPs to demonstrate a strong commitment to producing safe and sustainable agricultural products',
        },
        {
          key: 'secondQuestion',
          label:
            'I believe that farmers who meticulously adhere to GAPs contribute to higher standards of food safety and quality',
        },
        {
          key: 'thirdQuestion',
          label:
            'The proactive implementation of GAPs reflects a responsible approach to environmental conservation and resource management',
        },
        {
          key: 'fourthQuestion',
          label:
            'Regular monitoring and documentation of farming practices by farmers are essential for effective GAP implementation',
        },
        {
          key: 'fifthQuestion',
          label:
            'I actively seek out new information and training opportunities on how GAPs are better equipped to enhance their agricultural practices',
        },
        {
          key: 'sixthQuestion',
          label: `Integrating the GAP principles into daily farming routines demonstrates farmers' dedication to continuous improvement in agricultural production`,
        },
        {
          key: 'seventhQuestion',
          label: `Farmers' willingness to invest in infrastructure upgrades and technology aligns with the principles of modern GAP implementation`,
        },
        {
          key: 'eightQuestion',
          label:
            'Collaboration among farmers in sharing best practices and lessons learned enhances the collective implementation of GAPs within agricultural communities',
        },
        {
          key: 'ninthQuestion',
          label:
            'Farmers who prioritize the well-being of farmworkers and community members in their GAP practices contribute to a more sustainable and ethical agricultural industry',
        },
        {
          key: 'tenthQuestion',
          label:
            'I believe that farmers who engage in participatory approaches, involving stakeholders in decision-making processes related to GAPs, foster greater trust and cooperation',
        },
      ],
      rateRule: [(v) => !!v || 'required'],
    }
  },
  methods: {
    /* test if the form is valid, return boolean */
    validate() {
      const valid = this.$refs.form.validate()
      this.$store.commit('questionnaire/toggleNextTab', {
        tabName: 'OpenEndedQuestionRatingValidated',
        valid,
      })
      if (valid) {
        this.$store.commit('questionnaire/saveData', {
          keyName: 'openEndedQuestionRating',
          data: this.getData(),
        })
      }
    },
    /* create key value pairs */
    createKevValuePair(list, topic) {
      console.log('list: ', list)
      const object = {}
      for (let i = 0; i < list.length; i++) {
        const keyName = list[i].key
        object[keyName] = this.formData[topic][keyName]
      }
      return object
    },
    /* return dynamic list */
    getList(listName) {
      return this[listName]
    },
    /* get the data and convert it into expected key/value formats in BackEnd */
    getData() {
      return {
        awareness: this.createKevValuePair(this.awarenessList, 'awareness'),
        knowledge: this.createKevValuePair(this.knowledgeList, 'knowledge'),
        attitude: this.createKevValuePair(this.attitudeList, 'attitude'),
        practices: this.createKevValuePair(this.practiceList, 'practices'),
      }
    },
  },
  watch: {
    formData: {
      handler: function () {
        this.validate()
      },
      deep: true,
    },
  },
  beforeMount() {
    const data = this.$store.getters['profiling/selectedRecord']
    if (Object.keys(data).length > 0) {
      for (let i = 0; i < this.topicsList.length; i++) {
        let topic = this.topicsList[i].topic
        if (this.formData[topic]) {
          let keyArrays = Object.keys(this.formData[topic])
          keyArrays.forEach((key) => {
            this.formData[topic][key] = data.openEndedQuestionRating[topic][key]
          })
        }
      }
    } else {
      for (let i = 0; i < this.topicsList.length; i++) {
        let topic = this.topicsList[i].topic
        if (this.formData[topic]) {
          let keyArrays = Object.keys(this.formData[topic])
          keyArrays.forEach((key) => {
            this.formData[topic][key] = ''
          })
        }
      }
    }
  },
}
</script>

<style scoped>
.requiredFieldHidden {
  display: none !important;
}
</style>
