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
  box-shadow: 0 3px 3px 3px rgba(0, 0, 0, 0.1);
}
</style>
