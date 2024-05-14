<template>
  <v-col cols="12" class="py-0 my-0">
    <p class="pa-0 mb-0 pt-2">* {{ title }}:</p>
    <slot />
  </v-col>
</template>

<script>
export default {
  props: ['title'],
}
</script>
