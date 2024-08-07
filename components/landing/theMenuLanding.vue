<template>
  <div class="text-center" style="position: relative">
      <v-btn color="primary" dark @click="showList = !showList" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    <v-list :class="showList?'visible':''" class="list elevation-4 " style="position: absolute; top: 100%; right: 0;">
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        class="text-center"
      >
        <v-list-item-title> <a :href="item.id" @click="showList = !showList">
            {{
            item.title
          }}</a></v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
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
    showList: false
  }),
}
</script>
<style scoped>
.list{
  visibility: hidden;
}
.visible{
  visibility: visible;
}
a{
  text-decoration: none;
}
a:hover{
  animation: shadeAnimate 0.3s ease-in-out;
}
@keyframes shadeAnimate {
  0%{
    background-color: white;
  }
  50%{
    background-color: rgb(201, 192, 192);
  }
  100%{
    background-color: white;
  }
}
</style>
