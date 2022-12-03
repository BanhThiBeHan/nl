<template>
    <div class="w-full">
        <div class="w-3/5 mx-auto">
            <div class="text-4xl font-semibold text-center m-5 ">
               EDIT
            </div>
            <vEditManageCountryVue @actionCountry='edit' />
        </div>
    </div>
</template>

<script setup>
import vEditManageCountryVue from '../../../components/manageCountry/vEditManageCountry.vue';
import { onBeforeMount, onMounted, ref } from 'vue'
import { countryStore } from '../../../stores/country.store';
import { alertStore } from '../../../stores/alert.store';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute();
const loading = ref(false);
const useCountry = countryStore();
const useAlert = alertStore();



async function edit(name) {
    loading.value = true;
    try {
        await useCountry.updateCountry(name)
        router.push('/dashboard/managecountry');
        useAlert.setSuccess('da edit thanh cong');
    } catch (error) {
        useAlert.setError('da edit that bai');
        console.log(error.message);
        console.log('loi khi edit country');
    }
    finally {
        loading.value = false;
    }
}

onMounted(() => {
    useCountry.findOneCountry(route.params.id);
})

</script>

<style>

</style>