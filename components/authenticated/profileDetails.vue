<template>
  <v-card light class="pa-4">
    <v-row class="mt-4">
        <v-col class="text-center">
            <div id="profile-container">
                <v-img 
                    alt=""
                    :src="avatar+'.png'"
                    :contain="true"
                    position="center"
                    :aspect-ratio="1"
                    width="100"
                    style="border: 1px solid black"
                />
                {{avatar}}
                <!-- <v-icon id="icon" x-large>mdi-account</v-icon>
                <v-btn
                    icon
                    id="add-profile"
                >
                    <v-icon id="add-profile-icon">mdi-plus</v-icon>
                </v-btn> -->             
            </div>
            <p class="text-uppercase py-0 my-0">{{fullName}}</p>
            <p class="text-uppercase py-0 my-0 font-weight-bold">{{company}}</p>
            <div id="custom-divider-container">
                <div style="width:10%; display: inline-block" class="py-0 my-0">
                    <v-divider />
                </div>                
            </div>
            <p class="py-0 my-0 font-weight-light">{{email}}</p>
            <p class="py-0 my-0 text-capitalize">{{address}}</p>
            <p class="py-0 my-0 font-weight-bold">{{type}}</p>
            <v-dialog
                v-model="dialog"
                width="600px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <p 
                        class="text-decoration-underline pb-0 mb-0" 
                        id="change-pass-btn" 
                        v-bind="attrs"
                        v-on="on">
                        Change Password
                    </p>
                    
                </template>
                <change-pass-form @emitCloseModal="emitCloseModal"/>
            </v-dialog>
            <p class="py-0 my-0 unhighlight">Password Updated {{passwordLastUpdated}}</p>
        </v-col>
    </v-row>
    <snackbar ref="snackbar" />
  </v-card>
</template>

<script>
import Snackbar from '../snackbar.vue'
import changePassForm from './form/changePassForm.vue'
export default {
	components: { changePassForm, Snackbar },
    data(){
        return{
            dialog: false,
        }
    },
    computed: {
        fullName(){
            return this.$store.getters['profile/myProfileDetails'].fullName
        },
        email(){
            return this.$store.getters['profile/myProfileDetails'].email
        },
        address(){
            return this.$store.getters['profile/myProfileDetails'].address
        },
        type(){
            return this.$store.getters['profile/myProfileDetails'].type
        },
        company(){
            return this.$store.getters['profile/myProfileDetails'].company
        },
        passwordLastUpdated(){
            return this.$store.getters['profile/myProfileDetails'].passwordLastUpdated
        },
        // avatar(){
        //     return this.$store.getters['profile/myProfileDetails'].avatarURL
        // },
        avatar(){
            // return this.$store.getters['profile/myAvatarUrl']
            return 'http://e974-103-80-142-50.ngrok-free.app/api/v1/user/9df8a345-8d49-4d48-8121-ce46479cb062/avatar'
        }
    },
    methods: {
        emitCloseModal(res){
            this.dialog = false;
            this.$refs.snackbar.showBar(res,'success')
        }
    }
}
</script>

<style scoped>
/* #profile-container{
    display: inline-block;
    background-color: #d9d9d9;
    border-radius: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    position: relative;
} */

#icon{
    transform: scale(1.5);
}
#add-profile{
    position: absolute;
    bottom: 0;
}
#add-profile-icon{
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 100%;
}
.unhighlight{
    color: #ded9d9;
}
#custom-divider-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
}
#change-pass-btn{
    margin-top: 2rem;
    cursor: pointer;
    color: blueviolet;
}
#change-pass-btn:hover{
    color: blue;
}
</style>