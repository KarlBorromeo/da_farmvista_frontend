<template>
  <div>
    <v-container class="mb-0">
      <v-row>
          <v-spacer />
          <commodity-change @switchCommodity="switchCommodity"/>
      </v-row>   
    </v-container>
    <page-description
      icon="mdi-google-maps"
      title="Maps"
      :description="description"
    />    
    <page-contents>
      <caraga-map />
    </page-contents>
  </div>

</template>

<script>
import commodityChange from '~/components/authenticated/commodityChangeCogs.vue'
import caragaMap from '~/components/authenticated/map/maps/caragaMap.vue'
import PageContents from '~/components/authenticated/pageContents.vue'
import PageDescription from '~/components/authenticated/pageDescription.vue'
export default {
  middleware: 'authSuperadminAdmin',
  components: { PageDescription, caragaMap,PageContents, commodityChange },
  data() {
    return {
      description:
        'This module facilitates the location of coffee information, farmers, and other relevant points of interest, enhancing accessibility and connectivity within the agricultural community.',
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'MAPS')
  },
}
</script>

<style></style>
