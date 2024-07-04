<template>
  <v-card light class="pa-4">
    <div class="d-flex align-center justify-space-between pa-4">
      <h2 class="pa-0 ma-0 headline font-weight-bold">
        Upload File {{ commodity }}
      </h2>
    </div>

    <label for="aw" id="upload">
      <v-icon class="center" x-large id="file-icon">mdi-file-outline</v-icon>
      <v-icon class="center" x-large id="cloud-icon"
        >mdi-cloud-upload-outline</v-icon
      >
      <p id="text">click to upload</p>
    </label>
    <div>
      <v-file-input
        id="aw"
        v-model="file"
        label="File input"
        accept=".xlsm"
        show-size
        counter
      ></v-file-input>
    </div>
    <v-btn @click="upload" block color="success" small :disabled="disabledBtn"
      >Upload</v-btn
    >
    <snackbar ref="snackbar" />
  </v-card>
</template>

<script>
import snackbar from '~/components/snackbar.vue'
export default {
  emits: ['emitCloseModal'],
  components: { snackbar },
  props: ['commodity'],
  data() {
    return {
      file: '',
      disabledBtn: false,
    }
  },
  methods: {
    async upload() {
      if (!this.file) {
        this.$refs.snackbar.showBar('no file upload', 'red')
        return
      }
      const byteSize = this.file.size
      const mbSize = (byteSize / (1024 * 1024)).toFixed(2)
      if (mbSize > 10) {
        this.$refs.snackbar.showBar('minimum size is 10MB', 'red')
      }
      try {
        this.disabledBtn = !this.disabledBtn
        const res = await this.$store.dispatch('uploadFile/uploadSurveyFile', {
          file: this.file,
          type: this.commodity,
        })
        this.$refs.snackbar.showBar(res, 'success')
        await new Promise((resolve) => setTimeout(resolve, 4000))
        this.$emit('emitCloseModal')
        this.file = ''
      } catch (error) {
        this.$refs.snackbar.showBar(error, 'red')
      }
      this.disabledBtn = !this.disabledBtn
    },
  },
}
</script>
<style scoped>
#upload {
  border: 2px dashed #d3e8d3 !important;
  border-radius: 0.3rem;
  padding: 2rem;
  position: relative;
  min-height: 250px;
  width: 100%;
  display: inline-block;
}
.center {
  position: absolute;
  left: 53%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#file-icon {
  scale: 2;
  opacity: 0.2;
}
#text {
  display: block;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: underline;
}
</style>
