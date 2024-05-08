<template>
  <v-col cols="12" class="py-0 my-0" style="border: 1px dashed violet">
    <p class="pa-0 ma-0">* {{ title }}:</p>
    <slot />
  </v-col>
</template>

<script>
export default {
  props: ['title'],
}
</script>
