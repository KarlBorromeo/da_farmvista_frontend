<template>
  <v-col class="card">
    <v-card
      style="height: 100%"
      class="d-flex justify-center align-center rounded-lg"
      :style="styleProp"
    >
      <v-container class="d-flex justify-center align-center" color="red">
        <v-spacer />
        <v-icon large class="white--text">mdi-account-badge-outline</v-icon>
        <v-spacer />
        <v-card
          class="elevation-0 rounded-xl"
          style="background-color: transparent"
        >
          <p
            class="text-center my-0 py-0 subtitle font-weight-normal white--text"
          >
            {{ name }}
          </p>
          <p
            class="text-center my-0 py-0 caption font-weight-light white--text"
          >
            Active Farmers
          </p>
          <p class="text-center my-0 py-0 font-weight-bold white--text">
            {{ count }}
          </p>
        </v-card>
        <v-spacer />
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['name', 'count', 'styleProp'],
}
</script>
