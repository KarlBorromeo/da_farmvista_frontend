<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" timeout="2000" :color="color" light>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    multiLine: true,
    snackbar: false,
    text: '',
    color: 'white',
  }),
  methods: {
    showBar(text, color) {
      this.text = text
      this.color = color
      this.snackbar = true
    },
  },
}
</script>

<style scoped></style>
