<template>
  <v-col cols="12" class="py-0" >
    <p class="pa-0 ma-0">* {{ title }}:</p>
    <slot />
  </v-col>
</template>

<script>
export default {
  props: ['title'],
}
</script>
