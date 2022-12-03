import { defineStore } from "pinia";
import musicService from "../services/music.service";
import { songStore } from "./song.store";
import { imageStore } from "./image.store";
import { alertStore } from "./alert.store"
import {favoriteStore} from "./favorite.store";
export const musicStore = defineStore("musicStore", {
    id: 'music',
    state() {
        return {
            ListMusic: [],
            ListMusicOrigin: [],
            selectMusic: -1,
            music: {},
        };
    },
    getters: {
        setFavorite(state){
                state.ListMusicOrigin.forEach((music, i) => {
                    state.ListMusicOrigin[i].favorite = false;
                    favoriteStore().ListFavorite.forEach(e => {
                        if(e.id_music == music.id){
                            state.ListMusicOrigin[i].favorite = true;
                        }
                    });
                });
            return state.ListMusicOrigin
        },
        
    },
    actions: {

        async getMusicTypePage(type, id, page) {
            try {
                this.ListMusic = await musicService.getMusicTypePage(type, id, page);
            } catch (error) {
                console.log(error);
                console.log('loi khi getMusicTypePage');
            }
        },

        async getAllMusic() {
            try {
                this.ListMusic = await musicService.getAllMusic();
                this.ListMusicOrigin = this.ListMusic;
                // Object.freeze(this.ListMusicOrigin);
            } catch (error) {
                console.log(error);
                console.log('loi khi getAllMusic');
            }
        },

        async createMusic(data) {
            data.imgmusic = await imageStore().uploadImage()
            data.url = await songStore().uploadSong()
            if (data.imgmusic && data.url) {
                await musicService.createMusic(data)
                return true
            }
            return null;
        },

        async findOneMusic(id) {
            try {
                this.music = await musicService.findOneMusic(id)
            } catch (error) {
                console.log(error);
                console.log('loi khi findOneMusic');
            }
        },

        async updateMusic(id, data) {
            data.imgmusic = await imageStore().uploadImage() ?? this.music.imgmusic
            data.url = await songStore().uploadSong() ?? this.music.url
            await musicService.updateMusic(id, data)
        },

        async deleteMusic(id) {
            await musicService.deleteMusic(id)
        }
    },
});
