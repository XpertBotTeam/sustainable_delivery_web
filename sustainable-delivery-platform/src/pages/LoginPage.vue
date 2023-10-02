<script setup>
import NavBar from '@/components/NavBars/NavBar.vue';
import LoginForm from '@/components/Forms/LoginForm.vue';

</script>

<template>
  <div class="max-md:min-h-[100dvh] max-md:flex max-md:flex-col">
    <div class=" fixed h-screen w-screen  bg-cover bg-[url('/src/assets/Background.png')] top-0 z-0"></div>
    <NavBar></NavBar>
    <div class="w-[85%] mx-auto  md:pt-20 max-md:flex-1 max-md:flex max-md:justify-center max-md:items-center">
      <LoginForm></LoginForm>>
    </div>
  </div>
    
</template>