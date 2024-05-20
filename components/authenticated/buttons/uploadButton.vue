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
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-list>
          <v-list-item v-for="item in items" :key="item">
            <v-btn
              color="white text-capitalize"
              block
              elevation="0"
              v-bind="attrs"
              v-on="on"
              @click="openModal(item)"
              >{{ item }}</v-btn
            >
          </v-list-item>
        </v-list>
      </template>
      <upload-vue @emitCloseModal="emitCloseModal" :commodity="commodity" />
    </v-dialog>
  </v-menu>
</template>

<script>
import uploadVue from '../modal/upload.vue'
export default {
  emits: ['emitCloseModal'],
  components: { uploadVue },
  data() {
    return {
      dialog: false,
      items: ['coffee', 'banana'],
      commodity: '',
    }
  },
  methods: {
    openModal(item) {
      this.commodity = item
    },
    emitCloseModal() {
      this.dialog = false
    },
  },
}
</script>

<style></style>
