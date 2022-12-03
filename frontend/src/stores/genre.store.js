import { defineStore } from "pinia";
import genreService from "../services/genre.service";
import { imageStore } from './image.store'
export const genreStore = defineStore("genreStore", {
	id: 'genre',
	state() {
		return {
			ListGenre: [],
			genre: {},
			genreEdit : {},

		};
	},
	getters: {
	},
	actions: {
		async getAllGenre() {
			try {
				this.ListGenre = await genreService.getAllGenre();
			} catch (error) {
				console.log(error);
				console.log('loi khi getAllGenre');
			}
		},

		async createGenre(name) {
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
			await genreService.createGenre(data);
			this.genreEdit = {};
		},

		async findOneGenre(id) {
			try {
				this.genre = await genreService.findOneGenre(id);
				this.genreEdit = this.genre;
			} catch (error) {
				console.log(error);
				console.log('loi khi findOneGenre');
			}
		},
		async updateGenre(name){
			const url = await imageStore().uploadImage()
			const data = {
				name: name ?? this.genre.name,
				url_image: url ??  this.genre.url_image,
			}
			await genreService.updateGenre(this.genre.id, data);
			this.genreEdit = {};
		},

		async deleteGenre(id) {
			await genreService.deleteGenre(id);
		}

	},
});
