<template>
    <div class="flex">
      <vMenuVue></vMenuVue>
      <router-view v-slot="{ Component }">
        <transition name="bounce">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </template>
  
  <script setup>
  import vMenuVue from "../../components/dashboard/vMenu.vue";
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
  