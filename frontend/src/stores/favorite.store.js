import { defineStore } from "pinia";
import {authStore } from "./auth.store"
import favoriteService from "../services/favorite.service";
export const favoriteStore = defineStore("favoriteStore", {
	id: 'favorite',
	state() {
		return {
			ListFavorite : [],
		};
	},
	getters: {
	},
	actions: {
		async getFavoriteUser(){
            try {
                this.ListFavorite = await favoriteService.getFavoriteUser(authStore().user.id)
            } catch (error) {
                console.log(error);
                console.log('loi getFavoriteUser');
            }
        },

        async createFavorite(data){
            await favoriteService.createFavorite(data);
        },

        async deleteFavorite(id){
            await favoriteService.deleteFavorite(id);
        }

	},
});
