<template>
  <v-col cols="12" class="py-0">
    <p class="pa-0 mb-0 pt-2" v-if="required == true">* {{ title }}:</p>
    <p class="pa-0 mb-0 pt-2" v-else>{{ title }}:</p>
    <slot />
  </v-col>
</template>

<script>
export default {
  props: ['title', 'required'],
}
</script>
