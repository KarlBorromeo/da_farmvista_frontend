<template>
  <v-row align="center">
    <v-spacer />
    <v-col cols="12" sm="1" class="text-center">
        <v-icon>mdi-alert-box-outline</v-icon>
    </v-col>
    <v-col cols="12" sm="10">
        <p class="text-center text-sm-start">{{text}}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
    props: ['text']
}
</script>

<style scoped>

</style>