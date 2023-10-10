<script setup>
import NavBar from "@/components/NavBars/NavBar.vue";

//import ref for ref variables / onBeforeMount 
import { ref, onBeforeMount } from "vue";
//import vue router
//import { useRouter } from "vue-router";

//vuex store
import { useStore } from "vuex";
import { useUserAuth } from "@/utils/useUserAuth";

import TagComponent from "@/components/TagComponent.vue";

import companyOrdersCard from '@/components/CompanyOrdersCard.vue'

//define ref variables
const companyOrders = ref(null)
const deliveryStatus = ref(null)

//set filter tags
const filterTags = (tag) => {
  if(tag){
    deliveryStatus.value = tag;
  }
};
//define router
//const router = useRouter();

onBeforeMount(async()=>{
  //define store
  const store = useStore();

//auth check and set store variables
  const {userType,authorized} = await useUserAuth()
  store.dispatch('setAuth', {authorized,userType});
})

const status = ref(['Pending','Preparing','Prepared','Delivering','Delivered']);


const fetchData = async () => {
    var myHeaders = new Headers();
myHeaders.append("jwt",localStorage.getItem('JWT'));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:3000/company/orders", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result){
        companyOrders.value = result.orders
    }
  })
  .catch(error => console.log('error', error));
};

onBeforeMount(() => {
  //extract companyId
  fetchData();
});
</script>

<template>
  <div class="h-[100dvh] max-md:flex max-md:flex-col overflow-hidden">
    <NavBar class="mb-10"></NavBar>

    <div class="flex gap-5 w-[min(85%,1000px)] mx-auto mb-5">
          <TagComponent @click="filterTags(tag)" class="w-fit" :status="tag" v-for="tag in status" :key="tag">{{ tag }}</TagComponent>
      </div>
      <div class=" w-[min(85%,1000px)] mx-auto">
      <companyOrdersCard :order="order" v-for="order in companyOrders"></companyOrdersCard>
      </div>
  </div>
</template>
