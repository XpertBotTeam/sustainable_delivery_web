<script setup>
import { onBeforeMount } from "vue";

import NavBar from "@/components/NavBars/NavBar.vue";
import MyProfile from "@/components/MyProfile.vue";

//auth check
import  {useUserAuth}  from "@/utils/useUserAuth";

//vue router
import { useRouter } from "vue-router";

onBeforeMount(async ()=>{
 //define router
  const router = useRouter();

  //auth check
  const { authorized } = await useUserAuth();
  if(!authorized){
    //not awuthorized
    router.push('/')
  }
})


</script>
<template>
  <div class="max-md:min-h-[100dvh]">
    <div
      class="fixed h-screen w-screen bg-cover bg-[url('/src/assets/Background.png')] top-0 z-0"
    ></div>
    <NavBar></NavBar>
    <div class="w-[85%] mx-auto md:pt-10">
      <div class="Montserrat text-[32px] uppercase mx-auto w-fit mb-10">
        welcome to your profile
      </div>
      <MyProfile></MyProfile>
    </div>
  </div>
</template>
