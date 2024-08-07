<template>
  <v-col cols="12" class="py-0">
    <p class="pa-0 mb-0 pt-2" v-if="required == true">* {{ title }}:</p>
    <p class="pa-0 mb-0 pt-2" v-else>{{ title }}:</p>
    <div class="pa-0 ma-0" style="display: flex; gap: 2rem; flex-wrap: wrap;">
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
.v-radio-group{
  border: 1px solid black!important
}
</style>
