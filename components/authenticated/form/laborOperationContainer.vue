<template>
  <v-col cols="12" class="pt-0 pb-3 mt-4">
    <p class="body-2 ml-2">{{ title }}</p>
    <v-container class="my-0 py-0">
      <v-row justify="center">
        <slot />
      </v-row>
    </v-container>
  </v-col>
</template>
<script>
export default {
  props: ['title'],
}
</script>
<style scoped></style>
