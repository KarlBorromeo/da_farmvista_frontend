<template>
  <v-row class="mb-1 pa-4" style="border: 3px solid black">
    <v-col cols="12" md="6" class="d-flex pa-0 ma-0 mb-2">
      <v-btn block small color="success" @click="increment"
        >Add <v-icon>mdi-plus</v-icon></v-btn
      >
    </v-col>
    <v-col cols="12" md="6" class="d-flex pa-0 ma-0">
      <v-btn block small color="warning" @click="decrement" class="black--text"
        >Remove last item <v-icon>mdi-minus</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    increment() {
      this.$emit('emitIncrement')
    },
    decrement() {
      this.$emit('emitDecrement')
    },
  },
}
</script>
