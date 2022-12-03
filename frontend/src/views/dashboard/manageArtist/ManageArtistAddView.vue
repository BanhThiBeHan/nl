<template>
    <div class="w-full">
        <div class="w-3/5 mx-auto">
            <div class="text-4xl font-semibold text-center m-5 ">
                ADD
            </div>
            <vAddManageArtist  @actionArtist="add"/>
            
        </div>
    </div>
</template>

<script setup>
import vAddManageArtist from '../../../components/manageArtist/vAddManageArtist.vue';
import { ref } from 'vue'
import { artistStore } from '../../../stores/artist.store';
import { alertStore } from '../../../stores/alert.store';
import { useRouter } from 'vue-router';
const router = useRouter();
const loading = ref(false);
const useArtist = artistStore();
const useAlert = alertStore();

async function add(name) {
    loading.value = true;
    try {
        const result = await useArtist.createArtist(name)
        switch (result) {
            case 1:
                useAlert.setError('ban chua chon anh');
                break;

            case 2:
            useAlert.setError('ban chua nhap ten the loai');
                break;

            default:
                router.push('manageartist');
                useAlert.setSuccess('da tao thanh cong');
                break;
        }

    } catch (error) {
        useAlert.setError('da tao that bai');
        console.log(error.message);
        console.log('loi khi tao artist');
    }
    finally {
        loading.value = false;
    }
}


</script>

<style>

</style>