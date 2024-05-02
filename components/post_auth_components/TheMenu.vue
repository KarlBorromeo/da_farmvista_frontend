<template>
	<div class="text-center">
		<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
					<v-icon
						class="hidden-sm-and-down"
						v-bind="attrs"
						v-on="on"
						color="primary"
					>
						mdi-menu-down
					</v-icon>
					<v-icon
						color="primary"
						class="hidden-md-and-up"
						v-bind="attrs"
						v-on="on"
					>
						mdi-dots-vertical
					</v-icon>
				</v-btn>
			</template>
			<v-list>
				<v-list-item class="d-flex justify-center">
					<v-icon x-large class="mr-3"
						>mdi-account-circle-outline</v-icon
					>
					<h4>Karlito</h4>
				</v-list-item>
				<v-divider />
				<v-list-item
					v-for="(item, index) in dropdown"
					:key="index"
					:to="item.to"
					router
					color="white"
				>
					<v-list-item-title>
						<v-btn
							block
							width="210"
							class="pa-0 ma-0"
							color="white"
						>
							<v-row class="ma-0">
								<v-col cols="4" class="header_dropdown_btns">
									<v-icon>{{ item.icon }}</v-icon>
								</v-col>
								<v-col cols="5" class="header_dropdown_btns">
									{{ item.title }}
								</v-col>
								<v-col cols="3" class="header_dropdown_btns">
									<v-icon>{{ item.sub_icon }}</v-icon>
								</v-col>
							</v-row>
						</v-btn>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
export default {}
</script>

<style></style>
