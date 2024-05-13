<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="primary"
        large
        style="position: relative"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="mr-2">mdi-microsoft-excel</v-icon>
        UPLOAD
        <v-icon class="mr-2" style="position: absolute; right: 0"
          >mdi-chevron-down</v-icon
        >
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn block color="success" large v-bind="attrs" v-on="on">
          <v-icon class="mr-2">mdi-text-box-edit-outline</v-icon>
          MANUAL SURVEY
        </v-btn>
      </template>
      <questionnaire-vue />
    </v-dialog>
  </v-menu>
</template>

<script>
import questionnaireVue from '../modal/questionnaire.vue'
export default {
  components: {questionnaireVue},
  data() {
    return {
      items: [
        { title: 'Coffee' },
        { title: 'Mango' },
        { title: 'Corn' },
      ],
    }
  },
}
</script>

<style></style>
