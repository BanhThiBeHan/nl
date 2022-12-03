<template>
    <div class="w-full">
        <div class="w-3/5 mx-auto">
            <div class="text-4xl font-semibold text-center m-5 ">
                EDIT
            </div>
            <vEditManageSingerVue @actionSinger='edit' />
        </div>
    </div>
</template>

<script setup>
import vEditManageSingerVue from '../../../components/manageSinger/vEditManageSinger.vue';
import { onBeforeMount, onMounted, ref } from 'vue'
import { singerStore } from '../../../stores/singer.store';
import { alertStore } from '../../../stores/alert.store';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute();
const loading = ref(false);
const useSinger = singerStore();
const useAlert = alertStore();



async function edit(name) {
    loading.value = true;
    try {
        await useSinger.updateSinger(name)
        router.push('/dashboard/managesinger');
        useAlert.setSuccess('da edit thanh cong');
    } catch (error) {
        useAlert.setError('da edit that bai');
        console.log(error.message);
        console.log('loi khi edit singer');
    }
    finally {
        loading.value = false;
    }
}

onMounted(() => {
    useSinger.findOneSinger(route.params.id);
})

</script>

<style>

</style>