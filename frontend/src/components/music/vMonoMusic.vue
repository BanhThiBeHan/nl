<template>
    <div @mouseenter="ishover = true" @mouseleave="ishover = false" class="relative w-full outline rounded-xl "
        :class="[useMusic.selectMusic == stt ? 'outline-primary' :'']">
        <div :class="[!ishover ? 'hidden' : 'absolute flex-none']"
            class="absolute z-50 bg-white/20  backdrop-blur-sm w-full h-full rounded-full">
            <div class=" h-20 mx-5 flex justify-between">
                <div class="flex">
                    <div class="pt-4 pl-14 ml-1">
                        <div @click="select()" class="btn btn-ghost">
                            <i class="fa-solid fa-play text-xl "></i>
                        </div>
                    </div>
                </div>
                <div class="text-xl  pt-4 flex">
                    <div class="">
                        <div v-if="!loading" @click="createFavorite()" class="btn btn-ghost">
                            <i
                                :class="[data.favorite == true ? 'fa-solid fa-heart text-xl p-4 text-red-500' : 'fa-regular fa-heart text-xl p-4']"></i>
                        </div>
                        <div v-if="loading" @click="createFavorite()" class="btn btn-ghost loading">
                        </div>
                    </div>
                    <div class="">
                        <div class="btn btn-ghost">
                            <i class="fa-solid fa-ellipsis text-xl p-4 "></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class=" h-20 m-5 flex justify-between">
            <div class="flex">
                <!-- icon -->
                <div class=""><i class="fa-solid fa-music text-xl p-4 pt-8"></i></div>
                <!-- anh -->
                <div class="pr-2 pt-2">
                    <img class="w-16 h-16 rounded-2xl" :src="data.imgmusic" alt="" />
                </div>
                <!-- thong tin  -->
                <div class="p-3">
                    <div class="text-2xl">{{ data.name }}</div>
                    <div v-for="singer in data.singer" :key="singer.id">{{ singer.name }}</div>
                </div>
            </div>
            <div class="text-xl p-4 pt-6">{{ data.time }}</div>
        </div>
    </div>
</template>
  
<script setup>
import { computed, ref } from "vue";
import { alertStore } from "../../stores/alert.store";
import { authStore } from "../../stores/auth.store";
import { favoriteStore } from "../../stores/favorite.store";
import { musicStore } from "../../stores/music.store";
const props = defineProps({
    data: Object,
    stt: Intl,
})
const useMusic = musicStore()
const ishover = ref(false)
const useFavorite = favoriteStore();
const useAuth = authStore()
const useAlert = alertStore()
const loading = ref(false);
const isFavorite = computed(() => {
    if (props.data.favorite == true) {
        return true;
    }
    return false;
})
async function createFavorite() {
    loading.value = true
    const data = {
        id_user: useAuth.user.id,
        id_music: props.data.id,
    }

    try {
        console.log(isFavorite.value);
        await useFavorite.createFavorite(data)
        if (isFavorite.value == true) {
            useAlert.setSuccess('xoa yeu thich thanh cong')
        }
        else if (isFavorite.value == false) {
            useAlert.setSuccess('yeu thich thanh cong')
        }
        await useFavorite.getFavoriteUser()
    } catch (error) {
        useAlert.setError('yeu thich that bai')
        console.log(error);
        console.log('loi createFavorite');
    }
    finally {
        loading.value = false;
    }
}

function select() {
    useMusic.selectMusic = props.stt,
    useMusic.ListMusic[props.stt].play = true;
}
</script>
  
<style>

</style>
  