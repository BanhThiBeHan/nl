<script setup>
import { useRoute } from "vue-router";
import vHeaderVue from "@/components/layout/vHeader.vue";
import vAlertVue from "@/components/vAlert.vue";
import { ref } from 'vue';

const show = ref(false)


const route = useRoute();
</script>

<template>
  <div>
    <div class="min-h-screen">
      <vHeaderVue />
      <vAlertVue />
      <router-view v-slot="{ Component }">
        <transition name="bounce">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

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