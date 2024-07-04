<template>
  <v-app>
    <v-app-bar
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      align="center"
      height="80"
    >
      <v-spacer class="hidden-sm-and-down"></v-spacer>

      <the-logo />

      <v-toolbar-title class="ml-2 hidden-xs-only">FarmVista</v-toolbar-title>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div class="hidden-sm-and-down">
        <v-list class="d-flex">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            class="mb-2"
          >
            <v-list-item-title class="text-center">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <v-spacer></v-spacer>
      <v-btn to="/auth" elevation="1" color="primary" v-if="userLoggedin">
        Log In
        <v-icon>mdi-account-arrow-right</v-icon>
      </v-btn>
      <v-btn to="/dashboard" elevation="1" color="success" v-else>
        My Dashboard
        <v-icon>mdi-view-dashboard-variant</v-icon>
      </v-btn>

      <the-menu class="hidden-md-and-up" />

      <v-spacer class="hidden-sm-and-down"></v-spacer>
    </v-app-bar>
    <v-main style="height: 1500px">
      <nuxt />
      <the-footer />
    </v-main>
  </v-app>
</template>

<script>
import TheMenu from '~/components/landing/theMenu.vue'
import TheLogo from '~/components/landing/theLogo.vue'
import TheFooter from '~/components/landing/theFooter.vue'

export default {
  components: { TheMenu, TheLogo, TheFooter },
  computed: {
    userLoggedin() {
      this.$store.commit('auth/getUserDataFromLocalStorage')
      return !this.$store.getters['auth/userLoggedin']
    },
  },
  data() {
    return {
      items: [
        {
          title: 'Home',
          to: '/',
        },
        {
          title: 'About',
          to: '/about',
        },
        {
          title: 'Commodities',
          to: '/commodities',
        },
        {
          title: 'Demographics',
          to: '/demographics',
        },
      ],
    }
  },
}
</script>
<style scoped>
@import url('~/assets/css/fonts.css');
</style>
