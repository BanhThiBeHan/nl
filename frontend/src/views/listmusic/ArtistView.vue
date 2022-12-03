<template>
  <div class="flex justify-evenly m-5">
            <vPlayMusicVue class="w-2/5 mx-auto" />
            <div class="border-2 p-5 rounded-md w-2/5 mx-auto ">
                <div class="text-center font-semibold text-4xl">
                    List Music
                </div>
                <div v-for="(music, i) in useMusic.ListMusic" :key="music.id">
                    <transition name="bounce">
                        <vMonoMusicVue :stt="i" :data="music" />
                    </transition>
                </div>
            </div>
        </div>
</template>
  
<script setup>
import vPlayMusicVue from '../../components/music/vPlayMusic.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { musicStore } from '../../stores/music.store'
import vMonoMusicVue from '../../components/music/vMonoMusic.vue';
const route = useRoute();
const useMusic = musicStore()

const select = ref({})

function selectPlayMusic(data) {
  select.value = data
  console.log(select.value);
}

onMounted(() => {
  useMusic.getMusicTypePage('artist', route.params.id, route.params.page)
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
  