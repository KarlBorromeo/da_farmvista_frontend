<template>
  <v-col class="card">
      <v-container class="ma-0 pa-0" style="height:80vh; display:flex;">
        <div id="caragaMap" class="map-container ma-4">
            <div  style="position: absolute; top: 2rem; right: 1rem; z-index: 2">
                <v-card
                    elevation="2"
                    tile
                    class="ma-0 mb-2"
                >
                    <v-list dense>
                    <v-list-group
                        no-action
                        sub-group
                        :value="true"
                        >
                            <template v-slot:activator>
                                <v-list-item-content>
                                Layers
                                </v-list-item-content>
                            </template>
                            <v-radio-group v-model="layerFocused" class="text-center pl-2 ma-0" style="width: 50px">
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
                <v-card
                    elevation="2"
                    tile
                    class="ma-0"
                    style="max-width: 250px"
                >
                    <v-list dense>
                    <v-list-group
                        no-action
                        sub-group
                        :value="true"
                        >
                            <template v-slot:activator>
                                <v-list-item-content>
                                Details
                                </v-list-item-content>
                            </template>
                            <section class="pa-2">
                                <p><strong style="white-space: normal;word-wrap: break-word;">{{layerFocused}}</strong><p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing eluos nulla quaerat, aspernatur vel
                                    it dicta laudantium nemo? Porro, animi aperiam.</p>
                            </section>
                   </v-list-group>
                    </v-list>
                </v-card>
            </div>       
        </div>    
      </v-container>
  </v-col>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import { OSM } from 'ol/source';
import { Tile, Group, Image } from 'ol/layer';
import { TileWMS, ImageWMS }from 'ol/source';
import { fromLonLat, toLonLat, transform, transformExtent } from 'ol/proj';
import { defaults as defaultControls, ScaleLine, Zoom, ZoomSlider, MousePosition} from 'ol/control';

export default {
  name: 'OpenLayersMap',
  data() {
    return {
        map: null,
        layers: [ 
            {
                label: 'province',
                value: 'topp:states'
            },
            {
                label: 'city/muncipality',
                value: 'topp:tasmania_state_boundaries'
            },
            {
                label: 'barangay',
                value: 'da_farmvista:land_cover_map_r13_2020'
            }
        ],
        layerFocused: '',
        layerFocusedMinAxis: [], //[x,y]
        layerFocusedMaxAxis: []  //[x,y]
    };
  },
  watch: {
    layerFocused(newVal,oldVal){
        if(newVal != oldVal){
            this.map.getLayers().getArray().forEach(layer => {
                if(layer.get('title') == 'Overlays' && layer instanceof Group){
                   layer.getLayers().getArray().forEach(subLayer => {
                        if(subLayer.get('title') != newVal){
                            subLayer.setVisible(false)
                        }else{
                            subLayer.setVisible(true)
                        }
                   })
                }
            })
            this.layerFocused = newVal
        }
    }
  },
  methods: {
    initializeMap() {

      // intialize the map variable as a Map entity
      this.map = new Map({
        target: 'caragaMap',
        view: new View({
            center: fromLonLat([125, 8]),
            zoom: 8,
          }),
        controls: defaultControls({
          zoom: false, // Disable the zoom buttons
          rotate: false, // Disable the rotate control
          attribution: false, // Disable the attribution control
          zoomSlider: false, // Disable the zoom slider control
          zoomToExtent: false, // Disable the zoom to extent control
          overviewMap: false, // Disable the overview map control
          fullscreen: false, // Disable the fullscreen control
          mousePosition: false, // Disable the mouse position control
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

    //   create a new layers using imageWms
      var overlays = new Group({
          'title': 'Overlays',
          layers: [
            new Image({
              title: 'topp:states',
              source: new ImageWMS({
                url: 'http://localhost:8081/geoserver/topp/wms',
                params: { 'LAYERS': 'topp:states' },
                ratio: 1,
                serverType: 'geoserver'
              }),
              visible: true
            }),
            new Image({
                title: 'topp:tasmania_state_boundaries',
                source: new ImageWMS({
                url: 'http://localhost:8081/geoserver/topp/wms',
                params: { 'LAYERS': 'topp:tasmania_state_boundaries' },
                ratio: 1,
                serverType: 'geoserver',
                }),
                visible: false
            }),
            new Tile({
                title: 'da_farmvista:land_cover_map_r13_2020',
                source: new TileWMS({
                    url: 'http://localhost:8081/geoserver/da_farmvista/wms',
                    params: {'LAYERS':'da_farmvista:land_cover_map_r13_2020'},
                    serverType: 'geoserver',
                    ratio: 1,
                    visible: true
                }),
                visible: false
            })
          ]
      });
      this.map.addLayer(base_maps);
      this.map.addLayer(overlays);

      var mouse_position = new MousePosition();
      var zoom = new Zoom();
      this.map.addControl(mouse_position);
      this.map.addControl(zoom);

      /* initialize other variables */  //TODO: this should be dynamic, changes if the the layers focused was changed
      this.layerFocused = 'topp:states'
      this.layerFocusedMinAxis = [1.3938002E7,880817.0],    //[x,y]
      this.layerFocusedMaxAxis = [1.4077429E7,1172229.875]  //[x,y]
      /* initialize other variables */  //TODO: this should be dynamic, changes if the the layers focused was changed
    },

    addHandleClick() {
      /* return url for feature req */
      function getFeatureInfoUrl(pixel, mapSize, bbox, layerFocused) {
        const wmsUrl = 'http://localhost:8081/geoserver/da_farmvista/wms'; // Replace with your WMS URL
        const params = {
          SERVICE: 'WMS',
          VERSION: '1.1.1',
          REQUEST: 'GetFeatureInfo',
          LAYERS: layerFocused,
          QUERY_LAYERS: layerFocused,
          INFO_FORMAT: 'application/json',
          FEATURE_COUNT: 50,
          X: Math.floor(pixel[0]),
          Y: Math.floor(pixel[1]),
          WIDTH: mapSize[0],
          HEIGHT: mapSize[1],
          CRS: 'EPSG:4326', // the CRS expected by WMS server 'EPSG:4326'
          BBOX: bbox.join(','),
        };

        const urlParams = new URLSearchParams(params).toString();
        return `${wmsUrl}?${urlParams}`;
      }

      

      const isCoordinateInBoundingBox = (coordinate) =>{
        if(coordinate[0] < this.layerFocusedMinAxis[0] || coordinate[0] > this.layerFocusedMaxAxis[0]){
          return false
        }
        if(coordinate[1] < this.layerFocusedMinAxis[1] || coordinate[1] > this.layerFocusedMaxAxis[1]){
          return false
        }
        return true
      }
      this.map.on('click', (evt) => {
        // console.log(evt.coordinate, featureMinAxis, featureMaxAxis)
        if(isCoordinateInBoundingBox(evt.coordinate)){
          const view = this.map.getView();
          const mapSize = this.map.getSize();
          const viewProjection = view.getProjection()

          // Calculate the extent in the correct CRS
          // Assuming server expects EPSG:4326
          const extent = view.calculateExtent(mapSize);
          const transformedExtent = transformExtent(extent, viewProjection, 'EPSG:4326'); 

          // Construct GetFeatureInfo URL
          const url = getFeatureInfoUrl(evt.pixel, mapSize, transformedExtent, this.layerFocused);

          if (url) {
            fetch(url)
              .then(response => response.json())
              .then(data => {
                console.log(data);
              })
            .catch(error => console.error('Error fetching feature info:', error));
          }          
        }else{
          alert('outside the feature')
        }
      })
    },
    layerTest(){
        this.map.on('click', (evt) => {
          this.map.getLayers().getArray().forEach(layer => {
                if(layer.get('title') == 'Overlays' && layer instanceof Group){
                   layer.getLayers().getArray().forEach(subLayer => {
                        subLayer.setVisible(false)
                   })
                }
            });
        })
    }
  },
  mounted() {
    this.initializeMap()
    this.addHandleClick()
    // this.layerTest()
  },
};
</script>

<style scoped>
#caragaMap{
  width: 100%!important;
  height: auto; /* Adjust the height as needed */
  position: relative;
}
.colorLegendBox{
  width: 50px;
  height: 100%;
}
</style>
