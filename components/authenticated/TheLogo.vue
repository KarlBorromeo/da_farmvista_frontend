<template>
  <v-col
    class="px-4"
    style="display: flex; justify-content: space-between; align-items: center"
  >
    <span id="logo-container">
      <img id="logo" src="~assets/images/logo.png" />
    </span>
    <span id="title"> FARMVISTA </span>
  </v-col>
</template>

<style scoped>
#logo-container {
  display: inline-block;
  width: 75px;
  height: 75px;
  border-radius: 100%;
  padding: 0.3rem;
  background-color: white;
}
img {
  height: 100%;
  border-radius: 100%;
  border: 1px solid #1a7358;
}
#title {
  font-family: 'poppins';
  font-weight: 500;
}
</style>
