<template>
  <v-col cols="12" class="py-0 my-0">
    <p class="pa-0 mb-0 pt-2" v-if="required == true">* {{ title }}:</p>
    <p class="pa-0 mb-0 pt-2" v-else>{{ title }}:</p>
    <div style="display: flex; gap: 0; flex-wrap: wrap;">
      <slot />
    </div>
    
  </v-col>
</template>

<script>
export default {
  props: ['title', 'required'],
}
</script>
<style scoped>
div > * {
  margin-bottom: 0; /* Vertical gap between rows */
}
</style>
