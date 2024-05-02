<template>
    <v-app dark class="ma-3">
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
            style="background-color: #3FB07C;"
            class="px-5 py-1"
        >
            <v-col 
                class="px-4"
                style="display: flex; justify-content: space-between; align-items: center"
            >
                <span id="logo-container">
                    <img id="logo" src="~assets/images/logo.png" />   
                </span>
                <span id="title">
                    FARMVISTA
                </span>
            </v-col>
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
                    <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
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
            align-center=true
        >
            <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer">
                <v-icon v-if="drawer">mdi-menu-open</v-icon>
                <v-icon v-else>mdi-menu-close</v-icon>
            </v-app-bar-nav-icon>
            <h4 style="font-weight: 500;">{{ currentPageTitle }}</h4>
            <v-spacer />
            <v-list-item-avatar class="hidden-sm-and-down">
                <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>
            <!-- menu dropdown -->
            <div class="text-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        icon
                    >
                        <v-icon class="hidden-sm-and-down" v-bind="attrs" v-on="on" color="primary">
                            mdi-menu-down
                        </v-icon>
                        <v-icon color="primary" class="hidden-md-and-up" v-bind="attrs" v-on="on">
                            mdi-dots-vertical
                        </v-icon>
                    </v-btn>       
                    </template>
                    <v-list>
                        <v-list-item
                            class="d-flex justify-center"
                        >
                            <v-icon x-large class="mr-3">mdi-account-circle-outline</v-icon>
                            <h4>Karlito</h4>
                        </v-list-item>
                        <v-divider />
                        <v-list-item
                            v-for="(item, index) in dropdown"
                            :key="index"
                            :to="item.to"
                            router
                            color="white"
                        >
                            <v-list-item-title>
                                <v-btn 
                                    block
                                    width="210"
                                    class="pa-0 ma-0"
                                    color="white"
                                >
                                    <v-row class="ma-0">
                                        <v-col cols="4" class="header_dropdown_btns">
                                            <v-icon>{{ item.icon }}</v-icon>
                                        </v-col>
                                        <v-col cols="5" class="header_dropdown_btns">
                                            {{ item.title }}
                                        </v-col>
                                        <v-col cols="3" class="header_dropdown_btns">
                                            <v-icon>{{ item.sub_icon  }}</v-icon>
                                        </v-col>
                                    </v-row>
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-app-bar>
        <v-main  style="background-color: #dcdfe3">
            <Nuxt/>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data () {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                {
                icon: 'mdi-tablet-dashboard',             
                title: 'Dashboard',
                to: '/dashboard'
                },
                {
                icon: 'mdi-account-key',
                title: 'Account',
                to: '/auth/login'
                },
                {
                icon: 'mdi-file-upload',
                title: 'Upload File',
                to: '/upload'
                },
                {
                icon: 'mdi-account',
                title: 'Profiling',
                to: '/profiling'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'FarmVista',
            dropdown:[
                {
                icon: 'mdi-finance',
                sub_icon: 'mdi-chevron-right',
                title: 'Logs',
                to: '/dashboard'
                },
                {
                icon: 'mdi-account-circle-outline',
                sub_icon: 'mdi-chevron-right',
                title: 'My Profile',
                to: '/dashboard'
                },
                {
                icon: 'mdi-logout',
                title: 'Logout',
                to: '/dashboard'
                },
            ]
        }
    },
    computed:{
        currentPageTitle(){
        console.log('pageTitle: ',this.$store.getters['pageNameGetter'])
        return this.$store.getters['pageNameGetter']
        }
    }
}
</script>

<style scoped>
#logo-container{
    display: inline-block;
    width: 75px;
    height: 75px;
    border-radius: 100%;
    padding: .3rem;
    background-color: white;
}
img{
    height: 100%;
    border-radius: 100%;
    border: 1px solid #1a7358;
}
#title{
    font-family: 'poppins';
    font-weight: 500;
}
</style>