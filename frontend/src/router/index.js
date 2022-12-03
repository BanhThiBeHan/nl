import { createRouter, createWebHistory } from 'vue-router'
import welcome from '../views/WelcomeView.vue'
import { authStore } from "@/stores/auth.store";
// khi đăng nhập roi sẽ chuyển sang trang rooms
const redirectIfLoggedIn = (_to, _from) => {
  if (authStore().isUserLoggedIn) {
    return {
      name: "homemusic",
    };
  }
};

const redirectEditBlog = (_to, _from) => {
  const list = blogStore().ListBlog
  list.forEach(blog => {
    if (blog.id == _to.params.id && blog.author.id != authStore().user.id) {
      return {
        name: "NotFound",
      };
    }
  })


};

const routes = [
  {
    path: '/',
    name: 'home',
    component: welcome,
    // này để các trang không cần đăng nhập
    meta: {
      publicPage: true,
    },
    beforeEnter: redirectIfLoggedIn,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      publicPage: true,
    },
    beforeEnter: redirectIfLoggedIn,
  },
  {
    path: '/dangki',
    name: 'dangki',
    component: () => import('@/views/auth/RegistrationView.vue'),
    meta: {
      publicPage: true,
    },
    beforeEnter: redirectIfLoggedIn,
  },
  {
    path: '/homemusic',
    name: 'homemusic',
    component: () => import('@/views/HomeMusicView.vue'),

  },
  {
    path: '/genre/:id/:page',
    name: 'genre',
    component: () => import('@/views/listmusic/GenreView.vue'),
  },
  // taosua khuc nay 
  {
    path: '/singer/:id/:page',
    name: 'singer',
    component: () => import('@/views/listmusic/SingerView.vue'),
  },
  {
    path: '/artist/:id/:page',
    name: 'artist',
    component: () => import('@/views/listmusic/ArtistView.vue'),
  },
  {
    path: '/country/:id/:page',
    name: 'country',
    component: () => import('@/views/listmusic/CountryView.vue'),
  },

  {
    path: '/dashboard',
    name: 'dashboard', 
    component: () => import('@/views/dashboard/DashBoardView.vue'),
    children: [
      // manage Genre
      {
        path: 'managegenre',
        name: 'managegenre',
        component: () => import('@/views/dashboard/manageGenre/ManageGenreView.vue'),
      },
      {
        path: 'managegenreedit/:id',
        name: 'managegenreedit',
        component: () => import('@/views/dashboard/manageGenre/ManageGenreEditView.vue'),
      },
      {
        path: 'managegenreadd',
        name: 'managegenreadd',
        component: () => import('@/views/dashboard/manageGenre/ManageGenreAddView.vue'),
      },

      // mangage Music
      {
        path: 'managemusic',
        name: 'managemusic',
        component: () => import('@/views/dashboard/manageMusic/ManageMusicView.vue'),
      },
      {
        path: 'manageaddmusic',
        name: 'manageaddmusic',
        component: () => import('../views/dashboard/manageMusic/ManageAddMusicView.vue'),
      },
      {
        path: 'manageeditmusic/:id',
        name: 'manageeditmusic',
        component: () => import('@/views/dashboard/manageMusic/ManageEditMusicView.vue'),
      },
      {
        path: 'manageartist',
        name: 'manageartist',
        component: () => import('@/views/dashboard/manageartist/ManageArtistView.vue'),
      },
      {
        path: 'manageartistadd',
        name: 'manageartistadd',
        component: () => import('@/views/dashboard/manageArtist/ManageArtistAddView.vue'),
      },
      {
        path: 'manageartistedit/:id', 
        name: 'manageartistedit',
        component: () => import('@/views/dashboard/manageArtist/ManageArtistEditView.vue'),
      },
      {
        path: 'managecountry',
        name: 'managecountry',
        component: () => import('@/views/dashboard/manageCountry/ManageCountryView.vue'),
        
      },
      {
        path: 'managecountryadd',
        name: 'managecountryadd',
        component: () => import('@/views/dashboard/manageCountry/ManageCountryAddView.vue'),
      },
      {
        path: 'managecountryedit/:id',
        name: 'managecountryedit',
        component: () => import('@/views/dashboard/manageCountry/ManageCountryEditView.vue'),
      },
      {
        path: 'managesinger',
        name: 'managesinger',
        component: () => import('../views/dashboard/manageSinger/ManageSingerView.vue'),
        
      },
      {
        path: 'managesingeradd',
        name: 'managesingeradd',
        component: () => import('@/views/dashboard/manageSinger/ManageSingerAddView.vue'),
      },
      {
        path: 'managesingeredit/:id', 
        name: 'managesingeredit',
        component: () => import('@/views/dashboard/manageSinger/ManageSingerEditView.vue'),
      },
    ]
  },

  {
    path: '/homelistmusic',
    name: 'homelistmusic',
    component: () => import('@/views/listmusic/HomeListMusicView.vue'),

  },
  
  {
    path: '/trang2',
    name: 'trang2',
    component: () => import('@/views/Trang2View.vue'),

  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// nếu vào trang private thì nó sẽ bắt đăng nhập, nếu đăng nhập thành công sẽ chuyển sang trang mà đang muốn vào
router.beforeEach((to, _from) => {
  const authRequired = !to.meta.publicPage;
  const auth = authStore();

  if (authRequired && !auth.isUserLoggedIn) {
    const query = to.fullPath === "/" ? {} : { redirect: to.fullPath };
    return {
      name: "login",
      query,
    };
  }
});


export default router
