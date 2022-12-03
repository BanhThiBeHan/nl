<template>
    <div>
        <div class="flex justify-center">
            <div class="bg-base-200 cursor-pointer m-5 border-2 border-gray-300 h-[330px] w-[330px] rounded-md ">
                <div class=" h-[200px] w-[250px] rounded-md overflow-hidden m-10 ">
                    <img :src="useImage.previewImage || useGenre.genre.url_image"
                        class="h-[200px] w-[250px] rounded-md object-cover" />
                </div>
            </div>
        </div>
        <div class="flex justify-center">

            <input
                class="w-64 rounded-md border-2 file:bg-primary file:text-white file:h-12 file:font-semibold file:p-2"
                accept="image/*" type="file" @change="useImage.previewFiles($event)" />
        </div>

        <div>
            them file bai hat:
        </div>
        <audio class="hidden" :src="useSong.preview" ref="audio" controls>
            <source src="" type="audio/mpeg">
        </audio>
        <input class="w-full rounded-md border-2 file:bg-primary file:text-white file:h-12 file:font-semibold file:p-2"
            accept="audio/mpeg" type="file" @change="useSong.previewFiles($event)" />
        <div>
            nhap ten bai hat:
        </div>

        <input placeholder="nhap vo day" v-model="inputName" class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
            type="text" />

        <vSelectGenreMusicVue typeGenreMusic="the loai" v-model:selected="selectedGenre" :data="useGenre.ListGenre" />
        <vSelectGenreMusicVue typeGenreMusic="ca si" v-model:selected="selectedSinger" :data="useSinger.ListSinger" />
        <vSelectGenreMusicVue typeGenreMusic="quoc gia" v-model:selected="selectedCountry" :data="useCountry.ListCountry" />
        <vSelectGenreMusicVue typeGenreMusic="tac gia" v-model:selected="selectedArtist" :data="useArtist.ListArtist" />

        <!-- btn -->
        <div class="flex justify-around">
            <div @click="createMusic()" :class="[loading ? 'loading' : '']" class="btn-primary btn btn-outline">
                them
            </div>
            <div @click="router.back()" class="btn-warning btn btn-outline">
                Thoat
            </div>
        </div>
    </div>
</template>

<script setup>
import vSelectGenreMusicVue from "./vSelectGenreMusic.vue";
import { genreStore } from "../../stores/genre.store";
import { imageStore } from "../../stores/image.store";
import { onMounted, ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { singerStore } from "../../stores/singer.store";
import { countryStore } from "../../stores/country.store";
import { artistStore } from "../../stores/artist.store";
import { songStore } from '../../stores/song.store';
import { musicStore } from "../../stores/music.store";
import { authStore } from "../../stores/auth.store";
import { alertStore } from "../../stores/alert.store";
const useAlert = alertStore()
const useSong = songStore();
const useAuth = authStore()
const router = useRouter();
const inputName = ref();
const useGenre = genreStore();
const useSinger = singerStore();
const useCountry = countryStore();
const useArtist = artistStore();
const useImage = imageStore()
const useMusic = musicStore()
const selectedGenre = ref([]);
const selectedSinger = ref([]);
const selectedCountry = ref([]);
const selectedArtist = ref([]);
const audio = ref({});
const loading = ref(false);

function getListId(list) {
    let listId = [];
    list.forEach(element => {
        listId.push(element.id);
    });
    return listId;
}


async function createMusic() {
    loading.value = true;
    const data = {
        id_user: useAuth.user.id,
        name: inputName.value,
        time: getFormattedTime(audio.value.duration),
        artist: getListId(selectedArtist.value),
        singer: getListId(selectedSinger.value),
        genre: getListId(selectedGenre.value),
        country: getListId(selectedCountry.value),
    }
    try {
        const kq = await useMusic.createMusic(data)
        if (kq) {
            useAlert.setSuccess('da them bai hat thanh cong')
            await useMusic.getAllMusic()
            router.push('/dashboard/managemusic');
        }
        else {
            useAlert.setError('ban can nhap du anh ten va bai hat')
        }

    } catch (error) {
        console.log(error);
        console.log(' loi addMusic');
    }
    finally {
        loading.value = false;

    }
}

function getFormattedTime(duration) {
    if (duration > 0) {
        const minute = parseInt((duration / 60) % 60);
        const second = parseInt(duration % 60);
        return `${minute}:${second}`
    }
    return '0:0'
}

onMounted(() => {
    useGenre.getAllGenre();
    useSinger.getAllSinger();
    useCountry.getAllCountry();
    useArtist.getAllArtist();
})
</script>

<style>

</style>
