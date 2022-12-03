<template>
    <div class="w-full">
        <div class="w-3/5 mx-auto">
            <div class="text-4xl font-semibold text-center m-5 ">
                ADD
            </div>
            <vAddManageSinger  @actionSinger="add"/>
            
        </div>
    </div>
</template>

<script setup>
import vAddManageSinger from '../../../components/manageSinger/vAddManageSinger.vue';
import { ref } from 'vue'
import { singerStore } from '../../../stores/singer.store';
import { alertStore } from '../../../stores/alert.store';
import { useRouter } from 'vue-router';
const router = useRouter();
const loading = ref(false);
const useSinger = singerStore();
const useAlert = alertStore();

async function add(name) {
    loading.value = true;
    try {
        const result = await useSinger.createSinger(name)
        switch (result) {
            case 1:
                useAlert.setError('ban chua chon anh');
                break;

            case 2:
            useAlert.setError('ban chua nhap ten the loai');
                break;

            default:
                router.push('managesinger');
                useAlert.setSuccess('da tao thanh cong');
                break;
        }

    } catch (error) {
        useAlert.setError('da tao that bai');
        console.log(error.message);
        console.log('loi khi tao singer');
    }
    finally {
        loading.value = false;
    }
}


</script>

<style>

</style>