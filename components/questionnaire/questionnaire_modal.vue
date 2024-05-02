<template>
    <v-card light class="pa-4">
      <h2 class="pa-4">Survey Questionaire</h2>
      <v-toolbar
        color="white"
        light
        elevation="0"
      >
        <!-- <v-btn v-for="i in 15" :key="i">
          {{ i }}
        </v-btn> -->
        <template>
        <v-tabs
            fixed-tabs
            show-arrows
        >
          <v-tab  @click="clicked('FormOne')">
            FormTwo
          </v-tab>
          <v-tab  @click="clicked('FormTwo')" :disabled="tabOneValidated">
            FormTwo
          </v-tab>
        </v-tabs>
      </template>
      </v-toolbar>
          <!-- <v-card>
            <keep-alive>
                <component :is="current"></component>
            </keep-alive>
          </v-card> -->
          
          <v-tabs-items>
            <v-card>
              <keep-alive>
                  <component :is="current"></component>
              </keep-alive>
            </v-card> 
          </v-tabs-items>
    </v-card>
</template>

<script>
import FormOne from './questionnaire_forms/FormOne.vue';
import FormTwo from './questionnaire_forms/FormTwo.vue';

export default {
    components: { FormOne,FormTwo },
    data () {
        return {
            current : 'FormOne'
        }
    },
    methods:{
        clicked(item){
            this.current = item;      
        },
    },
    computed:{
        tabOneValidated(){
            return !this.$store.getters['questionnaire/FormOneValidatedGetter'];
        }
    }
}
</script>