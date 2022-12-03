<template>
    <div>
     <div @click="value++" class="btn text-4xl m-20">
      +
     </div>
     <Div>
      {{useAuth.isAdmin}}
      {{value}} <br>
      {{printvalue}}
     </Div>
    </div>
  </template>
  
  <script setup>
 import {computed, ref} from 'vue'
import { authStore } from '../stores/auth.store';
const useAuth = authStore()

 const value = ref(0)

 const printvalue = computed(() => {
  return value.value + 1;
 })

  </script>