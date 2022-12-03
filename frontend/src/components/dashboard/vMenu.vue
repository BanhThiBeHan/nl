<template>
  <div class="font-serif ">
    <div class="w-80 bg-base-200 p-4 rounded-2xl m-5">
      <!-- <router-link to="/dashboard"> -->
      <div class="avatar flex justify-center">
        <div class="w-32 h-32 rounded-full">
          <img src="../../../public/imgs/avatar.jpg" />
        </div>
      </div>
      <div class="mt-3 px-2 text-center font-semibold text-2xl ">
        {{ useAuth.user.name }}
      </div>
      <!-- </router-link> -->
      <div class="divider"></div>
      <ul class="menu w-full p-2 rounded-box">
        <div v-for="i in data" :key="i.title">
          <li @click="open == i.title ? (open = '') : (open = i.title)"
            class="menu-title text-sm btn btn-ghost text-start ">
            {{ i.title }}
            <div class="text-end">
              <i :class="[
                open == i.title
                  ? 'fa-solid fa-caret-down text-3xl'
                  : 'fa-solid fa-caret-right text-3xl',
              ]"></i>
            </div>
          </li>
          <transition name="bounce">
            <div class="" v-if="open == i.title">
              <li v-for="j in i.content" :key="j.id" class="hover-bordered ml-3">
                <router-link :to="`/dashboard/${j.url}`">{{ j.title }}</router-link>
              </li>
            </div>
          </transition>
          <div class="divider"></div>
        </div>
      </ul>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import { authStore } from "../../stores/auth.store";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const useAuth = authStore();
const data = ref([
  {
    title: "Genres Management",
    content: [
      {
        title: "Genre",
        url: "managegenre",
      },
      {
        title: "Author",
        url: "manageartist",
      },
      {
        title: "Singer",
        url: "managesinger",
      },
      {
        title: "Country",
        url: "managecountry",
      },
    ],
  },
  {
    title: "Music Management",
    content: [
      {
        title: "music",
        url: "managemusic",
      },
    ],
  },
  {
    title: "Manage Blogs",
    content: [
      {
        title: "Edit Blog",
        url: "manageblog",
      },
    ],
  },
  {
    title: "Setting",
    content: [],
  },
]);



const open = ref("");
const link = route.fullPath;
let url = link.substring(11, link.length);
let mark = false;

data.value.forEach((e) => {
  e.content.forEach((e2) => {
    if (e2.url == url) {
      mark = true;
      open.value = e.title;
      return;
    }
  });
  if (mark) {
    return;
  }
});


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

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}

.router-link-exact-active {
  color: rgb(255, 255, 255);
  background-color: rgba(87, 13, 248);
  font-weight: 700;
}
</style>
  