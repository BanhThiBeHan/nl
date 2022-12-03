import { defineStore } from "pinia";
import songService from "../services/song.service";

export const songStore = defineStore("songStore", {
    id: 'song',
    state() {
        return {
            song: null,
            url: null,
            time: '',
            preview: null,
        };
    },
    getters: {
    },
    actions: {

        

        async previewFiles(event) {
            const file = event.target.files[0];
            const theReader = new FileReader();
            theReader.onloadend = async () => {
                this.preview = await theReader.result;
            };
            theReader.readAsDataURL(file);
            this.song = new FormData();
            this.song.append("song", file);
            this.url = "http://localhost:8088/api/song/" + file.name;
        },

        async uploadSong() {
            if (this.song) {
                await songService.uploadSong(this.song);
                this.song = null
                return this.url;
            }
            else return null;
        },
    }
}

);