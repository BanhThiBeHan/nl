<template>
    <div>
        <div class="flex justify-center">
            <div class="bg-base-200 cursor-pointer m-5 border-2 border-gray-300 h-[330px] w-[330px] rounded-md ">
                <div class=" h-[200px] w-[250px] rounded-md overflow-hidden m-10 ">
                    <img :src="useImage.previewImage || useGenre.genre.url_image"
                        class="h-[200px] w-[250px] rounded-md object-cover" />
                </div>
                <!-- <div class="text-center text-2xl text-sky-600">{{ useGenre.genre.name || data.name }}</div> -->
            </div>
        </div>
        <div class="flex justify-center">
            <input
                class="w-64 rounded-md border-2 file:bg-primary file:text-white file:h-12 file:font-semibold file:p-2"
                accept="image/*" type="file" @change="useImage.previewFiles($event)" />
        </div>

        <div>
            nhap ten the loai:
        </div>
        <input placeholder="nhap vo day" v-model="inputName" 
            class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full" type="text" />
        <!-- btn -->
        <div class="flex justify-around">
            <div @click="$emit('actionGenre', inputName)" :class="[loading ? 'loading' : '']" class="btn-primary btn btn-outline">
                them
            </div>
            <div @click="router.back()" class="btn-warning btn btn-outline">
                Thoat
            </div>
        </div>

    </div>
</template>

<script setup>
import { genreStore } from "../../stores/genre.store";
import { imageStore } from "../../stores/image.store";
import { onMounted, ref } from "vue";
import {useRouter} from 'vue-router';
const router = useRouter();
const inputName = ref();
const useGenre = genreStore()
const useImage = imageStore()
</script>

<style>

</style>
