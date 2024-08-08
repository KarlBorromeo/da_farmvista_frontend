<template>
  <v-menu offset-y v-model="dropdownShow">
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
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-list>
          <v-list-item v-for="(form,i) in options" :key="i">
            <v-btn
              color="white text-capitalize"
              block
              elevation="0"
              v-bind="attrs"
              v-on="on"
              @click="openModal(form)"
              >{{ form }}
            </v-btn>
          </v-list-item>
        </v-list>
      </template>
      <upload-vue @emitCloseModal="emitCloseModal" :commodity="commodity" :selectedForm="selectedForm" />
    </v-dialog>
  </v-menu>
</template>

<script>
import uploadVue from '../modal/upload.vue'
export default {
  props: ['commodity'],
  components: { uploadVue },
  data() {
    return {
      dialog: false,
      dropdownShow: false,
      items: {
        coffee: [
          'Form 1',
          'Form 2'
        ],
        banana: [
          'Form 1'
        ]
      },
      options: [],
      selectedForm: '',
    }
  },
  beforeMount(){
    this.options = this.items[this.commodity]
  },
  watch:{
    commodity(val){
      this.options = this.items[val]
    },
    /* close the drodown when the dialog closed */
    dialog(val){
      if(!val){
        this.dropdownShow = false
      }
    }
  },
  methods: {
    openModal(form) {
      this.selectedForm = form
    },
    emitCloseModal() {
      this.dialog = false
      this.dropdownShow = false
    },
  },
}
</script>
