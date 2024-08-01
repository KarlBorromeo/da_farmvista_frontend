<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn large icon v-bind="attrs" v-on="on" color="primary">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>
    <v-list elevation="15">
      <v-list-item v-for="(item, i) in commodity" :key="i">
        <v-list-item-title class="dropdown-item text-capitalize" @click="switchCommodity(item)">{{
          item
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  emits: ['switchCommodity'],
  data() {
    return {
      commodity: ['coffee', 'banana'],
      selected: 'coffee'
    }
  },
  methods: {
    switchCommodity(commodity) {
      this.$emit('switchCommodity', commodity.toLowerCase())
    },
  },
}
</script>

<style scoped>
.dropdown-item{
  cursor: pointer;
}
</style>
