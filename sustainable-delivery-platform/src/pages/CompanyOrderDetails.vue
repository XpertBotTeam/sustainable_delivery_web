<script setup>
import { onBeforeMount,ref } from 'vue';
import { useRouter } from 'vue-router';

//user authenticater
import { useStore } from 'vuex';
import { useUserAuth } from '@/utils/useUserAuth';

import NavBar from '@/components/NavBars/NavBar.vue';

import CompanyOrderDetailsCard from '../components/CompanyOrderDetailsCard.vue'

//define router
const router = useRouter()

//define ref variables
const orderDetails = ref(null)

const fetchData = () =>{
    const orderId = router.currentRoute.value.params.id;

    //construct headers
var myHeaders = new Headers();
myHeaders.append("jwt", localStorage.getItem('JWT'));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://localhost:3000/company/orders?orderId=${orderId}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result){
        orderDetails.value = result
    }
  })
  .catch(error => console.log('error', error));
    console.log(orderId)
}


onBeforeMount(async()=>{
  //define store
  const store = useStore();

//auth check and set store variables
  const {userType,authorized,user} = await useUserAuth()
  store.dispatch('setAuth', {authorized,userType});
  store.dispatch('setUser',{user})

  //fetching data 
  fetchData();
})
</script>
<template>
    <div class="h-[100dvh] max-md:flex max-md:flex-col overflow-hidden">
    <NavBar class="mb-10"></NavBar>

      <div class=" w-[min(85%,1000px)] mx-auto">
        <CompanyOrderDetailsCard :order = 'orderDetails.orders[0]'></CompanyOrderDetailsCard>
      </div>
  </div>
</template>