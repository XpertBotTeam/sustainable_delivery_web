<script setup>
import MotorcycleImage from '../assets/MotorcycleAll.png'

import OrderStatusCard from './OrderStatusCard.vue';

import { onBeforeMount, ref } from 'vue';

//define ref variables
const orders = ref(null);

//accept order
const handleAcceptOrder = (orderId) => {

  var myHeaders = new Headers();
  myHeaders.append("jwt", localStorage.getItem('JWT'));
  myHeaders.append("Content-Type", "application/json");
  var raw = '';

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://localhost:3000/deliveryGuy/AssignOrders/${orderId}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);

      orders.value = orders.value.filter(order => order._id !== orderId);
    })
    .catch(error => console.log('error', error));
}


const rejectOrder = (orderId) => {
    orders.value = orders.value.filter(order => order._id !== orderId);
}

const fetchData = () => {
    //construct headers
    var myHeaders = new Headers();
    myHeaders.append("jwt", localStorage.getItem('JWT'));


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/deliveryGuy/allOrders", requestOptions)
        .then(response => response.json())
        .then(result => orders.value = result.orders)
        .catch(error => console.log('error', error));
}

onBeforeMount(()=>{
    fetchData()
})

</script>
<template>
    <div
        class="w-[40%] fixed top-0 right-0 bg-white rounded-[11px] overflow-auto h-[100dvh] flex flex-col justify-between z-[200]">
        <div class=" flex flex-col">
            <div
                class="w-full rounded-[11px] bg-[#01AB78] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] px-5 flex items-center justify-between py-3 mb-5">
                <img class="max-w-[187px] " :src="MotorcycleImage" alt="logo" />
                <div class="text-white MontserratBold text-[24px]">New Orders</div>
            </div>

            <div class="px-5 flex flex-col gap-5">
                <OrderStatusCard  @rejectOrder="rejectOrder" @acceptOrder="(value) => {handleAcceptOrder(value)}" v-for="order in orders" :order="order" type="notification" :key="order._id"></OrderStatusCard>
            </div>

        </div>
    </div>
</template>