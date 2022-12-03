<template>
    <div>
        <div class="flex justify-center m-5 space-x-5">
            <div @click="selectfilter = 'new'" :class="[selectfilter == 'new' ? '' : 'btn-outline']"
                class="btn btn-primary ">
                moi nhat
            </div>
            <div @click="selectfilter = 'heart'" :class="[selectfilter == 'heart' ? ' ' : 'btn-outline']"
                class="btn btn-primary ">
                yeu thich
            </div>
        </div>
        <div class="flex justify-evenly m-5">
            <vPlayMusicVue class="w-2/5 mx-auto" />
            <div class="border-2 p-5 rounded-md w-2/5 mx-auto ">
                <div class="text-center font-semibold text-4xl">
                    List Music {{ title }}
                </div>
                <div v-for="(music, i) in listfilter" :key="music.id">
                    <transition name="bounce">
                        <vMonoMusicVue :stt="i" :data="music" />
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import vPlayMusicVue from '../../components/music/vPlayMusic.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { musicStore } from '../../stores/music.store'
import vMonoMusicVue from '../../components/music/vMonoMusic.vue';
import { favoriteStore } from '../../stores/favorite.store';
const route = useRoute();
const useMusic = musicStore()
const useFavorite = favoriteStore()
const select = ref({})
const selectfilter = ref('new');
const title = ref('')

const ListMusicOrigin = null;
const listfilter = computed(() => {
    title.value = ''
    if (useMusic.ListMusicOrigin) {
        let list = useMusic.ListMusicOrigin;
        if (selectfilter.value == 'heart') {
            title.value = 'yeu thich'
            list = useMusic.setFavorite.filter(music =>
                music.favorite == true
            )
        }
        useMusic.ListMusic = list
        return list;
    }
    return null
})

function selectPlayMusic(data) {
    select.value = data
    console.log(select.value);
}

onMounted(() => {
    useMusic.getAllMusic()
    useFavorite.getFavoriteUser()
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
  