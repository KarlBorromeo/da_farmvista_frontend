<template>
  <v-row justify="end" style="width: 100%; flex-grow: 0!important">
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
            {{ province }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  emits: ['emitChangeProvince'],
  computed: {
    provinces() {
      return this.$store.getters['dashboard/data'].provinces
    },
  },
  methods: {
    changeprovince(province) {
      this.$emit('emitChangeProvince', province)
    },
  },
}
</script>
