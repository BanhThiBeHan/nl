<template>
  <div class="text-base font-serif">
    <div class="navbar bg-base-100 border-b-2">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li class="hover-bordered" v-for="i in dataMidNav" :key="i">
              <router-link :to="i.url">
                <i :class="i.icon"></i>
                {{ i.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="mx-5">
          <router-link to="/" class="btn btn-ghost normal-case text-base">HMusic</router-link>
          <div class="ml-2 animate-ping border-b-2 border-blue-500 h-1 w-20"></div>
        </div>
      </div>
      <div v-if="useAuth.isUserLoggedIn" class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          <li class="hover-bordered" v-for="i in dataMidNav" :key="i">
            <router-link :to="i.url">
              <i :class="i.icon"></i>
              {{ i.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <!-- chỉnh theme -->
        <vThemeVue />
        <!-- nút đăng xuất -->
        <!-- <router-link to="dangki"> -->
        <router-link to="/login" v-if="!useAuth.isUserLoggedIn" class="mx-3 btn btn-outline btn-primary hover-bordered">
          Log in
        </router-link>
        <!-- </router-link> -->

        <!-- dropdown avatar -->
        <div v-if="useAuth.isUserLoggedIn" class="flex-none gap-2 mx-3">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-12 rounded-full">
                <img src="../../../public/imgs/avatar.jpg" />
              </div>
            </label>
            <ul tabindex="0"
              class="mt-3 border-2 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <div class="avatar">
                <div class="w-12 h-12 rounded-full">
                  <img src="../../../public/imgs/avatar.jpg" />
                </div>
                <p class="mt-3 px-2">{{ useAuth.user.name }}</p>
              </div>
              <li></li>

              <li class="hover-bordered" v-for="i in dataAvatar" :key="i">
                <router-link v-if="i.name != 'Log out'" :to="i.url"><i :class="i.icon"></i>
                  {{ i.name }}
                </router-link>
                <router-link @click="logout()" v-if="i.name == 'Log out'" :to="i.url"><i :class="i.icon"></i>
                  {{ i.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vThemeVue from "./vTheme.vue";
import { ref, onBeforeMount, onUpdated, onMounted } from "vue";
import { authStore } from "../../stores/auth.store";

const useAuth = authStore();
const dataMidNav = ref([

  {
    name: "Blogs",
    url: "/blog",
    icon: "fa-regular fa-file-lines",
  },
  {
    name: "Chart",
    url: "/chart",
    icon: "fa-solid fa-chart-line",
  },
  {
    name: "Music",
    url: "/homelistmusic",
    icon: "fa-solid fa-headphones",

  },
  {
    name: "Contact",
    url: "/contact",
    icon: "fa-solid fa-square-phone",

  },
  {
    name: "Search",
    url: "/search",
    icon: "fa-solid fa-magnifying-glass",
  },
]);

const dataAvatar = ref([
  {
    name: "Log out",
    url: "/login",
    icon: "fa-solid fa-right-from-bracket",
  },
]);

const openLeft = ref(false);

function logout() {
  useAuth.logout();
}

onMounted(() => {
  useAuth.loadAuthState();
});


const dataAdmin = [
  {
    name: "Manage comments",
    url: "/managecomment",
    icon: "fa-solid fa-comment-dots",

  },
  {
    name: "Managing emotions",
    url: "/manageemotion",
    icon: "fa-solid fa-face-grin-hearts",

  },
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "fa-solid fa-address-card",
  },
]
let i = 0;

onUpdated(() => {
  if (useAuth.isAdmin & (i == 0)) {
    dataAvatar.value.unshift(...dataAdmin);
    i++;
  }
});
</script>

<style scoped>
.router-link-exact-active {
  color: rgb(255, 255, 255);
  background-color: rgba(87, 13, 248);
  font-weight: 700;
}
</style>
