<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
        <v-btn block color="success" large v-bind="attrs" v-on="on">
        <v-icon class="mr-2">mdi-text-box-edit-outline</v-icon>
        MANUAL SURVEY
        </v-btn>
    </template>
    <questionnaire-vue />
    </v-dialog>
</template>

<script>
import QuestionnaireVue from '~/components/authenticated/modal/questionnaire.vue'
export default {
    components: { QuestionnaireVue },
    data(){
        return{
            dialog: true,
        }
    }
}
</script>

<style>

</style>