<template>
    <div>
        <div class="carousel carousel-center  p-4 space-x-4 bg-neutral rounded-box bg-opacity-0">
                <!-- <router-link    link :to="`/genre/${genre.id}/0`" class=""> -->
                    <div class="carousel-item">
                    <div class="bg-base-200 cursor-pointer m-5 border-2 border-gray-300 h-[330px] w-[330px] rounded-md ">
                        <div class=" h-[200px] w-[250px] rounded-md overflow-hidden m-10 ">
                            <img :src="data.url_image"
                                class="h-[200px] w-[250px] rounded-md hover:scale-150  duration-500 object-cover" />
                        </div>
                        <div class="text-center text-2xl text-sky-600">{{data.name}}</div>
                    </div>
                </div>
                <!-- </router-link> -->
            </div>
        </div>
</template>

<script setup>

const props = defineProps({
    data: Object,
})

</script>

<style>

</style>