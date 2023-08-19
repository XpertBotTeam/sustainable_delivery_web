<script setup>
import Logo from '../assets/Logo.png'
</script>

<template>
    <nav class="bg-[black] flex w-full items-center max-md:justify-between px-5 md:px-10 shadow-[0_4px_84px_0px_black]">
        <img class="max-w-[80px] md:max-w-[115px] md:mx-auto" :src="Logo" alt="logo" />
        <div class="text-white flex gap-5 md:gap-10">
            <div class="MontserratBold md:text-[24px] text-[16px]">
                <router-link to="/">Home</router-link>
            </div>
            <div class="MontserratBold md:text-[24px] text-[16px]">
                <router-link to="/">About Us</router-link>
            </div>
            <div class="MontserratBold md:text-[24px] text-[16px]">
                <router-link to="/">Contact Us</router-link>
            </div>
        </div>
    </nav>
</template>