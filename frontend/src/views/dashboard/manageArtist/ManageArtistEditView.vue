<template>
    <div class="w-full">
        <div class="w-3/5 mx-auto">
            <div class="text-4xl font-semibold text-center m-5 ">
                EDIT
            </div>
            <vEditManageArtistVue @actionArtist='edit' />
        </div>
    </div>
</template>

<script setup>
import vEditManageArtistVue from '../../../components/manageArtist/vEditManageArtist.vue';
import { onBeforeMount, onMounted, ref } from 'vue'
import { artistStore } from '../../../stores/artist.store';
import { alertStore } from '../../../stores/alert.store';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute();
const loading = ref(false);
const useArtist = artistStore();
const useAlert = alertStore();



async function edit(name) {
    loading.value = true;
    try {
        await useArtist.updateArtist(name)
        router.push('/dashboard/manageartist');
        useAlert.setSuccess('da edit thanh cong');
    } catch (error) {
        useAlert.setError('da edit that bai');
        console.log(error.message);
        console.log('loi khi edit artist');
    }
    finally {
        loading.value = false;
    }
}

onMounted(() => {
    useArtist.findOneArtist(route.params.id);
})

</script>

<style>

</style>