<template>
    <div class="w-full">
        <div class="w-3/5 mx-auto">
            <div class="text-4xl font-semibold text-center m-5 ">
                EDIT
            </div>
            <vEditManageGenreVue @actionGenre='edit' />
        </div>
    </div>
</template>

<script setup>
import vEditManageGenreVue from '../../../components/manageGenre/vEditManageGenre.vue';
import { onBeforeMount, onMounted, ref } from 'vue'
import { genreStore } from '../../../stores/genre.store';
import { alertStore } from '../../../stores/alert.store';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute();
const loading = ref(false);
const useGenre = genreStore();
const useAlert = alertStore();



async function edit(name) {
    loading.value = true;
    try {
        await useGenre.updateGenre(name)
        router.push('/dashboard/managegenre');
        useAlert.setSuccess('da edit thanh cong');
    } catch (error) {
        useAlert.setError('da edit that bai');
        console.log(error.message);
        console.log('loi khi edit genre');
    }
    finally {
        loading.value = false;
    }
}

onMounted(() => {
    useGenre.findOneGenre(route.params.id);
})

</script>

<style>

</style>