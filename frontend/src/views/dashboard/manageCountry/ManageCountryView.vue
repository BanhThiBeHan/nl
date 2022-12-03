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
                        <label @click="deleteCountry()" for="my-modal-delete" :class="[loading ? 'loading' : '']"
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
                <div class="text-4xl font-serif px-5 py-5">Country <i class="fa-solid fa-globe"></i></div>
                <router-link to="managecountryadd" class="btn btn-primary btn-outline m-5">
                    <i class="fa-solid fa-circle-plus mx-1 text-2xl"></i> them the loai
                </router-link>
            </div>
            <div class="flex flex-wrap">
                <div v-for="country in useCountry.ListCountry" :key="country.id">
                    <div class="">
                        <div>
                            <vMonoManageCountryVue :data=country />
                        </div>
                        <div class=" flex justify-center space-x-5">
                            <router-link :to="`managecountryedit/${country.id}`" class="btn btn-primary btn-outline ">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </router-link>


                            <div @click="selected_id = country.id">
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
import vMonoManageCountryVue from '../../../components/manageCountry/vMonoManageCountry.vue';
import { onMounted, ref } from 'vue'
import { countryStore } from '../../../stores/country.store';
import { alertStore } from '../../../stores/alert.store';
const useCountry = countryStore();
const loading = ref(false);
const selected_id = ref();
const useAlert = alertStore();

async function deleteCountry() {
    loading.value = true;
    try {
        await useCountry.deleteCountry(selected_id.value);
        await useCountry.getAllCountry();
        useAlert.setSuccess('Da xoa thanh cong ');
    } catch (error) {
        useAlert.setError('Da xoa that bai ');
        console.log('loi deleteCountry');
        console.log(error);
    }
    finally {
        loading.value = false;
    }
}
onMounted(() => {
    useCountry.getAllCountry();
})
</script>

<style>

</style>