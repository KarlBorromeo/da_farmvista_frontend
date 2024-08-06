<template>
  <v-app>
    <v-app-bar
      color="white"
      absolute
      hide-on-scroll
      app
      align="center"
      height="80"
      style="z-index: 4!important"
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
            router
            exact
            class="mb-2 rounded-lg"
          >
            <v-list-item-title class="text-center rounded-lg">
              <a :href="item.id">
              {{
              item.title
            }}</a></v-list-item-title>
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
    <v-main style="height: 1500px; z-index: 1!important">
      <nuxt />
      <the-footer />
    </v-main>
  </v-app>
</template>

<script>
import TheMenu from '~/components/landing/theMenuLanding.vue'
import TheLogo from '~/components/landing/theLogoLanding.vue'
import TheFooter from '~/components/landing/theFooterLanding.vue'

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
          id: '#headline',
        },
        {
          title: 'Insights',
          id: '#insights',
        },
        {
          title: 'About',
          id: '#about',
        },
        {
          title: 'Commodities',
          id: '#commodities',
        },
      ],
    }
  },
  mounted(){
    // Smooth scrolling with JavaScript
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }
}
</script>
<style scoped>
@import url('~/assets/css/fonts.css');
a{
  text-decoration: none;
}
</style>
