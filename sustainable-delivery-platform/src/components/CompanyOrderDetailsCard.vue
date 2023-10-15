<script setup>
    import { defineProps, onBeforeMount, ref } from 'vue';

    //package image
    import packageImage from '../assets/Package.png'
    

    import TagComponent from './TagComponent.vue';

    import OrderProduct from '../components/OrderProduct.vue'

    import useParseAddress from '@/utils/useParseAddress';

import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps(['order'])
const handleStatusChange =( ) => {
    var myHeaders = new Headers();
myHeaders.append("jwt", localStorage.getItem('JWT'));
myHeaders.append("Content-Type", "application/json");

 //define props variables

var raw = JSON.stringify({
  "orderId": props.order.orderId
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};


fetch("http://localhost:3000/company/changeStatus", requestOptions)
  .then(response => response.text())
  .then(result => {router.push('/company/orders');console.log(result)})
  .catch(error => console.log('error', error));
}


   

    let totalPrice = 0;

    if(props.order){
        for (const companyOrder of props.order.companyOrders) {
  for (const item of companyOrder.items) {
    totalPrice += item.quantity * item.product.price;
  }
} 
    }


    const address = ref(null)
    onBeforeMount(async ()=>{
        address.value = await useParseAddress({longitude:props.order.user.address.longitude? props.order.user.address.longitude :null,latitude:props.order.user.address.latitude? props.order.user.address.latitude : null})
    })

</script>
<template>
    <div class="bg-white rounded-[42px] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] p-5 ">
        <div class="flex justify-between gap-5 items-center border-b border-dashed border-[#D9D9D9] mb-5 pb-5">
        <div class="min-h-full flex flex-col justify-between flex-1">
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Client Name</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{  (props.order && props.order.user && props.order.user.name) ? props.order.user.name : ''  }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Address</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{  address }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Order Date</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{props.order.orderDate ?new Date(props.order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' }) : ''}}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Price</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{props.order.total}}$</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Delivery Guy</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{(props.order && props.order.deliveryGuy && props.order.deliveryGuy.name) ?
                        `${props.order.deliveryGuy.name} / ${props.order.deliveryGuy.userName}` : 'not identified' }}</div>
            </div>
            <TagComponent @click="handleStatusChange" :status='props.order.companyOrders[0].status' class="w-[200px] mt-5">{{ props.order.companyOrders[0].status }}</TagComponent>
            <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">Click to change the order status (pending,preparing,prepared)</div>
        </div>
        <img class="max-w-[176px] h-fit" :src="packageImage" />
       </div>
       <div>
        <div class="DarkerGrotesque text-[24px]">Order Details</div>
        <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer mb-5">{{ props.order.companyOrders[0].status }}</div>

        <OrderProduct :key="item._id" v-for="item in props.order.companyOrders[0].items" :item="item"></OrderProduct>

        <div class="flex justify-between max-w-[400px]">
            <div class="Montserrat text-[18px]  group-hover:text-white duration-[300ms] cursor-pointer ">TOTAL</div>
            <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer mb-5">{{ totalPrice}} $</div>
        </div>
        <div class="flex justify-between  max-w-[400px]">
            <div class="Montserrat text-[18px]  group-hover:text-white duration-[300ms] cursor-pointer ">PAYMENT METHOD</div>
            <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer mb-5">Cash On Delivery</div>
        </div>

       </div>
    </div>
    
</template>