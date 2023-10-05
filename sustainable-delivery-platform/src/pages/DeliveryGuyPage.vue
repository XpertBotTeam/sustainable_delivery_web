<script setup>
import NavBar from '@/components/NavBars/NavBar.vue';
import { onBeforeMount } from 'vue';

//fot auth check
import { useStore } from 'vuex';
import { useUserAuth } from '@/utils/useUserAuth';
import OrderStatusCard from '@/components/OrderStatusCard.vue';

onBeforeMount(async()=>{
  //define store
  const store = useStore();

//auth check and set store variables
  const {userType,authorized} = await useUserAuth()
  store.dispatch('setAuth', {authorized,userType});
})

</script>
<template>
    <div class="bg-gradient-to-b from-[#F7F7F7] to-[#D5D4D433]">
        <NavBar class="mb-10"></NavBar>

        <div class="flex flex-col w-full gap-10">
            <OrderStatusCard></OrderStatusCard>
            <OrderStatusCard></OrderStatusCard>
            <OrderStatusCard></OrderStatusCard>
            <OrderStatusCard></OrderStatusCard>
            <OrderStatusCard></OrderStatusCard>


        </div>
    </div>
</template>