<template>
  <v-card light class="pa-4">
    <v-row class="mt-4">
        <v-col class="text-center">
            <div id="profile-container">
                <v-icon id="icon" x-large>mdi-account</v-icon>
                <v-btn
                    icon
                    id="add-profile"
                >
                    <v-icon id="add-profile-icon">mdi-plus</v-icon>
                </v-btn>
                
            </div>
            <p class="text-uppercase py-0 my-0">Jand Doe</p>
            <p class="text-uppercase py-0 my-0 font-weight-thin unhighlight">sample company</p>
            <div id="custom-divider-container">
                <div style="width:10%; display: inline-block" class="py-0 my-0">
                    <v-divider />
                </div>                
            </div>
            <p class="py-0 my-0 font-weight-light">janedoe@gmail.com</p>
            <p class="py-0 my-0 text-capitalize">manila, Philippines</p>
            <p class="py-0 my-0 font-weight-bold">Super Admin</p>
            <p class="text-decoration-underline" id="change-pass-btn">Change Password</p>
        </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {

}
</script>

<style scoped>
#profile-container{
    display: inline-block;
    background-color: #ded9d9;
    border-radius: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    position: relative;
}

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