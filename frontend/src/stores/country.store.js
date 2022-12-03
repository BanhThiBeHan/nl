import { defineStore } from "pinia";
import countryService from "../services/country.service";
import { imageStore } from './image.store'
export const countryStore = defineStore("countryStore", {
	id: 'country',
	state() {
		return {
			ListCountry: [],
			country: {},
			countryEdit : {},

		};
	},
	getters: {
	},
	actions: {
		async getAllCountry() {
			try {
				this.ListCountry = await countryService.getAllCountry();
			} catch (error) {
				console.log(error);
				console.log('loi khi getAllCountry');
			}
		},

		async createCountry(name) {
			if(!name){
				return 2;
			}
			const url = await imageStore().uploadImage()
			if (url == null){
				return 1;
			}
			const data = {
				name: name,
				url_image: url,
			}
			await countryService.createCountry(data);
			this.countryEdit = {};
		},

		async findOneCountry(id) {
			try {
				this.country = await countryService.findOneCountry(id);
				this.countryEdit = this.country;
			} catch (error) {
				console.log(error);
				console.log('loi khi findOneCountry');
			}
		},
		async updateCountry(name){
			const url = await imageStore().uploadImage()
			const data = {
				name: name ?? this.country.name,
				url_image: url ??  this.country.url_image,
			}
			await countryService.updateCountry(this.country.id, data);
			this.countryEdit = {};
		},

		async deleteCountry(id) {
			await countryService.deleteCountry(id);
		}

	},
});
