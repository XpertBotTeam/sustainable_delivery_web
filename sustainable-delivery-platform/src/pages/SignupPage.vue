<script setup>
import NavBar from '@/components/NavBar.vue';
import SignupForm from '@/components/SignupForm.vue';
</script>

<template>
    <NavBar></NavBar>
    <div class="w-full h-screen bg-[url('/src/assets/Background.png')] bg-cover pt-10 md:pt-20 w-[90%] md:w-[85%] mx-auto">
      <SignupForm Type="Company"></SignupForm>
    </div>
</template>