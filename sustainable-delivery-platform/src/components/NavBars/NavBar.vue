<script setup>
import {computed, onBeforeMount, ref} from 'vue';
import Logo from '../../assets/Logo.png'
import DropdownList from '../DropdownList.vue';

import { useStore } from 'vuex';


const userType = ref(null)
//extract userType
onBeforeMount(()=>{
    const store = useStore();
    userType.value = computed(() => store.state.userType);
    
})

</script>

<template>
    <nav :class="`${userType.value?`color${userType.value}`:'bg-[black]'} w-full  shadow-[0_4px_84px_0px_black] relative`">
        <div class="flex w-[85%] mx-auto items-center justify-between ">
        <img class="max-w-[80px] md:max-w-[115px]" :src="Logo" alt="logo" />
        
        <div class="text-white flex gap-5 md:gap-10 max-md:hidden">
            <div class="MontserratBold md:text-[18px] text-[16px]">
                <router-link to="/">Home</router-link>
            </div>
            <div class="MontserratBold md:text-[18px] text-[16px]">
                <router-link to="/">About Us</router-link>
            </div>
            <div class="MontserratBold md:text-[18px] text-[16px]">
                <router-link to="/">Contact Us</router-link>
            </div>
        </div>
        <dropdown-list></dropdown-list>
    </div>
    </nav>
</template>