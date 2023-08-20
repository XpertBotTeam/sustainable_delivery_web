<script setup>
import { ref } from 'vue';

const state = ref(false);

const toggleState = () => {
  state.value = !state.value;
};
</script>

<template>
  <div class="md:hidden relative w-[50px] h-[50px] flex items-center justify-center border-2 border-white border-solid rounded-[10px]">
    <font-awesome-icon
      @click="toggleState"
      :class="'text-white duration-[300ms] w-[16px] h-auto '+(state? 'rotate-180' : '')"
      :icon="['fas', state ? 'chevron-up' : 'cart-shopping']"
    />
    <div :class="'w-[150px] fixed top-[65px] w-full text-white r-0 bg-[black] flex flex-col z-20  '+(!state ? 'hidden' : '')">
        <div class="MontserratBold md:text-[18px] text-[16px] px-[20px] border-b border-solid border-[grey] py-5">
                <router-link to="/">Home</router-link>
            </div>
            <div class="MontserratBold md:text-[18px] text-[16px] px-[20px] border-b border-solid border-[grey] py-5">
                <router-link to="/">About Us</router-link>
            </div>
            <div class="MontserratBold md:text-[18px] text-[16px] px-[20px] border-b border-solid border-[grey] py-5">
                <router-link to="/">Contact Us</router-link>
            </div>
    </div>
  </div>
</template>