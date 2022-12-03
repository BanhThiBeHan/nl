<template>
    <div class="border-2 p-5 m-5 rounded-md w-full">

        <!-- modal delete -->
        <input type="checkbox" id="my-modal-delete" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Thong bao!!!!</h3>
                <p class="py-4">ban co muon xoa hay khong</p>
                <div class="flex justify-around">
                    <div class="modal-action">
                        <label @click="deleteMusic()" for="my-modal-delete" :class="[loading ? 'loading' : '']"
                            class="btn btn-outline btn-primary">Yes</label>
                    </div>

                    <div class="modal-action">
                        <label for="my-modal-delete" class="btn btn-outline btn-warning">No</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-between">
            <div class="text-4xl font-serif px-5 py-5">List <i class="fa-solid fa-globe"></i></div>
            <router-link to="manageaddmusic" class="btn btn-primary btn-outline m-5">
                <i class="fa-solid fa-circle-plus mx-1 text-2xl"></i> them Music
            </router-link>
        </div>
        <div v-for="music in useMusic.ListMusic" :key="music.id">
            <transition name="bounce">
                <div class="flex">
                    <vManageMonoMusicVue class="w-full m-3" :data="music" />
                    <div class="flex justify-center space-x-5 m-7 w-32">
                        <router-link :to="`manageeditmusic/${music.id}`" class="btn btn-primary btn-outline ">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </router-link>
                        <div>
                            <label @click="(id_delete = music.id)" for="my-modal-delete" class="btn btn-warning btn-outline"><i
                                    class="fa-solid fa-trash-can"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import vManageMonoMusicVue from '../../../components/manageMusic/vManageMonoMusic.vue';
import { alertStore } from '../../../stores/alert.store';
import { genreStore } from '../../../stores/genre.store';
import { musicStore } from '../../../stores/music.store';
const useAlert = alertStore()
const useMusic = musicStore()
const loading = ref(false)
const id_delete = ref()
async function deleteMusic() {
    loading.value = true
    try {
        await useMusic.deleteMusic(id_delete.value)
        await useMusic.getAllMusic()
        useAlert.setSuccess("xoa thanh cong")

    } catch (error) {
        useAlert.setError("xoa that bai")
        console.log(error);
        console.log('lloi deleteMusic');
    }
    finally {
        loading.value = false
    }
}
onMounted(() => {
    useMusic.getAllMusic();
})

</script>

<style>

</style>