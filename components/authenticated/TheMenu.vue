<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
          <v-icon
            class="hidden-sm-and-down"
            v-bind="attrs"
            v-on="on"
            color="primary"
          >
            mdi-menu-down
          </v-icon>
          <v-icon
            color="primary"
            class="hidden-md-and-up"
            v-bind="attrs"
            v-on="on"
          >
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="d-flex justify-center">
          <v-icon x-large class="mr-3">mdi-account-circle-outline</v-icon>
          <h4>{{ UserFirstname }}</h4>
        </v-list-item>
        <v-divider />
          <v-list-item
            v-for="(item, index) in dropdown"
            :key="index"
            color="white"
            :to="item.to"
            router
          >
            <v-list-item-title>
              <v-btn
                block
                width="210"
                class="pa-0 ma-0"
                color="white"
              >
                <v-row class="ma-0" align="center">
                  <v-col cols="3" class="header_dropdown_btns">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-col>
                  <v-col cols="5" class="header_dropdown_btns text-start">
                    {{ item.title }}
                  </v-col>
                  <v-col cols="4" class="header_dropdown_btns">
                    <v-icon>{{ item.sub_icon }}</v-icon>
                  </v-col>
                </v-row>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item color="white" @click="logout">
            <v-list-item-title>
              <v-btn
                block
                width="210"
                class="pa-0 ma-0"
                color="white"
              >
                <v-row class="ma-0">
                  <v-col cols="3" class="header_dropdown_btns">
                    <v-icon>mdi-logout</v-icon>
                  </v-col>
                  <v-col cols="5" class="header_dropdown_btns text-start">
                    Logout
                  </v-col>
                  <v-col cols="4" class="header_dropdown_btns">    
                  </v-col>
                </v-row>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      dropdown: [
        {
          icon: 'mdi-home-outline',
          sub_icon: 'mdi-chevron-right',
          title: 'Home',
          method: 'routeMyProfile',
          to: '/'
        },
        {
          icon: 'mdi-account-circle-outline',
          sub_icon: 'mdi-chevron-right',
          title: 'My Profile',
          method: 'routeMyProfile',
          to: '/profile'
        },
      ],
    }
  },
  computed: {
    UserFirstname() {
      return this.$store.getters['auth/currentFirstName']
    },
  },
  methods: {
    /* dynamic choose what method to add on event listener like @click */
    dynamicMethod(methodName) {
      this[methodName]()
    },
    logout() {
      alert('logging out')
      this.$store.commit('auth/logout')
      this.$router.replace('/')
    },
  },
  beforeMount(){
    const currentUserType = localStorage.getItem('type')
    /* add the tab for logs page if the user is superadmin */
    if(currentUserType === 'superadmin'){
      this.dropdown.push({
        icon: 'mdi-history',
        sub_icon: 'mdi-chevron-right',
        title: 'Logs',
        method: 'routeLogs',
        to: '/logs'
      })
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/fonts.css');
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
