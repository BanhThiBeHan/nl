import { defineStore } from "pinia";
import artistService from "../services/artist.service";
import { imageStore } from './image.store'
export const artistStore = defineStore("artistStore", {
	id: 'artist',
	state() {
		return {
			ListArtist: [],
			artist: {},
			artistEdit : {},

		};
	},
	getters: {
	},
	actions: {
		async getAllArtist() {
			try {
				this.ListArtist = await artistService.getAllArtist();
			} catch (error) {
				console.log(error);
				console.log('loi khi getAllArtist');
			}
		},

		async createArtist(name) {
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
			await artistService.createArtist(data);
			this.artistEdit = {};
		},

		async findOneArtist(id) {
			try {
				this.artist = await artistService.findOneArtist(id);
				this.artistEdit = this.artist;
			} catch (error) {
				console.log(error);
				console.log('loi khi findOneArtist');
			}
		},
		async updateArtist(name){
			const url = await imageStore().uploadImage()
			const data = {
				name: name ?? this.artist.name,
				url_image: url ??  this.artist.url_image,
			}
			await artistService.updateArtist(this.artist.id, data);
			this.artistEdit = {};
		},

		async deleteArtist(id) {
			await artistService.deleteArtist(id);
		}

	},
});
