<template>
  <v-card
        elevation="2"
        tile
        class="ma-0 rounded-lg detail-card"
        style="max-width: 450px; overflow: auto; max-height: 450px"
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
                    <section class="pa-2 pl-6" v-if="isLoading">
                        <v-progress-linear
                            v-if="isLoading"
                            color="primary"
                            indeterminate
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </section>
                    <section class="pa-2 pl-6" v-else>
                        <v-list-item style="" class="pa-0 pl-1">
                            <p class="pa-0 ma-0 text-capitalize"> Province Name: <strong>{{featureDetails.geolocation.province}}</strong></p>
                        </v-list-item>
                        <v-list-item style="" class="pa-0 pl-1" v-if="layerFocused=='city' || layerFocused=='barangay'">
                            <p class="pa-0 ma-0 text-capitalize">City/Municipality Name: <strong class="subheading">{{featureDetails.geolocation.cityMunicipality}}</strong></p>
                        </v-list-item>
                        <v-list-item style="" class="pa-0 pl-1" v-if="layerFocused=='barangay'">
                            <p class="pa-0 ma-0 text-capitalize">Barangay Name: <strong class="subheading">{{featureDetails.geolocation.barangay}}</strong></p>
                        </v-list-item>
                        <v-list-item style="" class="pa-0 pl-1">
                            <p class="pa-0 ma-0 text-capitalize">Active Coffee Farmers as of year {{featureDetails.year}}: <strong class="subheading">{{featureDetails.activeFarmerCount}}</strong></p>
                        </v-list-item>
                        <v-list-item style="" class="pa-0 pl-1">
                            <p class="pa-0 ma-0 text-capitalize">Most Common Coffee Variety: <strong class="subheading">{{featureDetails.commonCoffeeVariety}}</strong></p>
                        </v-list-item>
                        <v-list-item style="" class="pa-0 pl-1">
                            <p class="pa-0 ma-0">Estimated Coffee Area: <strong class="subheading">{{featureDetails.coffeeArea}}</strong></p>
                        </v-list-item>
                        <v-list-item style="; display: block" class="pa-0 pl-1">
                            <p class="pa-0 ma-0 text-capitalize">Commodities Present in the Area: </p>
                            <ul class="ml-4">
                                <li v-for="(item,i) in featureDetails.commoditiesPresent" :key="i">
                                    {{item}}
                                </li>
                            </ul>
                        </v-list-item>
                        <v-list-item style="; display: block" class="pa-0 pl-1 mt-2" v-if="layerFocused !='barangay'">
                            <p class="pa-0 ma-0 text-capitalize">{{generateDyamicTitle(layerFocused)}}</p>
                            <ul class="ml-4">
                                <li v-for="(item,i) in featureDetails.coffeePlantations" :key="i">
                                    {{item.location}} - {{item.count}}
                                </li>
                            </ul>
                        </v-list-item>
                    </section>
                 
            </v-list-group>
        </v-list>
        <snackbar ref="snackbar"/>

    </v-card>
</template>

<script>
import snackbar from '~/components/snackbar.vue';
export default {
    data(){
        return{
            isLoading: true
        }
    },
    props: ['layerFocused','gid','commodity'],
    components: { snackbar },
    methods:{
        generateDyamicTitle(layerFocused){
            let text;
            if(layerFocused == 'province'){
                text = "City/Municipality"
            }else if(layerFocused == 'city'){
                text = "Barangay"
            }else{
                text = ''
            }
            return `List of ${text} with Coffee Plantation: `
        },
        async fetchFeatureDetails(){
            this.isLoading = true
            const obj = {
                layer: this.layerFocused,
                type: this.commodity,
                gid: this.gid
            }
            try{
                await this.$store.dispatch('maps/featureReq',obj)
            }catch(err){
                this.$refs.snackbar.showBar(err,'red')
            }
            this.isLoading = false
        }
    },
    computed:{
        featureDetails(){
            return this.$store.getters['maps/featureDetails']
        }
    },
    watch:{
        async gid(val){
            await this.fetchFeatureDetails()
        }
    },
    async mounted(){
        await this.fetchFeatureDetails()
    }
}
</script>

<style scoped>
@keyframes respawn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.detail-card{
    animation: respawn 1s ease 0s 1 normal;
}
</style>