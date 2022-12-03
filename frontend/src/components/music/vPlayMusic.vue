<template>
  <div :style="anhdd" class=" bg-cover w-full h-fit rounded-2xl ">
    <div class="bg-white/30 backdrop-blur-md w-full h-fit mx-auto rounded-2xl border-2 border-sky-900 ">
      <!-- disk -->
      <div class="flex justify-center py-10">
        <img :class="[play ? 'animate-spin-slow' : '']" class=" h-52 w-52 rounded-full duration-1000"
          :src="(music.imgmusic || url)" alt="" />
      </div>
      <div class="font-serif font-bold text-3xl text-center">{{ music.name || 'chua chon bai hat' }}</div>
      <div v-for="singer in music.singer" :key="singer.id" class="font-serif text-center text-lg">
        {{ singer.name }}
      </div>
      <div v-if="!music.singer" class="font-serif text-center text-lg">
        chua co ten ca si
      </div>
      <div class="flex justify-around my-5 text-xl">
        <div @click="selectRandom()" :class="[random ? 'btn btn-primary w-16' : 'btn btn-ghost w-16']">
          <i class="fa-solid fa-shuffle"></i>
        </div>
        <div class="btn btn-ghost w-16">
          <i class="fa-solid fa-heart"></i>
        </div>
        <div @click="selectLoop()" :class="[loop ? 'btn btn-primary w-16 ' : 'btn btn-ghost w-16']">
          <i class="fa-solid fa-arrow-rotate-left"></i>
        </div>
        <div @click="volume = !volume" class="btn btn-ghost w-16">
          <i :class="[volume ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high']"></i>
        </div>
      </div>
      <div class="w-11/12 mx-auto flex  ">
        <div class="">
          {{timeAudioDuration}}
        </div>

        <progress class="progress mt-2 mx-2  w-full " :value="valuetime" max="100"></progress>
        <div>
          {{ timeAudioEnd }}
        </div>
      </div>
      <div class="flex justify-around">
        <!-- pre -->
        <div @click="previousAudio()" class="btn btn-ghost m-6">
          <i class="fa-solid fa-backward-step text-4xl"></i>
        </div>

        <!-- play -->
        <div @click="playAndPause()" class="cursor-pointer text-center m-5 opacity"><i
            :class="[play ? 'text-red-500 text-6xl  fa-solid fa-circle-pause' : 'text-red-500 text-6xl  fa-solid fa-circle-play']"></i>
        </div>
        <!-- next -->
        <div @click="nextAudio()" class="btn btn-ghost m-6">
          <i class="fa-solid fa-forward-step  text-4xl"></i>
        </div>
      </div>
    </div>
    <audio v-show="false" @canplay="onReadly = true" :muted="volume" @ended="endAudio()" ref="audio" controls
      :loop="loop">
      <source src="" type="audio/mpeg">
    </audio>
  </div>
</template>
  
<script setup>
import { ref, onUpdated, computed, onMounted, onUnmounted } from "vue";
import { musicStore } from "../../stores/music.store";

const audio = ref({});
const play = ref(false)
const useMusic = musicStore();
const url = ref('../../../public/imgs/avatar.jpg')
const anhdd = ref(`background-image: url(${url.value});`)
const loop = ref(false)
const random = ref(false)
const volume = ref(false)
const onReadly = ref(false)
const timer = ref(0);
const endTime = ref(0);
const valuetime = ref(0);


const music = computed(() => {
  if (useMusic.selectMusic > -1) {
    audio.value.src = useMusic.ListMusic[useMusic.selectMusic].url
    audio.value.play();
    play.value = true;
    anhdd.value = `background-image: url(${useMusic.ListMusic[useMusic.selectMusic].imgmusic});`
    return useMusic.ListMusic[useMusic.selectMusic]
  }
  return {}
})

const timeAudioEnd = computed(() => {
  if (useMusic.selectMusic > -1) {
    if (onReadly.value) {
      const time = audio.value.duration
      endTime.value = time;
      const minute = parseInt((time / 60) % 60);
      const second = parseInt(time % 60);
      onReadly.value = false;
      return `${minute}:${second}`
    }
    else {
      timer.value = 0
    }
  }
  return '0:0'
})

const timeAudioDuration = computed(() => {
  if (timer.value > 0) {
    const minute = parseInt((timer.value / 60) % 60);
    const second = parseInt(timer.value % 60);
    return `${minute}:${second}`
  }
  return '0:0'
})

setInterval(() => {
  if (play.value && audio.value.duration > 0 && timer.value < endTime.value && endTime.value > 0 ) {
    timer.value++;
    valuetime.value  = timer.value / endTime.value * 100;
  }
}, 1000);

function selectRandom() {
  if (useMusic.selectMusic > -1) {
    random.value = !random.value
    loop.value = false;
  }
}

function selectLoop() {
  if (useMusic.selectMusic > -1) {
    loop.value = !loop.value
    random.value = false;

  }
}

function playAndPause() {
  if (useMusic.selectMusic > -1) {
    if (play.value) {
      audio.value.pause();
      play.value = false;
    }
    else {
      audio.value.play();
      play.value = true;
    }
  }
}

function nextAudio() {
  if (useMusic.selectMusic > -1) {
    if (useMusic.ListMusic.length == useMusic.selectMusic + 1) {
      useMusic.selectMusic = 0;
    }
    else useMusic.selectMusic++;
  }
}

function previousAudio() {
  if (useMusic.selectMusic > -1) {
    if (useMusic.selectMusic == 0) {
      useMusic.selectMusic = useMusic.ListMusic.length - 1
    }
    else useMusic.selectMusic--;
  }
}

function randomAudio() {
  if (useMusic.selectMusic > -1) {
    useMusic.selectMusic = Math.floor(Math.random() * useMusic.ListMusic.length - 1)
  }
}

function endAudio() {
  if (loop.value) return;
  else if (random.value) {
    randomAudio();
  }
  else {
    nextAudio();
  }
}



onUpdated(() => {
  if (useMusic.selectMusic > -1) {
    if (useMusic.ListMusic[useMusic.selectMusic].play == true) {
      // audio.value.src =  useMusic.ListMusic[useMusic.selectMusic].url
      audio.value.play();
      play.value = true;
      useMusic.ListMusic[useMusic.selectMusic].play = false
    }
  }
})

onUnmounted(() => {
  useMusic.selectMusic = -1;
})


</script>
  
<style>

</style>
  