<template>
  <v-app dark class="ma-3">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      style="background-color: #3fb07c"
      class="px-5 py-1"
    >
      <the-logo />
      <!-- <v-col
				class="px-4"
				style="
					display: flex;
					justify-content: space-between;
					align-items: center;
				"
			>
				<span id="logo-container">
					<img id="logo" src="~assets/images/logo.png" />
				</span>
				<span id="title"> FARMVISTA </span>
			</v-col> -->
      <v-divider />
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="mb-2"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title class="white--text">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      absolute
      hide-on-scroll
      app
      elevation="0"
      style="background-color: #dcdfe3"
      class="black--text"
      align-center="true"
    >
      <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer">
        <v-icon v-if="drawer">mdi-menu-open</v-icon>
        <v-icon v-else>mdi-menu-close</v-icon>
      </v-app-bar-nav-icon>
      <h4 style="font-weight: 500">{{ currentPageTitle }}</h4>
      <v-spacer />
      <v-list-item-avatar class="hidden-sm-and-down">
        <img src="https://randomuser.me/api/portraits/women/81.jpg" />
      </v-list-item-avatar>
      <!-- menu dropdown -->
      <the-menu />
    </v-app-bar>
    <v-main style="background-color: #dcdfe3">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import TheLogo from '~/components/authenticated/TheLogo.vue'
import TheMenu from '~/components/authenticated/TheMenu.vue'
export default {
  components: { TheLogo, TheMenu },
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/dashboard',
        },
        {
          icon: 'mdi-account-arrow-up',
          title: 'Profiling',
          to: '/profiling',
        },
        {
          icon: 'mdi-finance',
          title: 'Analytics',
          to: '/analytics',
        },
        {
          icon: 'mdi-google-maps',
          title: 'Maps',
          to: '/maps',
        },
        {
          icon: 'mdi-account-group',
          title: 'Users',
          to: '/users',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'FarmVista',
    }
  },
  computed: {
    currentPageTitle() {
      return this.$store.getters['pageNameGetter']
    },
  },
}
</script>

<style>
@import url('~/assets/css/fonts.css');
</style>
