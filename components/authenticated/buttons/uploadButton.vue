<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                block
                color="primary"
                large
                style="position: relative"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon class="mr-2"
                    >mdi-microsoft-excel</v-icon
                >
                UPLOAD
                <v-icon
                    class="mr-2"
                    style="position: absolute; right: 0"
                    >mdi-chevron-down</v-icon
                >
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
            >
                <v-list-item-title>{{
                    item.title
                }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    data(){
        return{
            items: [
				{ title: 'Click Me' },
				{ title: 'Click Me' },
				{ title: 'Click Me' },
			],
        }
    }
}
</script>

<style>

</style>