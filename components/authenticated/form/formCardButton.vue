<template>
  <v-row class="mb-1 pa-4" justify="center">
    <v-col cols="12" sm="4" md="3" class="d-flex pa-0 ma-0 mb-2">
      <v-btn block small color="warning" class="black--text" @click="increment" :disabled="disabled"
        >Add <v-icon>mdi-plus</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['disabled'],
  methods: {
    increment() {
      this.$emit('emitIncrement')
    },
  },
}
</script>
