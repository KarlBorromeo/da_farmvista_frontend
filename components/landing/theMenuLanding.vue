<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
          router
          class="text-center"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'Home',
        to: '/',
      },
      {
        title: 'About',
        to: '/about',
      },
      {
        title: 'Commodities',
        to: '/commodities',
      },
      {
        title: 'Demographics',
        to: '/demographics',
      },
    ],
  }),
}
</script>
