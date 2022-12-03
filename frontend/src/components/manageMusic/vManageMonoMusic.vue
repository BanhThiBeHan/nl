<template>
    <div class="">
        <div class=" w-full outline rounded-xl ">
            <div  class=" h-20  flex justify-between">
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
                <div class="text-xl p-4 pt-6">{{data.time}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    data: Object,
})

</script>


<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

/* .bounce-leave-active {
  animation: bounce-in 0.5s reverse;
} */
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
</style>
