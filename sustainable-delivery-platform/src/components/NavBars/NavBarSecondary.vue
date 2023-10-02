<script setup>
//define emit
import { defineEmits } from 'vue';
const emit = defineEmits('cartPress'); // Define emit

import SearchBar from '../SearchBar.vue';

//fontawesome icon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


</script>
<template>
    <div class="w-[85%] mx-auto flex items-center py-5 ">
        <SearchBar class="justify-self-center ml-auto mr-auto"></SearchBar>
        <div class=""><font-awesome-icon @click="emit('cartPress')" class="min-w-[20px] h-auto cursor-pointer" :icon="['fas', 'bag-shopping']" /></div>
    </div>
</template>