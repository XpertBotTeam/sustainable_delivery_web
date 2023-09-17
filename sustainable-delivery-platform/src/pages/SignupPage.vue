<script setup>
import { ref } from 'vue';

import NavBar from '@/components/NavBar.vue';
import SignupForm from '@/components/SignupForm.vue';
import UserTypeBoxList from '@/components/UserTypeBoxList.vue';

const Type = ref('Company'); 
</script>

<template>
  <div class="absolute h-screen w-screen  bg-cover bg-[url('/src/assets/Background.png')] z-0 "></div>
    <NavBar></NavBar>
    <div class=" pt-10 md:pt-20 w-[85%] mx-auto  h-fit z-10">
      <SignupForm class="md:absolute md:left-1/2 md:-translate-x-1/2 z-10 relative" :Type="Type"></SignupForm>
      <UserTypeBoxList @Type="(value)=>{Type = value}" ></UserTypeBoxList>
    </div>
    
    
</template>