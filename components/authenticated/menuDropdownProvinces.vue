<template>
  <v-row justify="end">
        <v-col cols="1" id="year-dropdown">
          <v-menu offset-y left>
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-list>
              <v-list-item
                v-for="(province, index) in provinces"
                :key="index"
                color="white"
                @click="changeprovince(province)"
              >
              {{province}}
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
</template>

<script>
export default {
    emits: ['emitChangeProvince'],
    computed:{
        provinces(){
        return this.$store.getters['dashboard/data'].soldCommodityByProvince.provinces
        },
    },
    methods: {
        changeprovince(province){
            alert(province)
            this.$emit('emitChangeProvince',province)
            // emit here
        }
    },
}
</script>
