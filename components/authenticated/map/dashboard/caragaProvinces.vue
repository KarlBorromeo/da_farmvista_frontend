<template>
  <v-col class="card">
    <v-card  class="rounded-lg pt-4">
      <h4 class="text-center">Caraga Provinces Map</h4>
      <v-container class="mt-0 pt-0" style="height:500px; display:flex;">
        <div id="caragaProvinces" class="map-container ma-4">
          <v-card
            elevation="2"
            style="position: absolute; top: 2rem; right: 1rem; z-index: 2"
            tile
            class="rounded-lg"
          >
            <v-list dense>
              <v-list-group
                  no-action
                  sub-group
                  :value="true"
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      Legend
                    </v-list-item-content>
                  </template>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(item, i) in details"
                      :key="i"
                      class="pa-0 pl-2 ma-0"
                      @click="highlightLayer(item.province)"
                    >
                      
                      <v-list-item-icon>
                        <div class="colorLegendBox" :style="setBGcolor(item.color)"/>
                      </v-list-item-icon>
                      <v-list-item-title style="width:40px; overflow: hidden; word-wrap: break-word;" class="pa-0 ma-0">{{item.province}}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
              </v-list-group>
            </v-list>
          </v-card>
          <v-sheet
              v-if="isLoading"
              id="skeleton-map"
              color="grey lighten-4"
              class="pa-3"
            >
              <v-skeleton-loader
                class="mx-auto"  
              >
            
              </v-skeleton-loader>
              <v-progress-circular
                id="progress-circular"
                :size="70"
                :width="7"
                indeterminate
              ></v-progress-circular>
            </v-sheet> 
            <mapFooter />
        </div>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import { OSM } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { Style, Fill, Stroke } from 'ol/style'
import { Tile, Group, Image } from 'ol/layer';
import { TileWMS, ImageWMS }from 'ol/source';
import { fromLonLat, toLonLat, transform, transformExtent } from 'ol/proj';
import { defaults as defaultControls, ScaleLine, Zoom, ZoomSlider, MousePosition} from 'ol/control';

import * as olLayer from 'ol/layer';
import * as olSource from 'ol/source';
import { onBeforeMount } from 'vue';
const { Vector: VectorLayer } = olLayer;
const { Vector: VectorSource } = olSource;

import mapFooter from '../mapFooter.vue';
export default {
  name: 'OpenLayersMap',
  components: { mapFooter },
  data() {
    return {
      map: null,
      details: {
        agusanDelNorte: {
          province: 'Agusan del Norte',
          color: 'rgba(211, 232, 211, 0.5)'
        },
        agusanDelSur: {
          province: 'Agusan del Sur',
          color: 'rgba(26, 115, 88, 0.5)'
        },
        surigaoDelNorte: {
          province: 'Surigao del Norte',
          color: 'rgba(255, 0, 0, 0.5)'
        },
        surigaoDelSur: {
          province: 'Surigao del Sur',
          color: 'rgba(0, 0, 255, 0.5)'
        },
        dinagatIsland: {
          province: 'Dinagat Islands',
          color: 'rgba(245, 85, 37, 0.5)'
        }
      },
      isLoading: false,
    }
  },
  methods: {
    async fetchGeojson(){
      try{
        this.isLoading = true
        await this.$store.dispatch('dashboard/geojsonFetch')
      }catch(err){
        console.error(err)
      } 
      this.isLoading = false
    },
    highlightLayer(province){
      this.map.getLayers().getArray().forEach(layer=>{
        if(layer.get('title') == 'province layers'){
          const source = layer.getSource();
    
          // Get the features from the source
          const features = source.getFeatures();
       
          // reset the colors and provide white color for the selected layer
          features.forEach(feature => {
            let provinceName = feature.get('adm2_en')
            let fillColor;
            switch(provinceName){
              case 'Agusan del Sur': fillColor = this.details.agusanDelSur.color; break; // '#1a7358'
              case 'Agusan del Norte': fillColor = this.details.agusanDelNorte.color; break; // '#d3e8d3'
              case 'Surigao del Norte': fillColor = this.details.surigaoDelNorte.color; break; // '#d9d9d9'
              case 'Surigao del Sur': fillColor = this.details.surigaoDelSur.color; break; // '#F7F5F2'
              case 'Dinagat Islands': fillColor = this.details.dinagatIsland.color; break; // '#f55525'  
              default: fillColor = 'rgba(0,0,0,0.3)'; // Default color
            }
            if(provinceName == province){
              fillColor = 'rgba(255,255,255,.8)'
            }
            feature.setStyle(new Style({
              fill: new Fill({
                color: fillColor
              }),
              stroke: new Stroke({
                color: 'black',
                width: 1
              })
            }))
          });
        }
      })
    },
    setBGcolor(hexColor){
      return `background-color: ${hexColor}`
    },
    initializeMap() {
      // intialize the map variable as a Map entity
      this.map = new Map({
        target: 'caragaProvinces',
        view: new View({
            projection: 'EPSG:4326',
            center: fromLonLat([125.79, 8.9],'EPSG:4326'),
            zoom: 8,
            minZoom: 8,
            maxZoom: 9
          })
      });

      // create a base map Tile
      var base_maps = new Group({
        'title': 'Base maps',
        layers: [
          new Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new OSM()
          })
        ]
      });

      // get the geojson data and create vector 
      const geojsonData = this.$store.getters['dashboard/caragaProvincesGeoJSON']
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonData, {
          featureProjection: 'EPSG:4326',
        })
      })
      const provinceLayer = new VectorLayer({
        title: 'province layers',
        source: vectorSource,
        style: (feature) =>{
          let provinceName = feature.get('adm2_en')
          let fillColor;
          switch(provinceName){
            case 'Agusan del Sur': fillColor = this.details.agusanDelSur.color; break; // '#1a7358'
            case 'Agusan del Norte': fillColor = this.details.agusanDelNorte.color; break; // '#d3e8d3'
            case 'Surigao del Norte': fillColor = this.details.surigaoDelNorte.color; break; // '#d9d9d9'
            case 'Surigao del Sur': fillColor = this.details.surigaoDelSur.color; break; // '#F7F5F2'
            case 'Dinagat Islands': fillColor = this.details.dinagatIsland.color; break; // '#f55525'  
            default: fillColor = 'rgba(0,0,0,0.3)'; // Default color
          }
          return new Style({
            fill: new Fill({
              color: fillColor
            }),
            stroke: new Stroke({
              color: 'black',
              width: 1
            })
          })
        },
        visible: true
      })

      this.map.addLayer(base_maps);
      this.map.addLayer(provinceLayer);

      var mouse_position = new MousePosition();
      this.map.addControl(mouse_position);
    }
  },
  async mounted() {
    await this.fetchGeojson()
    this.initializeMap()
  },
};
</script>

<style scoped>
#caragaProvinces{
  width: 100%!important;
  height: auto; /* Adjust the height as needed */
  position: relative;
}
.colorLegendBox{
  width: 50px;
  height: 100%;
}
#skeleton-map{
  opacity: .7;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;
}
#progress-circular{
  color: rgba(165,80,51,1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
