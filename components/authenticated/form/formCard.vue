<template>
  <v-container class="border mb-3 item-container">
    <slot />
  </v-container>
</template>

<script>
export default {}
</script>

<style scoped>
.item-container {
  border-radius: 0.2rem;
  box-shadow: 0 2px 2px 1px #b2b2b2;
  position: relative;
}
</style>
