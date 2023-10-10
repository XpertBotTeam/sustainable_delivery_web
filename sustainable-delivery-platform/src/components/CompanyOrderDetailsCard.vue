<script setup>
    import { defineProps } from 'vue';

    //package image
    import packageImage from '../assets/Package.png'

    import TagComponent from './TagComponent.vue';

    //define props variables
    const props = defineProps(['order'])

    let totalPrice = 0;

    if(props.order){
        for (const companyOrder of props.order.companyOrders) {
  for (const item of companyOrder.items) {
    totalPrice += item.quantity * item.product.price;
  }
} 
    }

</script>
<template>
    <div class="bg-white rounded-[42px] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] p-5 ">
        <div class="flex justify-between gap-5 items-center border-b border-dashed border-[#D9D9D9] mb-5 pb-5">
        <div class="min-h-full flex flex-col justify-between flex-1">
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Client Name</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{ props.order.user.name }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Address</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{ `${props.order.user.address.country} / ${props.order.user.address.city}`  || useParseAddress({longitude:props.order.userId.address.longitude||null,latitude:props.order.userId.address.longitude||null}) }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Order Date</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{new Date(props.order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })}}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Price</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{props.order.total}}$</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Delivery Guy</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{props.order.deliveryGuy.name}}/ {{props.order.deliveryGuy.userName}}</div>
            </div>
            <TagComponent :status='props.order.companyOrders[0].status' class="w-[200px] mt-5">{{ props.order.companyOrders[0].status }}</TagComponent>
        </div>
        <img class="max-w-[176px] h-fit" :src="packageImage" />
       </div>
       <div>
        <div class="DarkerGrotesque text-[24px]">Order Details</div>
        <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer mb-5">{{ props.order.companyOrders[0].status }}</div>

        <div :key="item._id" v-for="item in props.order.companyOrders[0].items">

            <div class="flex gap-5 items-start mb-5">
                <img class="max-w-[100px]" @error="(e)=>{e.target.src = 'https://commercial.bunn.com/img/image-not-available.png'}"  :src="item.product.imagePath" alt="product"/>
                <div>
            <div class="Montserrat text-[18px]  group-hover:text-white duration-[300ms] cursor-pointer ">{{ item.product.name }}</div>
            <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer mb-5">{{ item.product.price }} $</div>
        </div>
            <div class="Montserrat text-[18px]  group-hover:text-white duration-[300ms] cursor-pointer ">X{{ item.quantity }}</div>
            </div>
            
            
        </div>

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