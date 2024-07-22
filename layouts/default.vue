<template>
  <v-app dark class="ma-3">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="primary"
      class="px-5 py-1"
    >
      <the-logo />
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
        <!-- <img id="avatar" :src="avatarURL" /> -->
        <v-img
          alt=""
          :src="avatarURL"
          :contain="false"
          position="center"
          :aspect-ratio="1"
          width="80"
          class="rounded-pill elevation-4"
        />
      </v-list-item-avatar>
      <the-menu />
    </v-app-bar>
    <v-main style="background-color: #dcdfe3">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import TheLogo from '~/components/authenticated/theLogoDefault.vue'
import TheMenu from '~/components/authenticated/theMenuDefault.vue'

export default {
  middleware: 'auth',
  components: { TheLogo, TheMenu },
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
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
        {
          icon: 'mdi-chart-box',
          title: 'Report',
          to: '/report',
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
    avatarURL() {
      // return localStorage.getItem('avatarUrl')
      return this.$store.getters['auth/avatarURL']
    },
  },
  beforeMount() {
    const currentUserType = localStorage.getItem('type')
    /* removes other tabs if the current user is enumerator */
    if (currentUserType !== 'admin' && currentUserType !== 'superadmin') {
      const length = this.items.length
      this.items.splice(2, length)
    }
  },
}
</script>

<style scoped>
@import url('~/assets/css/fonts.css');
#avatarURL {
  object-fit: contain !important;
  object-position: center;
}
</style>
