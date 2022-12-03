<template>
    <div>
        <div class="flex">
            <div>
                chon {{typeGenreMusic}} :
            </div>
            <div class="space-x-2 ">
                <div v-for=" (e, i) in selected" :key="e.id" class=" btn btn-xs btn-primary">
                    <div>
                        {{ e.name }}
                    </div>
                    <div @click="removeSelect(i)" class="mx-1">
                        <i class="fa-solid fa-xmark "></i>
                    </div>
                </div>
            </div>
        </div>
        
        <input placeholder="nhap de tim kiem" v-model="inputName"
            class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full" type="text" />

        <ul :class="[!listSearch ? '' : 'bg-base-300']" class="menu bg-base-100 w-full p-2 rounded-box">
            <li class="hover-bordered" v-for="e in listSearch" :key="e.id"><a @click="select(e)" class="">{{ e.name
            }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref } from "@vue/runtime-core"

const props = defineProps({
    data: Array,
    selected: Array,
    typeGenreMusic: String,
})

const inputName = ref('')

const listSearch = computed(() => {
    let list;
    if (inputName.value.length > 0 && props.data) {
        list = props.data.filter(
            (data) => data.name.indexOf(inputName.value) > -1
        );
    } else list = null;
    return list;
})
function select(selectInput) {
    let haveDouble = false;
    if (props.selected) {
        props.selected.forEach(e => {
            if (e.name.trim() == selectInput.name.trim()) {
                haveDouble = true
                return;
            }
        })
        if (!haveDouble) {
            props.selected.push(selectInput);
        }
    }
    else {
        props.selected.push(selectInput)
    }
}
function removeSelect(index) {
    props.selected.splice(index, 1);
}
</script>

<style>

</style>