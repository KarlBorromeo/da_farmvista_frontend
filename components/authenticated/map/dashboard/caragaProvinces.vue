<template>
  <v-col class="card">
    <v-card  class="rounded-lg pt-4">
      <h4 class="text-center">Caraga Reigion Map</h4>
      <v-container class="mt-0 pt-0" style="height:500px; display:flex;">
        <div id="caragaProvinces" class="map-container ma-4">
          <v-card
            elevation="2"
            style="position: absolute; top: 2rem; right: 1rem; z-index: 2"
            tile
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

                  <v-list-item
                    v-for="(item, i) in legend"
                    :key="i"
                    class="pa-0 pl-2 ma-0"
                  >
                    
                    <v-list-item-icon>
                      <div class="colorLegendBox" :class="item.legend"/>
                    </v-list-item-icon>
                    <v-list-item-title style="width:40px; overflow: hidden; word-wrap: break-word;" class="pa-0 ma-0">{{item.province}}</v-list-item-title>
                  </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </div>
        
      </v-container>
    </v-card>
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
      legend: [
        {
          province: 'Agusan del Norte',
          legend: 'red'
        },
        {
          province: 'Agusan del Sur',
          legend: 'blue'
        },
        {
          province: 'Surigao del Norte',
          legend: 'green'
        },
        {
          province: 'Surigao del Sur',
          legend: 'yellow'
        },
        {
          province: 'Province of Dinagat Islands',
          legend: 'orange'
        },
      ]
    };
  },
  methods: {
    initializeMap() {

      // intialize the map variable as a Map entity
      this.map = new Map({
        target: 'caragaProvinces',
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

      //create a new layers using imageWms
      var overlays = new Group({
          'title': 'Overlays',
          layers: [
            new Image({
              title: 'us_population',
              source: new ImageWMS({
                url: 'http://localhost:8081/geoserver/topp/wms',
                params: { 'LAYERS': 'topp:states' },
                ratio: 1,
                serverType: 'geoserver'
              })
            }),
            new Image({
              title: 'tastamania_state_boundaries',
              source: new ImageWMS({
                url: 'http://localhost:8081/geoserver/topp/wms',
                params: { 'LAYERS': 'topp:tasmania_state_boundaries' },
                ratio: 1,
                serverType: 'geoserver'
              })
            }),
            new Tile({
                title: 'Caraga Region',
                source: new TileWMS({
                    url: 'http://localhost:8081/geoserver/da_farmvista/wms',
                    params: {'LAYERS':'da_farmvista:land_cover_map_r13_2020'},
                    serverType: 'geoserver',
                    ratio: 1,
                    visible: true
                })
            }),
            new Tile({
                title: 'Caraga Region',
                source: new TileWMS({
                    url: 'http://localhost:8081/geoserver/da_farmvista/wms',
                    params: {'LAYERS':'tiger-ny'},
                    serverType: 'geoserver',
                    ratio: 1,
                    visible: true
                })
            })
          ]
      });
      this.map.addLayer(base_maps);
      this.map.addLayer(overlays);

      var mouse_position = new MousePosition();
      var zoom = new Zoom();
      this.map.addControl(mouse_position);
      this.map.addControl(zoom);

      

    },

    addHandleClick() {
      /* return url for feature req */
      function getFeatureInfoUrl(pixel, mapSize, bbox) {
        const wmsUrl = 'http://localhost:8081/geoserver/da_farmvista/wms'; // Replace with your WMS URL
        const params = {
          SERVICE: 'WMS',
          VERSION: '1.1.1',
          REQUEST: 'GetFeatureInfo',
          LAYERS: 'da_farmvista:land_cover_map_r13_2020',
          QUERY_LAYERS: 'da_farmvista:land_cover_map_r13_2020',
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

      

      function isCoordinateInBoundingBox(coordinate){
        // [x,y]
        //TODO: request the getCapabilities for the min and max cooridnate of speicfic layer
        const featureMinAxis = [1.3938002E7,880817.0]
        const featureMaxAxis = [1.4077429E7,1172229.875]
        if(coordinate[0] < featureMinAxis[0] || coordinate[0] > featureMaxAxis[0]){
          return false
        }
        if(coordinate[1] < featureMinAxis[1] || coordinate[1] > featureMaxAxis[1]){
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
          const url = getFeatureInfoUrl(evt.pixel, mapSize, transformedExtent);

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
    }
  },
  mounted() {
    this.initializeMap()
    // this.addHandleClick()
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
</style>
