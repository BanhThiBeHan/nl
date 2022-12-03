import { defineStore } from "pinia";
import singerService from "../services/singer.service";
import { imageStore } from './image.store'
export const singerStore = defineStore("singerStore", {
	id: 'singer',
	state() {
		return {
			ListSinger: [],
			singer: {},
			singerEdit : {},

		};
	},
	getters: {
	},
	actions: {
		async getAllSinger() {
			try {
				this.ListSinger = await singerService.getAllSinger();
			} catch (error) {
				console.log(error);
				console.log('loi khi getAllSinger');
			}
		},

		async createSinger(name) {
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
			await singerService.createSinger(data);
			this.singerEdit = {};
		},

		async findOneSinger(id) {
			try {
				this.singer = await singerService.findOneSinger(id);
				this.singerEdit = this.singer;
			} catch (error) {
				console.log(error);
				console.log('loi khi findOneSinger');
			}
		},
		async updateSinger(name){
			const url = await imageStore().uploadImage()
			const data = {
				name: name ?? this.singer.name,
				url_image: url ??  this.singer.url_image,
			}
			await singerService.updateSinger(this.singer.id, data);
			this.singerEdit = {};
		},

		async deleteSinger(id) {
			await singerService.deleteSinger(id);
		}

	},
});
