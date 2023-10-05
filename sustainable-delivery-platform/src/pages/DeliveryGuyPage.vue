<script setup>
//importing  navbar
import NavBar from '@/components/NavBars/NavBar.vue';

//import vue js functionality methods
import { onBeforeMount,ref, watch} from 'vue';

//fot auth check
import { useStore } from 'vuex';
import { useUserAuth } from '@/utils/useUserAuth';
import OrderStatusCard from '@/components/OrderStatusCard.vue';

//define ref variables
const deliveryOrders = ref({item:'asd'});

onBeforeMount(async()=>{
  //define store
  const store = useStore();

//auth check and set store variables
  const {userType,authorized} = await useUserAuth()
  store.dispatch('setAuth', {authorized,userType});

  //fetch data
  fetchData();
})

watch(deliveryOrders , async (oldValue,newValue) =>{ 
  console.log("old:"+JSON.stringify(oldValue) + "       new:"+JSON.stringify(newValue));
},{deep:true})
//fetching delivery guy orders
const fetchData = async () => {
  //define headers
  var myHeaders = new Headers();
  myHeaders.append("jwt", localStorage.getItem('JWT'));


var requestOptions = {
  method: 'GET',
  headers: myHeaders,

  redirect: 'follow'
};

fetch("http://localhost:3000/deliveryGuy/MyOrders", requestOptions)
  .then(response => response.json())
  .then(result => deliveryOrders.value = result.orders)
  .catch(error => console.log('error', error));
}

</script>
<template>
    <div class="bg-gradient-to-b from-[#F7F7F7] to-[#D5D4D433]">
        <NavBar class="mb-10"></NavBar>

        <div class="flex flex-col w-full gap-10">
            <OrderStatusCard v-for="order in deliveryOrders" :order="order" :key="order._id"></OrderStatusCard>
        </div>
    </div>
</template>