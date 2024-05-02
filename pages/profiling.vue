<template>
	<v-row justify="center" class="mt-3">
		<v-dialog v-model="dialog" width="700px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					Open Dialog
				</v-btn>
			</template>
			<v-card>
				<QuestionaireModal />
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import QuestionaireModal from '~/components/questionnaire/questionnaire_modal.vue'
export default {
	components: { QuestionaireModal },
	data() {
		return {
			dialog: false,
		}
	},
}
</script>