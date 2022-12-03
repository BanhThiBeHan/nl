<template>
    <div>


        <!-- modal delete -->
        <input type="checkbox" id="my-modal-delete" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Thong bao!!!!</h3>
                <p class="py-4">ban co muon xoa hay khong</p>
                <div class="flex justify-around">
                    <div  class="modal-action">
                        <label @click="deleteGenre()" for="my-modal-delete" :class="[loading ? 'loading' : '']"
                            class="btn btn-outline btn-primary">Yes</label>
                    </div>

                    <div class="modal-action">
                        <label for="my-modal-delete" class="btn btn-outline btn-warning">No</label>
                    </div>
                </div>
            </div>
        </div>
        <div class=" w-full">
            <div class="flex justify-between">
                <div class="text-4xl font-serif px-5 py-5">Genre <i class="fa-solid fa-globe"></i></div>
                <router-link to="managegenreadd" class="btn btn-primary btn-outline m-5">
                    <i class="fa-solid fa-circle-plus mx-1 text-2xl"></i> them the loai
                </router-link>
            </div>
            <div class="flex flex-wrap">
                <div v-for="genre in useGenre.ListGenre" :key="genre.id">
                    <div class="">
                        <div>
                            <vMonoManageGenreVue :data=genre />
                        </div>
                        <div class=" flex justify-center space-x-5">
                            <router-link :to="`managegenreedit/${genre.id}`" class="btn btn-primary btn-outline ">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </router-link>


                            <div @click="selected_id = genre.id">
                                <label for="my-modal-delete" class="btn btn-warning btn-outline"><i
                                        class="fa-solid fa-trash-can"></i>
                                </label>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import vMonoManageGenreVue from '../../../components/manageGenre/vMonoManageGenre.vue';
import { onMounted, ref } from 'vue'
import { genreStore } from '../../../stores/genre.store';
import { alertStore } from '../../../stores/alert.store';
const useGenre = genreStore();
const loading = ref(false);
const selected_id = ref();
const useAlert = alertStore();

async function deleteGenre() {
    loading.value = true;
    try {
        await useGenre.deleteGenre(selected_id.value);
        await useGenre.getAllGenre();
        useAlert.setSuccess('Da xoa thanh cong ');
    } catch (error) {
        useAlert.setError('Da xoa that bai ');
        console.log('loi deleteGenre');
        console.log(error);
    }
    finally {
        loading.value = false;
    }
}
onMounted(() => {
    useGenre.getAllGenre();
})
</script>

<style>

</style>