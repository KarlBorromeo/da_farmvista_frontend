<template>
      <!-- <v-container class="ma-0 pa-0" style="height:80vh; display:flex; border: 1px dashed yellow"> -->
        <div id="caragaMap" class="mt-4">
            <div  style="position: absolute; top: 2rem; right: 1rem; z-index: 2">
                <v-card
                    elevation="2"
                    tile
                    class="ma-0 mb-2 rounded-lg"
                >
                    <v-list dense>
                      <v-list-group
                          no-action
                          sub-group
                          :value="false"
                          >
                            <template v-slot:activator>
                                <v-list-item-content>
                                Location
                                </v-list-item-content>
                            </template>
                            <v-radio-group v-model="layerFocused" class="text-center pl-6 ma-0" style="width: 50px">
                                <v-radio
                                    v-for="(layer,i) in layers"
                                    :key="i"
                                    :label="layer.label"
                                    :value="layer.value"
                                    class="text-capitalize"
                                ></v-radio>
                            </v-radio-group>
                      </v-list-group>
                    </v-list>
                </v-card>
                <feature-details v-if="isClickedOnce" :layerFocused="layerFocused" :gid="selectedGid" :commodity="commodity"/>
            </div> 
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
      <!-- </v-container> -->
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import { OSM, Source } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { Style, Fill, Stroke } from 'ol/style'
import { Tile, Group, Image } from 'ol/layer';
import { TileWMS, ImageWMS }from 'ol/source';
import { Select } from 'ol/interaction';
import { pointerMove, click } from 'ol/events/condition'
import { fromLonLat, toLonLat, transform, transformExtent } from 'ol/proj';
import { defaults as defaultControls, ScaleLine, Zoom, ZoomSlider, MousePosition} from 'ol/control';


import * as olLayer from 'ol/layer';
import * as olSource from 'ol/source';
const { Vector: VectorLayer } = olLayer;
const { Vector: VectorSource } = olSource;

import mapFooter from '../mapFooter.vue';
import featureDetails from './featureDetails.vue';
export default {
  props: ['commodity'],
  components: { mapFooter, featureDetails },
  name: 'OpenLayersMap',
  data() {
    return {
        map: null,
        layers: [
            {
                label: 'province',
                value: 'province'
            },
            {
                label: 'city',
                value: 'city'
            },
            {
                label: 'barangay',
                value: 'barangay'
            }
        ],
        layerFocused: 'province',
        isLoading: true,
        isClickedOnce: false,
        selectedGid: null,
    };
  },
  watch: {
    async layerFocused(){
      this.isClickedOnce = false
      this.removeSubLayers()
      await this.fetchSubLayer()
      this.addSubLayer()
    },
    async commodity(){
      await this.fetchSubLayer()
    }
  },
  methods: {
    /* removes all the layers under the 'Overlays' layer */
    removeSubLayers(){
      this.map.getLayers().getArray().forEach(layer => {
          if(layer.get('title') == 'Overlays' && layer instanceof Group){
              layer.getLayers().getArray().forEach(subLayer => {
                  layer.getLayers().remove(subLayer)
              })
          }
      });
    },

    /* add a sublayer inside the 'Overlays' layer */
    addSubLayer(){
      const geojsonData = this.$store.getters['maps/layer'];
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonData, {
          featureProjection: 'EPSG:4326',
        })
      })

      const newSublayer = new VectorLayer({
        title: this.layerFocused,
        source: vectorSource,
        style: new Style({
          fill: new Fill({
            color: 'rgba(165,80,51,0.5)'
          }),
          stroke: new Stroke({
            color: 'black',
            width: 1
          })
        }),
        visible: true
      })
    
      this.map.getLayers().getArray().forEach(layer => {
        if (layer.get('title') === 'Overlays' && layer instanceof Group) {
          layer.getLayers().push(newSublayer)
        }
      });
    },

    /* fetch the layer */
    async fetchSubLayer(){
      this.isLoading = true
      const obj = {
        type: this.commodity,
        layer: this.layerFocused
      }
      await this.$store.dispatch('maps/geoLayerReq',obj)
      this.isLoading = false
    },

    /* initialize */
    async initializeMap() {
      /* intialize the map variable as a Map entity */
      this.map = new Map({
        target: 'caragaMap',
        view: new View({
            projection: 'EPSG:4326',
            center: fromLonLat([125.79, 8.9],'EPSG:4326'),
            zoom: 9,
            minZoom: 8,
            maxZoom: 11
          })
      });

      /* creating a base map */
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

      /* creating a layer group for sublayers */
      const overlays = new Group({
          'title': 'Overlays',
          layers: []
      });

      /* added the layers */
      this.map.addLayer(base_maps);
      this.map.addLayer(overlays);

      /* create hover style interaction, styles the feature if hovered */
      const hoverInteraction = new Select({
        condition: pointerMove,
        style: new Style({
          fill: new Fill({
            color: 'rgba(0, 0, 0, 0.5)', // Change to your desired hover color
          }),
          stroke: new Stroke({
            color: '#FF0000', // Change to your desired hover color
            width: .5,
          }),
        }),
      });

      /* create select interaciton when feature is selected/clicked */
      const clickInteraction = new Select({
        condition: click
      })
      clickInteraction.on('select', (event) => {
        this.isClickedOnce = true;
        const selectedFeatures = event.target.getFeatures();
        if (selectedFeatures.getLength() > 0) {
          const selectedFeature = selectedFeatures.item(0);
          const featureProperties = selectedFeature.getProperties();
          this.selectedGid = featureProperties.gid;
        }
      });

      /* added interaction features on the map */
      this.map.addInteraction(hoverInteraction);
      this.map.addInteraction(clickInteraction);

      /* added mouse position coordinates feature */
      var mouse_position = new MousePosition();
      this.map.addControl(mouse_position);
    }
  },
  async mounted() {
    this.initializeMap()
    await this.fetchSubLayer()
    this.addSubLayer()
  },
  beforeMount(){
    this.isLoading = true;
  }
};
</script>

<style scoped>
#caragaMap{
  width: auto;
  height: 80vh;
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
