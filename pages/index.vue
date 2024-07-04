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
      <v-row justify="center" align="center" class="mt-0">
        <v-col cols="9" sm="3" v-for="i in 3" :key="i" class="mb-4">
          <v-card class="elevation-2" style="height: 300px">
            {{ i }}
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
                style="width: 60%"
                src="~/static/hand2.png"
              />
            </section>
            <section class="d-flex">
              <img
                class="img-cropped"
                style="width: 60%"
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
          <p class="font-weigth-light title text-capitalize">
            A data-centric web application designed to revolutionize farming
          </p>
          <p class="font-weigth-light body-2">
            This platform facilitates real-time information provision and visual
            data dissemination to key stakeholders and decision-makers.
          </p>
          <v-btn large>Learn More</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="9" sm="6">
          <h3 class="title">Insights</h3>
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
          <v-btn large id="aw">More</v-btn>
        </v-col>
        <v-col cols="5" style="height: 300px">
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
      </v-row>
    </v-container>
    <v-container class="mt-6 pt-9">
      <h1 class="title text-center">Explore Projects</h1>
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
            height="200"
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
}
</script>

<style scoped>
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
