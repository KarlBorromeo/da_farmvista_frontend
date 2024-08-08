<template>
  <v-card class="pa-0 my-0 mx-5 transparent elevation-0" elevation="0">
    <!-- <v-container class="ma-0 pa-0" style="border: 1px solid black; width: 100%!important"> -->
      <v-card color="transparent" class="ma-0 pa-0 elevation-0">
        <v-row class="ma-0 pa-0">
          <v-col
            cols="6"
            class="hidden-sm-and-down"
            style="display: flex; align-items: center; justify-content: start"
          >
            <p class="headline font-weight-normal text-decoration-underline pa-0 ma-0 primary--text">Welcome user, {{UserFirstname}}</p>
          </v-col>
          <v-spacer />
          <v-col cols="6" style="display: flex; align-items: center; justify-content: end">    
            <v-menu offset-y left class="mr-5">
              <template v-slot:activator="{ on, attrs }">
                <v-btn large icon v-bind="attrs" v-on="on" color="primary">
                  <span class="font-weight-normal mr-2 subtitle-1 text-capitalize">{{selected}}</span>
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
          </v-col>
        </v-row>
      </v-card>
      <slot />
    <!-- </v-container> -->
  </v-card>
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
  computed: {
    UserFirstname() {
      return this.$store.getters['auth/currentFirstName']
    }
  },
  methods: {
    switchCommodity(commodity) {
      this.$emit('switchCommodity', commodity)
      this.selected = commodity
    },
  },
}
</script>

<style scoped>
.dropdown-item{
  cursor: pointer;
}
</style>
