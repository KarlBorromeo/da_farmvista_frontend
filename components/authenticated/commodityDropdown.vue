<template>
    <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" color="primary">
            <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list elevation="15">
            <v-list-item v-for="(item, i) in commodity" :key="i">
            <v-list-item-title @click="switchCommodity(item)">{{
                item
            }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    data(){
        return {
            commodity: ['Coffee', 'Banana'],
        }
    },
    methods: {
        switchCommodity(commodity){
            this.$emit('switchCommodity',commodity.toLowerCase());
        }
    }
}
</script>
