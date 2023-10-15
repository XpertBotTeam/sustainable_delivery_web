<script setup>
//define emit
import { defineEmits,ref,onBeforeMount,computed } from 'vue';
const emit = defineEmits('cartPress'); // Define emit

import SearchBar from '../SearchBar.vue';

import { useStore } from 'vuex';

const userType = ref(null)
//extract userType
onBeforeMount(() => {
    const store = useStore();
    userType.value = computed(() => store.state.userType);

})


//fontawesome icon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


</script>
<template>
    <div class="w-[85%] mx-auto flex items-center py-5 my-10">
        <SearchBar class="justify-self-center ml-auto mr-auto"></SearchBar>
        <div v-if="userType.value === 'User'" class=""><font-awesome-icon @click="emit('cartPress')" class="min-w-[20px] h-auto cursor-pointer" :icon="['fas', 'bag-shopping']" /></div>
    </div>
</template>