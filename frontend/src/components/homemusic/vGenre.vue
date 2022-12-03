<template>
    <div>
        <!-- THE LOAI THEO QUOC GIA -->
        <div class="text-4xl font-serif px-5 py-5">Genre <i class="fa-solid fa-globe"></i></div>
        <div class="carousel carousel-center  p-4 space-x-4 bg-neutral rounded-box bg-opacity-0">
            <div v-for="genre in useGenre.ListGenre" :key="genre.id">
                <router-link    link :to="`/genre/${genre.id}/0`" class="">
                    <div class="carousel-item">
                    <div class="bg-base-200 cursor-pointer m-5 border-2 border-gray-300 h-[330px] w-[330px] rounded-md ">
                        <div class=" h-[200px] w-[250px] rounded-md overflow-hidden m-10 ">
                            <img :src="genre.url_image"
                                class="h-[200px] w-[250px] rounded-md hover:scale-150  duration-500 object-cover" />
                        </div>
                        <div class="text-center text-2xl text-sky-600">{{ genre.name }}</div>
                    </div>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { genreStore } from '../../stores/genre.store';

const useGenre = genreStore();

onMounted(() => {
    useGenre.getAllGenre()
})
</script>

<style>

</style>