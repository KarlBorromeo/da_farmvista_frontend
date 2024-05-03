<template>
	<v-card light class="pa-4">
		<div class="d-flex align-center justify-space-between pa-4">
			<h2 class="pa-0 ma-0 headline font-weight-bold">
				Survey Questionaire
			</h2>
			<v-menu bottom left>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on" color="primary">
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>

				<v-list elevation="15">
					<v-list-item v-for="(item, i) in commodity" :key="i">
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>
		<v-divider />
		<v-toolbar light elevation="0">
			<template>
				<v-tabs fixed-tabs show-arrows center-active slider-color="red">
					<v-tab @click="clicked('FormOne')" class="body-1">
						FormOne
					</v-tab>
					<v-tab
						class="body-1"
						@click="clicked('FormTwo')"
						:disabled="tabOneValidated"
					>
						FormTwo
					</v-tab>
					<v-tab
						class="body-1"
						@click="clicked('FormTwo')"
						:disabled="tabOneValidated"
					>
						FormTwo
					</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>
		<v-tabs-items>
			<v-card>
				<keep-alive>
					<component :is="current"></component>
				</keep-alive>
			</v-card>
		</v-tabs-items>
	</v-card>
</template>

<script>
import FormOne from './questionnaire_forms/FormOne.vue'
import FormTwo from './questionnaire_forms/FormTwo.vue'

export default {
	components: { FormOne, FormTwo },
	data() {
		return {
			current: 'FormOne',
			commodity: [
				{ title: 'Coffee' },
				{ title: 'Mango' },
				{ title: 'Cacao' },
			],
		}
	},
	methods: {
		clicked(item) {
			this.current = item
		},
	},
	computed: {
		tabOneValidated() {
			return !this.$store.getters['questionnaire/FormOneValidatedGetter']
		},
	},
}
</script>

<style scoped>
@import url('~/assets/css/fonts.css');
</style>