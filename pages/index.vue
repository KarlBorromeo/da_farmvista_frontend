<template>
  <div>
    <v-card id="headline" class="mb-0 pb-0">
      <v-row align="center">
        <v-col cols="1" id="col-left" />
        <v-col cols="12" sm="7" md="6" lg="5" id="headline-text">
          <div class="pa-1">
            <h1
              class="white--text text-xs-h4 text-md-h3 text-xl-h2 text-center text-sm-left font-weight-bold"
            >
              Empowering Agriculture Through Data-Driven AgriChain Management
            </h1>
            <v-row justify="center" class="my-1 hidden-sm-and-up">
              <v-col cols="4">
                <v-divider color="white" />
              </v-col>
            </v-row>
            <h3
              class="white--text subheading text-center text-sm-left font-weight-light mt-2"
            >
              Optimizing Efficiency, Transparency, and Sustainability Across the
              Agricultural Supply Chain
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <div id="architecture" class="mt-0 pt-0">
      <v-row justify="center" align="center" class="mt-0 pa-4">
        <v-col cols="9" sm="3" lg="2" v-for="(item,i) in architecture" :key="i" class="mb-4">
          <v-card class="elevation-2 pt-6" style="height: 260px; display:flex; flex-direction: column; justify-content:start; align-items:center" :style="dynamicBGColor(i)">
            <section class="d-flex justify-center mt-6">
              <v-icon color="black" size="48" :style="dynamicBorderColor(i)" class="pa-2 rounded-lg"
                    >{{item.icon}}</v-icon>
            </section>
            <section class="pa-2">
              <p class="title text-center font-weight-normal" :style="dynamicTextColor(i)">{{item.text}}</p>
            </section>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="9" sm="6">
          <v-container>
            <section class="d-flex">
              <img
                class="img-cropped"
                style="width: 40%"
                src="~/static/hand1.png"
              />
              <img
                class="img-cropped"
                style="width: 60%; opacity:.85"
                src="~/static/hand2.png"
              />
            </section>
            <section class="d-flex">
              <img
                class="img-cropped"
                style="width: 60%; opacity:.85"
                src="~/static/hand3.png"
              />
              <img
                class="img-cropped"
                style="width: 40%"
                src="~/static/hand4.png"
              />
            </section>
          </v-container>
        </v-col>
        <v-col cols="9" sm="6">
          <p class="font-weight-normal title text-capitalize">
            A data-centric web application <br>Designed to revolutionize farming
          </p>
          <p class="font-weight-normal body-2">
            This platform facilitates real-time information provision and visual
            data dissemination to key stakeholders and decision-makers.
          </p>
          <v-btn large color="primary">Learn More</v-btn>
        </v-col>
      </v-row>
    </v-container>
    
    <div class="customSpacer" />
    <div id="insights" style="background-color: #f0f0f0; min-height: 500px; display:flex; align-items: center; justify-content: center">
      <v-container>
        <v-row align="center" justify="center">
          <v-spacer/>
          <v-col cols="9" sm="6">
            <p class="font-weight-normal title text-capitalize text-start pl-6">Insights</p>
            <v-expansion-panels focusable>
              <v-expansion-panel v-for="(item, i) in 5" :key="i">
                <v-expansion-panel-header>
                  <p>
                    <b>{{ i + 1 }}.</b> What is the fda fdasl aa a?
                  </p>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-btn large color="primary" class="mt-4">Discover More</v-btn>
          </v-col>
          <v-spacer class="d-none d-sm-block" />
          <v-col cols="5" style="height: 300px" class="d-none d-sm-block">
            <section style="position: relative; height: 100%">
              <section id="farmer1">
                <img src="~/static/farmer2.jpg" />
              </section>
              <section id="farmer2">
                <img
                  style="width: 90%; height: 100%; object-fit: cover"
                  src="~/static/farmerPortrait.jpg"
                />
              </section>
            </section>
          </v-col>
          <v-spacer/>
        </v-row>
      </v-container>      
    </div>
    <div class="customSpacer" />
    <v-container id="about">
      <p class="font-weight-normal title text-capitalize text-center">About</p>
      <v-row justify="center" align="center">
        <v-spacer class="d-none d-sm-block" />
        <v-col cols="9" sm="5">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam impedit iure, doloremque numquam facilis ipsum aut asperiores perferendis repudiandae sed fugiat, hic amet distinctio sint perspiciatis voluptate, sunt eum. Quo adipisci soluta voluptas consequuntur, velit quidem iste hic recusandae sint perferendis dolor dignissimos nobis obcaecati. Recusandae doloribus neque earum quis?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, dolores.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, soluta, quas maiores fuga dicta odio similique minima aliquam eum facilis iusto accusantium! Autem, ducimus itaque!</p>
        </v-col>
        <v-spacer class="d-none d-sm-block" />
        <v-col cols="9" sm="5">
            <p class="font-weight-normal subheading text-capitalize text-center">Architecture Framework</p>
            <img
                  style="width: 100%; height: 100%; object-fit: cover"
                  src="~/static/methodology.png"
                />
        </v-col>
        <v-spacer class="d-none d-sm-block" />
      </v-row>
    </v-container>
    <v-container id="commodities" class="mt-6 pt-9">
      <p class="font-weight-normal title text-capitalize text-center">Explore Commodity Projects</p>
      <v-slide-group
        v-model="model"
        class="pa-4 pt-0"
        center-active
        show-arrows
      >
        <v-slide-item v-for="n in 5" :key="n" v-slot="{ active, toggle }">
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="350"
            width="300"
            @click="toggle"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon v-if="active" color="white" size="48"
                  >mdi-close-circle-outline</v-icon
                >
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'main',
  data(){
    return{
      architecture: [
        {
          text: 'Farmer Profiling',
          icon: 'mdi-badge-account-horizontal-outline'
        },
        {
          text: 'Maps and Spatial Data',
          icon: 'mdi-map-check-outline'
        },
        {
          text: 'Analytics and Visualization',
          icon: 'mdi-chart-bar'
        }
      ]
    }
  },
  methods:{
    dynamicBGColor(index){
      if(index == 1){
        return 'background-color:#1a7358'
      }
      return 'background-color: white'
    },
    dynamicBorderColor(index){
      if(index == 1){
        return 'border: 4px solid white; color: white!important'
      }
      return 'border: 4px solid black: color: black'
    },
    dynamicTextColor(index){
      if(index == 1){
        return 'color: white'
      }
      return 'color: black'
    }
  }
}
</script>

<style scoped>
.customSpacer{
  height: 50px;
}
.customGreenColor{
  color: #4db048!important
}
.customGreenBG{
  background-color: #4db048!important;
  color: white;
}
#headline {
  border-radius: 0 !important;
  background-image: url('~/static/landingPageHeadline.jpg');
  background-position: 45% 50%;
  background-color: rgba(0, 0, 0, 0.3);
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 60vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
#col-left {
  display: none;
}
.img-cropped {
  border: 0.5rem solid white;
  border-radius: 1.5rem;
}
#farmer1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  min-width: 180px;
  max-width: 420px;
  min-height: 250px;
  max-height: 350px;
  object-fit: cover;
  z-index: 5;
}
#farmer1 img {
  object-fit: cover;
  width: 100%;
  min-height: 250px;
  max-height: 350px;
  border-radius: .2rem;
}
#farmer1::before {
  content: '';
  display: inline-block;
  width: 100%;
  height: 100%;
  min-height: 250px;
  max-height: 350px;
  border: 3px solid #1a7358;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-45%, -45%);
  z-index: -2;
  border-radius: .2rem;
}
#farmer2 {
  position: absolute;
  left: 0;
  bottom: -35%;
  height: 80%;
  width: 60%;
  min-width: 180px;
  max-width: 400px;
  min-height: 180px;
  max-height: 450px;
  object-fit: cover;
  z-index: 6;
}
#farmer2 img{
  border-radius: .2rem;
}
#farmer2::before {
  content: '';
  display: block;
  width: 90%;
  height: 100%;
  border: 3px solid #1a7358;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -45%);
  z-index: -1;
  border-radius: .2rem;
}
@media screen and (min-width: 601px) {
  #headline {
    background-position: 0% 60%; /* Center the background for smaller screens */
    background-color: rgba(0, 0, 0, 0);
  }
  #col-left {
    display: block;
  }
  #headline-text {
    border: none;
    z-index: 5 !important;
  }
  #headline-text::before {
    content: '';
    position: absolute;
    display: inline-block !important;
    height: 200%;
    width: 2300px;
    top: -5rem;
    left: -48rem;
    transform: rotate(-60deg);
    background-color: rgba(0, 0, 0, 0.3);
    z-index: -1 !important;
  }
  #architecture {
    position: relative;
    top: -7rem;
    z-index: 5 !important;
  }
}
</style>
